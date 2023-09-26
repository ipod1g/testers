import * as THREE from 'three';

export interface IThree {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshNormalMaterial;
  mesh?: THREE.Mesh;
  time: number;
  addMesh(): void;
  render(): void;
}

export default class Sketch implements IThree {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshNormalMaterial;
  mesh?: THREE.Mesh;
  time: number;

  constructor(options) {
    this.container = options.dom;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );

    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.addMesh();
    this.time = 0;
    this.render();
  }

  addMesh() {
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  resize() {
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  render() {
    this.time++;
    if (this.mesh) {
      this.mesh.rotation.x = this.time / 2000;
      this.mesh.rotation.y = this.time / 1000;
    }
    console.log(this.time);
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
    window.requestAnimationFrame(this.render.bind(this));
  }
}
