// Pipeline Flow Visualization
class PipelineFlow {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.nodes = [];
    this.lines = [];
    this.animationTime = 0;
    this.isPlaying = false;
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.002);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Pipeline stages data
    const stages = [
      { name: 'Data Ingestion', color: 0x6c63ff, position: new THREE.Vector3(-80, 0, 0), icon: '📊' },
      { name: 'Processing', color: 0x00d4aa, position: new THREE.Vector3(-40, 0, 0), icon: '⚙️' },
      { name: 'Model Training', color: 0xff6b6b, position: new THREE.Vector3(0, 0, 0), icon: '🤖' },
      { name: 'Visualization', color: 0x8888a0, position: new THREE.Vector3(40, 0, 0), icon: '📈' },
      { name: 'Insights', color: 0xffd700, position: new THREE.Vector3(80, 0, 0), icon: '💡' }
    ];

    // Create stages
    stages.forEach((stage, index) => {
      const group = new THREE.Group();
      
      // Stage cylinder
      const geometry = new THREE.CylinderGeometry(15, 15, 20, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: stage.color,
        transparent: true,
        opacity: 0.8,
        emissive: stage.color,
        emissiveIntensity: 0.2
      });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.copy(stage.position);
      group.add(cylinder);

      // Stage label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 128;
      context.fillStyle = '#ffffff';
      context.font = 'bold 24px Arial';
      context.textAlign = 'center';
      context.fillText(stage.name, 256, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(stage.position);
      sprite.position.y += 30;
      sprite.scale.set(40, 20, 1);
      group.add(sprite);

      // Icon text
      const iconSprite = new THREE.Sprite(spriteMaterial);
      iconSprite.position.copy(stage.position);
      iconSprite.position.y += 10;
      iconSprite.scale.set(30, 15, 1);
      group.add(iconSprite);

      this.nodes.push(group);
      this.scene.add(group);
    });

    // Create flow lines
    for (let i = 0; i < stages.length - 1; i++) {
      const start = stages[i].position;
      const end = stages[i + 1].position;
      const points = [start, end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00d4aa,
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      });
      const line = new THREE.Line(geometry, material);
      this.lines.push(line);
      this.scene.add(line);
    }

    // Animated data particles
    this.createDataParticles();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4aa, 2, 200);
    pointLight.position.set(0, 50, 50);
    this.scene.add(pointLight);

    // Event listeners
    this.setupEventListeners();

    // Start animation
    this.animate();
  }

  createDataParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;
      posArray.push(x, y, z);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      color: 0x00d4aa,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.animationTime += 0.02;

    // Rotate entire pipeline
    this.scene.rotation.y = this.animationTime * 0.1;
    this.scene.rotation.x = Math.sin(this.animationTime) * 0.1;

    // Animate particles
    if (this.particles) {
      this.particles.rotation.y = this.animationTime * 0.5;
      this.particles.position.y = Math.sin(this.animationTime * 0.5) * 10;
    }

    // Pulse effect on active stage
    const pulseIntensity = Math.sin(this.animationTime * 2) * 0.5 + 0.5;
    this.nodes.forEach((node, index) => {
      const material = node.children[0].material;
      material.emissiveIntensity = pulseIntensity * 0.3;
      if (index === Math.floor((this.animationTime * 2) % this.nodes.length)) {
        node.children[0].scale.set(1.1, 1.1, 1.1);
      } else {
        node.children[0].scale.set(1, 1, 1);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  toggleAnimation() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.animate();
    }
  }

  destroy() {
    this.particles.geometry.dispose();
    this.particles.material.dispose();
    this.renderer.dispose();
  }
}