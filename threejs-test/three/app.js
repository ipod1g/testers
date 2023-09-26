import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import GUI from 'lil-gui';
import fragment from './shader/shader.frag';
import vertex from './shader/shader.vert';
import particleTexture from '@/public/particle.webp';

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
    });
    // this.renderer.autoClear = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.point = new THREE.Vector3(0, 0, 0);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      100
    );

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 2, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'
    ); // use a full url path
    this.gltf = new GLTFLoader();
    this.gltf.setDRACOLoader(this.dracoLoader);

    this.isPlaying = true;

    this.test();

    let particleoptions = [
      {
        particle_size: 0.02,
        particle_size_frequency: 1.188,
        particle_size_dispersion: 0.3,
        rotation_dispersion: 0.1,
        time_scale: 0.01,
        twist_speed: 0,
        twist_frequency: 3,
        twist_dispersion: 0.1,
        twist_dispersion_frequency: 2,
        twist_amplitude: 5,
        rotation_speed: 0,
        frequency: 0,
        amplitude: 0.346,
        offset: 0,
        opacity: 1,
        cone_shape: 0,
        color: '#f9ebb8',
        instance_count: 1e3,
        min_radius: 3,
        max_radius: 5.3,
      },
      {
        particle_size: 0.03,
        particle_size_frequency: 0.658,
        particle_size_dispersion: 0.197,
        time_scale: 0.098,
        twist_speed: 1.76,
        twist_dispersion: 0.3,
        twist_dispersion_frequency: 1.196,
        twist_frequency: 0.2136,
        twist_amplitude: 0.5,
        rotation_speed: 0.1,
        rotation_dispersion: 0.168,
        frequency: 0.69,
        amplitude: 0.092,
        offset: 0.6,
        opacity: 0.276,
        cone_shape: 1,
        color: '#f7b373',
        instance_count: 1e4,
        min_radius: 0.5,
        max_radius: 5,
      },
      {
        particle_size: 0.0184,
        particle_size_frequency: 1.62,
        particle_size_dispersion: 0.144,
        time_scale: 0.147,
        twist_speed: 0.12,
        twist_dispersion: 1.3,
        twist_dispersion_frequency: 0.72,
        twist_frequency: 0.183,
        twist_amplitude: 0,
        rotation_speed: 0.12,
        rotation_dispersion: 0.01,
        frequency: 1.37,
        amplitude: 0.188,
        offset: 2.22,
        opacity: 0.22,
        cone_shape: 1,
        color: '#88b3ce',
        instance_count: 2e4,
        min_radius: 0.5,
        max_radius: 5,
      },
    ];
    this.materials = [];
    particleoptions.forEach((opt) => {
      this.getMesh(opt);
    });

    this.resize();
    this.raycasterEvent();
    this.render();
    this.setupResize();
    // this.settings();
  }

  test() {
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  raycasterEvent() {
    let mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 100, 100).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    let testmesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    window.addEventListener('pointermove', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects([mesh]);

      if (intersects[0]) {
        this.point = intersects[0].point;
        // console.log(this.pointer, intersects[0].point);
        testmesh.position.copy(intersects[0].point);
      }
    });
  }

  //   settings() {
  //     let that = this;
  //     this.settings = {
  //       progress: 0,
  //     };
  //     this.gui = new GUI();
  //     this.gui.add(this.settings, 'progress', 0, 1, 0.01);
  //   }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  getMesh(opts) {
    let that = this;
    let count = opts.instance_count;
    let min_radius = opts.min_radius;
    let max_radius = opts.max_radius;
    let startergeo = new THREE.PlaneGeometry(1, 1);
    let geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute('position', startergeo.getAttribute('position')),
      (geo.index = startergeo.index);

    const wpos = new Float32Array(3 * count);

    for (let r = 0; r < count; r++) {
      let i = 0.05 * (2 * Math.random() - 1);
      let s = 0.2 * (2 * Math.random() - 1);
      let a = 0.05 * (2 * Math.random() - 1);
      let l = Math.pow(r / (count - 1), 0.5);
      let c = 2 * Math.PI * 0.618033 * r;
      let u = new THREE.Vector3(l * Math.cos(c) + i, 0, l * Math.sin(c) + a);
      u
        .multiplyScalar(max_radius - min_radius)
        .add(u.clone().normalize().multiplyScalar(min_radius)),
        (wpos[3 * r + 0] = u.x);
      wpos[3 * r + 1] = u.y + s;
      wpos[3 * r + 2] = u.z;
    }
    let attr = new THREE.InstancedBufferAttribute(wpos, 3, false);
    geo.setAttribute('w_pos', attr);
    geo.instanceCount = count;

    let material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        _MainTexture: {
          value: new THREE.TextureLoader().load(particleTexture),
        },
        _Opacity: {
          value: opts.opacity,
        },
        _MouseWorldPosition: {
          value: new THREE.Vector3(100, 0, 0),
        },
        _Size: {
          value: opts.particle_size,
        },
        _Time: {
          value: 0,
        },
        _RotationSpeed: {
          value: opts.rotation_speed,
        },
        _TwistSpeed: {
          value: opts.twist_speed,
        },
        _TwistFrequency: {
          value: opts.twist_frequency,
        },
        _TwistDispersion: {
          value: opts.twist_dispersion,
        },
        _TwistDispersionFrequency: {
          value: opts.twist_dispersion_frequency,
        },
        _RotationDispersion: {
          value: opts.rotation_dispersion,
        },
        _SizeFrequency: {
          value: opts.particle_size_frequency,
        },
        _SizeDispersion: {
          value: opts.particle_size_dispersion,
        },
        _TwistAmplitude: {
          value: opts.twist_amplitude,
        },
        _NoiseOffset: {
          value: opts.offset,
        },
        _NoiseFrequency: {
          value: 0,
        },
        _NoiseAmplitude: {
          value: opts.amplitude,
        },
        _Color: {
          value: new THREE.Color(opts.color),
        },
        _UseConeShape: {
          value: 0,
        },
        _MouseSphereRadius: {
          value: 0.3,
        },
        _MouseSphereAttractionRadius: {
          value: 0.4,
        },
        _MouseSphereFalloff: {
          value: 1,
        },
        _UseMouse: {
          value: 0,
        },
        _CameraFadeout: {
          value: 1,
        },
      },
      depthWrite: false,
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.cloud = new THREE.Mesh(geo, material);
    this.cloud.frustumCulled = false;
    this.scene.add(this.cloud);
    this.materials.push(material);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.render();
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.scene.rotation.z = 0.3;

    this.materials.forEach((m) => {
      m.uniforms._Time.value = this.time * 0.01;
      m.uniforms._MouseWorldPosition.value = this.point;
    });
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
