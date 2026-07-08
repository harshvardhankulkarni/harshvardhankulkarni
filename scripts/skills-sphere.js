// Three.js implementation for 3D data visualizations
// Skills Sphere Visualization
class SkillsSphere {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.points = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.tooltip = container.querySelector('.skill-tooltip');
    this.animationFrame = null;
    this.rotationSpeed = 0.002;
    this.zoomLevel = 1;
    this.skills = [
      // Core Technical Skills - Blue (#6c63ff)
      { name: 'Python', category: 'Core', x: 0, y: 0, z: 0, color: 0x6c63ff, size: 18, proficiency: 95 },
      { name: 'SQL', category: 'Core', x: 35, y: 5, z: 15, color: 0x6c63ff, size: 16, proficiency: 90 },
      { name: 'Pandas', category: 'Core', x: 25, y: -10, z: 30, color: 0x6c63ff, size: 17, proficiency: 92 },
      { name: 'NumPy', category: 'Core', x: -20, y: 15, z: 20, color: 0x6c63ff, size: 15, proficiency: 88 },
      { name: 'Matplotlib', category: 'Core', x: -35, y: 0, z: 10, color: 0x6c63ff, size: 14, proficiency: 85 },
      { name: 'Seaborn', category: 'Core', x: 15, y: -25, z: 35, color: 0x6c63ff, size: 16, proficiency: 87 },
      { name: 'Plotly', category: 'Core', x: -15, y: 25, z: 20, color: 0x6c63ff, size: 19, proficiency: 94 },
      { name: 'Scikit-learn', category: 'Core', x: 30, y: 20, z: -15, color: 0x6c63ff, size: 21, proficiency: 91 },
      { name: 'Streamlit', category: 'Core', x: -25, y: 30, z: -20, color: 0x6c63ff, size: 15, proficiency: 89 },
      { name: 'Flask', category: 'Core', x: 10, y: 15, z: -35, color: 0x6c63ff, size: 13, proficiency: 86 },
      
      // AI/ML Capabilities - Teal (#00d4aa)
      { name: 'LLM APIs', category: 'AI/ML', x: -45, y: -15, z: -25, color: 0x00d4aa, size: 17, proficiency: 93 },
      { name: 'RAG Systems', category: 'AI/ML', x: 45, y: -30, z: -10, color: 0x00d4aa, size: 16, proficiency: 91 },
      { name: 'AI Agents', category: 'AI/ML', x: 20, y: 40, z: -30, color: 0x00d4aa, size: 18, proficiency: 88 },
      { name: 'LangGraph', category: 'AI/ML', x: -30, y: 35, z: -35, color: 0x00d4aa, size: 15, proficiency: 85 },
      { name: 'Prompt Engineering', category: 'AI/ML', x: 15, y: -35, z: 45, color: 0x00d4aa, size: 14, proficiency: 82 },
      { name: 'Model Evaluation', category: 'AI/ML', x: -40, y: 25, z: 45, color: 0x00d4aa, size: 16, proficiency: 84 },
      
      // Integration Expertise - Coral (#ff6b6b)
      { name: 'Zoho Creator', category: 'Integration', x: 20, y: -45, z: -45, color: 0xff6b6b, size: 19, proficiency: 96 },
      { name: 'Zoho CRM', category: 'Integration', x: -20, y: -40, z: -40, color: 0xff6b6b, size: 18, proficiency: 94 },
      { name: 'Zoho Books', category: 'Integration', x: 40, y: -20, z: -50, color: 0xff6b6b, size: 17, proficiency: 93 },
      { name: 'Zoho Projects', category: 'Integration', x: -40, y: -20, z: -50, color: 0xff6b6b, size: 16, proficiency: 91 },
      { name: 'Deluge Scripting', category: 'Integration', x: 0, y: 50, z: -30, color: 0xff6b6b, size: 15, proficiency: 89 },
      { name: 'REST APIs', category: 'Integration', x: 50, y: 10, z: -60, color: 0xff6b6b, size: 18, proficiency: 90 },
      { name: 'Cross-App Integration', category: 'Integration', x: -50, y: 10, z: -60, color: 0xff6b6b, size: 17, proficiency: 92 },
      { name: 'Third-Party Integration', category: 'Integration', x: 10, y: 10, z: 65, color: 0xff6b6b, size: 16, proficiency: 87 },
      
      // Additional Skills - Purple (#8888a0)
      { name: 'Git', category: 'Other', x: -55, y: -15, z: 30, color: 0x8888a0, size: 12, proficiency: 83 },
      { name: 'Jupyter', category: 'Other', x: 35, y: 35, z: 40, color: 0x8888a0, size: 14, proficiency: 81 },
      { name: 'Data Cleaning', category: 'Other', x: -35, y: 45, z: 20, color: 0x8888a0, size: 13, proficiency: 88 },
      { name: 'EDA', category: 'Other', x: 25, y: 50, z: 10, color: 0x8888a0, size: 12, proficiency: 85 },
      { name: 'Statistical Analysis', category: 'Other', x: 5, y: 25, z: 60, color: 0x8888a0, size: 13, proficiency: 82 },
      { name: 'Automation Pipelines', category: 'Other', x: -60, y: 25, z: 20, color: 0x8888a0, size: 15, proficiency: 89 },
      
      // Leadership & Business Skills - Gold (#ffd700) - Placed strategically
      { name: 'Multi-Client Management', category: 'Business', x: 60, y: 0, z: 30, color: 0xffd700, size: 16, proficiency: 94 },
      { name: 'Team Leadership', category: 'Business', x: -60, y: 0, z: 30, color: 0xffd700, size: 16, proficiency: 92 },
      { name: 'Client Communication', category: 'Business', x: 0, y: 60, z: 30, color: 0xffd700, size: 14, proficiency: 90 },
      { name: 'Problem Solving', category: 'Business', x: 30, y: 0, z: 60, color: 0xffd700, size: 15, proficiency: 95 },
      { name: 'Stakeholder Management', category: 'Business', x: -30, y: 0, z: 60, color: 0xffd700, size: 15, proficiency: 91 }
    ];
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0f);
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.002);

    // Camera with better zoom
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 80);

    // Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.2;
    this.controls.minDistance = 30;
    this.controls.maxDistance = 120;

    // Enhanced lighting with more dramatic effects
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6c63ff, 1.5, 150);
    pointLight1.position.set(50, 30, 30);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00d4aa, 1.5, 150);
    pointLight2.position.set(-50, -30, 30);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff6b6b, 1.5, 150);
    pointLight3.position.set(0, 0, -60);
    this.scene.add(pointLight3);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    this.skills.forEach(skill => {
      positions.push(skill.x, skill.y, skill.z);
      colors.push(skill.color);
      sizes.push(skill.size * 0.8); // Reduce particle sizes for better performance
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    // Add connections lines with better performance
    this.createConnections();

    // Add labels
    this.createLabels();

    // Event listeners
    this.setupEventListeners();

    // Start animation
    this.animate();
  }

  createConnections() {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6c63ff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });

    this.skills.forEach((skill, index) => {
      for (let i = index + 1; i < this.skills.length; i++) {
        const otherSkill = this.skills[i];
        const distance = Math.sqrt(
          Math.pow(skill.x - otherSkill.x, 2) +
          Math.pow(skill.y - otherSkill.y, 2) +
          Math.pow(skill.z - otherSkill.z, 2)
        );
        
        if (distance < 50) {
          const points = [new THREE.Vector3(skill.x, skill.y, skill.z), new THREE.Vector3(otherSkill.x, otherSkill.y, otherSkill.z)];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          this.scene.add(line);
        }
      }
    });
  }

  createLabels() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    // Create better text labels
    this.skills.forEach(skill => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#ffffff';
      context.font = 'bold 20px Arial';
      context.textAlign = 'center';
      context.fillText(skill.name, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true, 
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(skill.x, skill.y + 5, skill.z); // Offset up from sphere
      sprite.scale.set(25, 8, 1);
      this.scene.add(sprite);
    });
    this.labels = this.scene.children.filter(child => child instanceof THREE.Sprite);
  }

  setupEventListeners() {
    this.container.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX - this.container.offsetLeft) / this.container.offsetWidth * 2 - 1;
      this.mouse.y = -(event.clientY - this.container.offsetTop) / this.container.offsetHeight * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const intersects = this.raycaster.intersectObject(this.points);
      if (intersects.length > 0) {
        const object = intersects[0].object;
        const index = this.getSkillIndexFromPosition(object.geometry.attributes.position.array, intersects[0].point);
        if (index !== null && this.skills[index]) {
          this.showSkillTooltip(this.skills[index], event.clientX, event.clientY);
        }
      } else {
        if (this.tooltip) {
          this.tooltip.style.display = 'none';
        }
      }
    });

    this.container.addEventListener('click', (event) => {
      this.mouse.x = (event.clientX - this.container.offsetLeft) / this.container.offsetWidth * 2 - 1;
      this.mouse.y = -(event.clientY - this.container.offsetTop) / this.container.offsetHeight * 2 + 1;
      
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const intersects = this.raycaster.intersectObject(this.points);
      if (intersects.length > 0) {
        const object = intersects[0].object;
        const index = this.getSkillIndexFromPosition(object.geometry.attributes.position.array, intersects[0].point);
        if (index !== null && this.skills[index]) {
          this.highlightSkill(index);
        }
      }
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    });
  }

  getSkillIndexFromPosition(positionArray, point) {
    // Find closest skill point
    let minDistance = Infinity;
    let closestIndex = null;
    
    for (let i = 0; i < positionArray.length; i += 3) {
      const x = positionArray[i];
      const y = positionArray[i + 1];
      const z = positionArray[i + 2];
      
      const distance = Math.sqrt(
        Math.pow(x - point.x, 2) +
        Math.pow(y - point.y, 2) +
        Math.pow(z - point.z, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i / 3;
      }
    }
    
    return closestIndex;
  }

  showSkillTooltip(skill, x, y) {
    if (!this.tooltip) return;
    
    this.tooltip.innerHTML = `
      <div class="skill-tooltip-content">
        <div class="skill-name" style="color: ${this.getColorHex(skill.color)}">${skill.name}</div>
        <div class="skill-category">${skill.category}</div>
        <div class="skill-proficiency">
          <div class="proficiency-bar-bg">
            <div class="proficiency-bar" style="width: ${skill.proficiency}%; background: ${this.getColorHex(skill.color)}"></div>
          </div>
          <span>${skill.proficiency}% Proficiency</span>
        </div>
      </div>
    `;
    
    this.tooltip.style.left = x + 10 + 'px';
    this.tooltip.style.top = y - 30 + 'px';
    this.tooltip.style.display = 'block';
  }

  highlightSkill(index) {
    const skill = this.skills[index];
    if (!skill) return;
    
    // Highlight the selected skill
    const geometry = this.points.geometry;
    const sizes = geometry.attributes.size.array;
    
    for (let i = 0; i < this.skills.length; i++) {
      if (i === index) {
        sizes[i] = this.skills[i].size * 2; // Double size for highlighted
      } else {
        sizes[i] = this.skills[i].size * 0.8; // Slightly dim others
      }
    }
    
    geometry.attributes.size.needsUpdate = true;
    
    // Add glow effect to related skills
    setTimeout(() => {
      for (let i = 0; i < this.skills.length; i++) {
        if (this.skills[i].category === skill.category) {
          sizes[i] = this.skills[i].size * 1.5;
        } else {
          sizes[i] = this.skills[i].size * 0.9;
        }
      }
      geometry.attributes.size.needsUpdate = true;
      
      // Reset after 2 seconds
      setTimeout(() => {
        for (let i = 0; i < this.skills.length; i++) {
          sizes[i] = this.skills[i].size;
        }
        geometry.attributes.size.needsUpdate = true;
      }, 2000);
    }, 500);
  }

  getColorHex(rgbColor) {
    return '#' + rgbColor.toString(16).padStart(6, '0');
  }

  animate() {
    this.animationFrame = requestAnimationFrame(() => this.animate());

    // Rotate entire sphere with variable speed
    this.points.rotation.y += this.rotationSpeed;
    this.points.rotation.x += this.rotationSpeed * 0.3;

    // Gentle floating animation for labels
    if (this.labels) {
      const time = Date.now() * 0.001;
      this.labels.forEach((label, index) => {
        label.position.y = this.skills[index].y + 5 + Math.sin(time * 2 + index) * 2;
        label.scale.set(25 * (1 + Math.sin(time * 1.5 + index) * 0.1),
                       8 * (1 + Math.sin(time * 1.5 + index) * 0.1),
                       1);
      });
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  rotateSkillsSphere(axis) {
    this.controls.autoRotate = false;
    if (axis === 'x') {
      this.points.rotation.x += 0.1;
    } else if (axis === 'y') {
      this.points.rotation.y += 0.1;
    } else if (axis === 'z') {
      this.points.rotation.z += 0.1;
    }
  }

  zoomSkillsSphere(direction) {
    this.controls.autoRotate = false;
    if (direction === 'in' && this.camera.position.z > 20) {
      this.camera.position.z -= 5;
    } else if (direction === 'out') {
      this.camera.position.z += 5;
    }
    this.camera.updateProjectionMatrix();
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.renderer.dispose();
    this.controls.dispose();
  }
}