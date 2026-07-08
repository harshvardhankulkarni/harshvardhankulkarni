// Data Terrain Visualization
class DataTerrain {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.terrains = [];
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.01);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 2000);
    this.camera.position.set(0, 200, 300);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Create terrain layers
    this.createTerrainLayers();

    // Lighting
    this.setupLighting();

    // Event listeners
    this.setupEventListeners();

    // Start animation
    this.animate();
  }

  createTerrainLayers() {
    // Base map layer
    const baseMapGeometry = this.createTerrainGeometry(300, 300, 0x001122, 0.3);
    const baseMapMaterial = new THREE.MeshBasicMaterial({ color: 0x001122 });
    const baseMap = new THREE.Mesh(baseMapGeometry, baseMapMaterial);
    baseMap.position.set(0, -50, 0);
    this.terrains.push(baseMap);
    this.scene.add(baseMap);

    // Elevation layer
    const elevationGeometry = this.createTerrainGeometry(250, 250, 0x004466, 0.5);
    const elevationMaterial = new THREE.MeshPhongMaterial({
      color: 0x004466,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
      wireframeLinewidth: 1
    });
    const elevation = new THREE.Mesh(elevationGeometry, elevationMaterial);
    elevation.position.set(0, -30, 0);
    this.terrains.push(elevation);
    this.scene.add(elevation);

    // Skills heatmap layer
    const skillsGeometry = this.createTerrainGeometry(200, 200, 0x6c63ff, 0.6);
    const skillsMaterial = new THREE.MeshPhongMaterial({
      color: 0x6c63ff,
      transparent: true,
      opacity: 0.4,
      wireframe: false
    });
    const skills = new THREE.Mesh(skillsGeometry, skillsMaterial);
    skills.position.set(0, -10, 0);
    this.terrains.push(skills);
    this.scene.add(skills);

    // Project zones layer
    const projectGeometry = this.createTerrainGeometry(180, 180, 0x00d4aa, 0.7);
    const projectMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d4aa,
      transparent: true,
      opacity: 0.3,
      wireframe: false
    });
    const projects = new THREE.Mesh(projectGeometry, projectMaterial);
    projects.position.set(0, 0, 0);
    this.terrains.push(projects);
    this.scene.add(projects);

    // Skill points on terrain
    this.createSkillPoints();

    // Project indicators on terrain
    this.createProjectIndicators();
  }

  createTerrainGeometry(width, height, color, amplitude) {
    const geometry = new THREE.PlaneGeometry(width, height, 64, 64);
    
    // Create undulating terrain
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      
      // Generate terrain height based on position
      let height = 0;
      
      // Add some base elevation
      height += Math.sin(x * 0.01) * 10 + Math.cos(z * 0.01) * 10;
      
      // Add skill heat map
      const skillInfluence = this.calculateSkillInfluence(x, z);
      height += skillInfluence * amplitude;
      
      // Add project zone influence
      const projectInfluence = this.calculateProjectInfluence(x, z);
      height += projectInfluence * amplitude * 0.5;
      
      // Ensure height is above ground
      height = Math.max(height, -50);
      
      // Apply height to vertex
      vertices[i + 1] = height;
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }

  calculateSkillInfluence(x, z) {
    // Calculate influence based on skills locations
    const skills = [
      { x: -100, z: -100, radius: 30, strength: 1.0 },
      { x: 100, z: -100, radius: 30, strength: 1.0 },
      { x: 0, z: 100, radius: 40, strength: 0.8 },
      { x: -50, z: 50, radius: 25, strength: 0.7 },
      { x: 50, z: 50, radius: 25, strength: 0.7 }
    ];
    
    let totalInfluence = 0;
    skills.forEach(skill => {
      const distance = Math.sqrt(Math.pow(x - skill.x, 2) + Math.pow(z - skill.z, 2));
      if (distance < skill.radius) {
        totalInfluence += (1 - distance / skill.radius) * skill.strength;
      }
    });
    
    return Math.min(totalInfluence, 1.0);
  }

  calculateProjectInfluence(x, z) {
    // Project zone influence
    const projects = [
      { x: -80, z: -80, radius: 35, strength: 0.6 },
      { x: 80, z: -80, radius: 35, strength: 0.6 },
      { x: 0, z: 80, radius: 45, strength: 0.5 },
      { x: -40, z: 40, radius: 30, strength: 0.4 },
      { x: 40, z: 40, radius: 30, strength: 0.4 }
    ];
    
    let totalInfluence = 0;
    projects.forEach(project => {
      const distance = Math.sqrt(Math.pow(x - project.x, 2) + Math.pow(z - project.z, 2));
      if (distance < project.radius) {
        totalInfluence += (1 - distance / project.radius) * project.strength;
      }
    });
    
    return Math.min(totalInfluence, 1.0);
  }

  createSkillPoints() {
    const skillPointsGeometry = new THREE.BufferGeometry();
    const skillPointsCount = 100;
    const posArray = [];
    const colorArray = [];
    const sizeArray = [];

    for (let i = 0; i < skillPointsCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      const height = this.calculateSkillInfluence(x, z) * 60 - 30;
      posArray.push(x, height, z);
      
      // Color based on skill category
      const color = Math.random() > 0.5 ? 0x6c63ff : 0x00d4aa;
      colorArray.push(color, color, color);
      sizeArray.push(Math.random() * 5 + 2);
    }

    skillPointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    skillPointsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));
    skillPointsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizeArray, 1));

    const skillPointsMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.skillPoints = new THREE.Points(skillPointsGeometry, skillPointsMaterial);
    this.scene.add(this.skillPoints);
  }

  createProjectIndicators() {
    const projectGeometry = new THREE.SphereGeometry(3, 16, 16);
    const projectMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.9
    });

    const projects = [
      { name: 'Restaurant Rec', pos: new THREE.Vector3(-80, 20, -80) },
      { name: 'Segmentation', pos: new THREE.Vector3(80, 20, -80) },
      { name: 'Sales Analysis', pos: new THREE.Vector3(0, 20, 80) },
      { name: 'Data Cleaning', pos: new THREE.Vector3(-40, 20, 40) },
      { name: 'Sales Dashboard', pos: new THREE.Vector3(40, 20, 40) }
    ];

    projects.forEach((project, index) => {
      const sphere = new THREE.Mesh(projectGeometry, projectMaterial);
      sphere.position.copy(project.pos);
      sphere.userData = { name: project.name, index: index };
      this.scene.add(sphere);
    });
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(100, 100, 50);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00d4aa, 1, 200);
    pointLight.position.set(0, 100, 100);
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6c63ff, 1, 200);
    pointLight2.position.set(0, -100, 100);
    this.scene.add(pointLight2);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    });

    // Add mouse interaction
    const rect = this.container.getBoundingClientRect();
    this.container.addEventListener('mousemove', (event) => {
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Gentle rotation
    this.scene.rotation.y += 0.002;

    // Pulse effect on terrain layers
    const time = Date.now() * 0.001;
    this.terrains.forEach((terrain, index) => {
      const scale = 1 + Math.sin(time + index) * 0.05;
      terrain.scale.set(scale, scale, scale);
    }
    );

    // Rotate skill points
    if (this.skillPoints) {
      this.skillPoints.rotation.y = time * 0.5;
    }

    // Animate project indicators
    this.scene.traverse((child) => {
      if (child.geometry && child.geometry.type === 'SphereGeometry' && child.userData) {
        const scale = 1 + Math.sin(time * 2 + child.userData.index) * 0.3;
        child.scale.set(scale, scale, scale);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.skillPoints.geometry.dispose();
    this.skillPoints.material.dispose();
    this.renderer.dispose();
  }
}