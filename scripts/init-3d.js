// Three.js and 3D Visualization Initialization
// Load when DOM is ready

let skillsSphere = null;
let pipelineFlow = null;
let projectShowcase = null;
let dataTerrain = null;

function initializeThreeJS() {
  const container = document.getElementById('skills-sphere');
  if (!container) return;
  
  // Load skills sphere visualization
  if (skillsSphere) {
    skillsSphere.destroy();
  }
  
  const script = document.createElement('script');
  script.src = 'scripts/skills-sphere.js';
  script.onload = () => {
    skillsSphere = new SkillsSphere(container);
  };
  document.head.appendChild(script);
}

function initializePipelineVisualization() {
  const container = document.getElementById('pipeline-flow');
  if (!container) return;
  
  if (pipelineFlow) {
    pipelineFlow.destroy();
  }
  
  const script = document.createElement('script');
  script.src = 'scripts/pipeline-flow.js';
  script.onload = () => {
    pipelineFlow = new PipelineFlow(container);
    document.querySelector('.play-btn').onclick = () => pipelineFlow.toggleAnimation();
  };
  document.head.appendChild(script);
}

function initializeProjectShowcase() {
  const container = document.getElementById('project-showcase');
  if (!container) return;
  
  if (projectShowcase) {
    projectShowcase.destroy();
  }
  
  const script = document.createElement('script');
  script.src = 'scripts/project-showcase.js';
  script.onload = () => {
    projectShowcase = new ProjectShowcase(container);
  };
  document.head.appendChild(script);
}

function initializeDataTerrain() {
  const container = document.getElementById('data-terrain');
  if (!container) return;
  
  if (dataTerrain) {
    dataTerrain.destroy();
  }
  
  const script = document.createElement('script');
  script.src = 'scripts/data-terrain.js';
  script.onload = () => {
    dataTerrain = new DataTerrain(container);
  };
  document.head.appendChild(script);
}

// Initialize all 3D visualizations on page load
function init3DVisualizations() {
  setTimeout(() => {
    initializeThreeJS();
    initializePipelineVisualization();
    initializeProjectShowcase();
    initializeDataTerrain();
  }, 500);
}

// Rotate skills sphere functions
function rotateSkillsSphere(axis) {
  if (skillsSphere) {
    skillsSphere.rotateSkillsSphere(axis);
  }
}

function zoomSkillsSphere(direction) {
  if (skillsSphere) {
    skillsSphere.zoomSkillsSphere(direction);
  }
}

// Cleanup on page before unload
window.addEventListener('beforeunload', () => {
  if (skillsSphere) skillsSphere.destroy();
  if (pipelineFlow) pipelineFlow.destroy();
  if (projectShowcase) projectShowcase.destroy();
  if (dataTerrain) dataTerrain.destroy();
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init3DVisualizations);
} else {
  init3DVisualizations();
}