// Project Showcase 3D Visualization
class ProjectShowcase {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.projects = [];
    this.rotationSpeed = 0.005;
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.005);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.camera.position.set(0, 50, 100);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Project data
    const projects = [
      { 
        name: 'Restaurant Recommendation System', 
        description: 'Flask web app using TF-IDF and cosine similarity on 3,200+ restaurants with glassmorphism UI.',
        tags: ['Python', 'Flask', 'scikit-learn'],
        gradient: new THREE.Color(0x6c63ff),
        position: new THREE.Vector3(0, 0, 0),
        radius: 60,
        icon: '🍽️'
      },
      { 
        name: 'Customer Segmentation', 
        description: 'RFM analysis on 200 customers identifying 5 segments. 8.5% drive 28% of revenue.',
        tags: ['Python', 'Pandas', 'Plotly'],
        gradient: new THREE.Color(0x00d4aa),
        position: new THREE.Vector3(100, 0, 0),
        radius: 80,
        icon: '📊'
      },
      { 
        name: 'Sales Trend Analysis', 
        description: '180-day time series with rolling averages and day-of-week patterns. Total revenue: Rs.12.1M.',
        tags: ['Python', 'NumPy', 'Plotly'],
        gradient: new THREE.Color(0xff6b6b),
        position: new THREE.Vector3(-100, 0, 0),
        radius: 80,
        icon: '📈'
      },
      { 
        name: 'Data Cleaning Automation', 
        description: 'End-to-end pipeline fixing 31 data quality issues across 150 records.',
        tags: ['Python', 'Pandas'],
        gradient: new THREE.Color(0x8888a0),
        position: new THREE.Vector3(0, 0, 100),
        radius: 60,
        icon: '🧹'
      },
      { 
        name: 'Sales Dashboard', 
        description: 'Interactive Streamlit dashboard with KPI cards and Plotly charts. Deployed live.',
        tags: ['Streamlit', 'Plotly', 'Pandas'],
        gradient: new THREE.Color(0xffd700),
        position: new THREE.Vector3(-80, 0, -100),
        radius: 50,
        icon: '🎯'
      }
    ];

    // Create project spheres
    projects.forEach((project, index) => {
      const group = new THREE.Group();
      
      // Project sphere
      const geometry = new THREE.SphereGeometry(8, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: project.gradient,
        transparent: true,
        opacity: 0.8,
        emissive: project.gradient,
        emissiveIntensity: 0.2
      });
      const sphere = new THREE.Mesh(geometry, material);
      group.add(sphere);

      // Project label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 64;
      context.fillStyle = '#ffffff';
      context.font = 'bold 18px Arial';
      context.textAlign = 'center';
      context.fillText(project.name, 256, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.y = 15;
      sprite.scale.set(30, 10, 1);
      group.add(sprite);

      // Project icon
      const iconSprite = new THREE.Sprite(spriteMaterial);
      iconSprite.position.y = 8;
      iconSprite.scale.set(20, 10, 1);
      group.add(iconSprite);

      // Position the project in orbit
      const theta = (index / projects.length) * Math.PI * 2;
      project.position.x = Math.cos(theta) * project.radius;
      project.position.z = Math.sin(theta) * project.radius;
      project.position.y = Math.sin(theta) * 20;
      group.position.copy(project.position);
      group.rotation.y = theta;

      group.userData = { project: project, index: index };
      this.projects.push(group);
      this.scene.add(group);
    });

    // Create orbit path
    this.createOrbitPath();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 2, 200);
    pointLight.position.set(0, 50, 50);
    this.scene.add(pointLight);

    // Event listeners
    this.setupEventListeners();

    // Start animation
    this.animate();

    // Setup click handlers for project selection
    this.setupProjectSelection();
  }

  createOrbitPath() {
    const points = [];
    const radius = 80;
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x00d4aa,
      transparent: true,
      opacity: 0.3
    });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    });
  }

  setupProjectSelection() {
    const container = this.container;
    container.addEventListener('click', (event) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      this.raycaster.setFromCamera(mouse, this.camera);

      this.projects.forEach((project) => {
        const distance = Math.sqrt(
          Math.pow(project.position.x - 0, 2) +
          Math.pow(project.position.y - 0, 2) +
          Math.pow(project.position.z - 0, 2)
        );
        
        if (distance < 20) {
          this.showProjectInfo(project.userData.project);
        }
      });
    });
  }

  showProjectInfo(project) {
    const infoPanel = document.getElementById('selected-project');
    if (infoPanel) {
      infoPanel.innerHTML = `
        <h4>${project.name}</h4>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="#" onclick="return false;">View Project</a>
          <a href="#" onclick="return false;">Live Demo</a>
          <a href="#" onclick="return false;">Source Code</a>
        </div>
      `;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate entire showcase
    this.scene.rotation.y += this.rotationSpeed;

    // Animate individual projects
    this.projects.forEach((project, index) => {
      project.rotation.y += 0.02;
      project.position.y = Math.sin(Date.now() * 0.001 + index) * 5;
      
      // Pulse effect
      const scale = 1 + Math.sin(Date.now() * 0.001 + index * 2) * 0.1;
      project.scale.set(scale, scale, scale);
    });

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.projects = [];
    this.renderer.dispose();
  }
}