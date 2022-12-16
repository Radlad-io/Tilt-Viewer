import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import Experience from "@Experience/Experience.js";

export default class Renderer {
  constructor() {
    this.vr = window.location.hash === "#vr";
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Scene");
    }

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#000000");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.setDebug();
    if (this.vr) {
      this.instance.xr.enabled = true;
      document.body.appendChild(VRButton.createButton(this.instance));
    }
  }

  setGridHelper() {
    this.size = 10;
    this.divisions = 10;
    this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
    this.scene.add(this.gridHelper);
  }

  removeGridHelper() {
    this.scene.remove(this.gridHelper);
  }

  setDebug() {
    if (this.debug.active) {
      const debugObject = {
        bgColor: "#000000",
        showGrid: false,
      };
      this.debugFolder.addColor(debugObject, "bgColor").onChange((value) => {
        this.instance.setClearColor(value);
      });
      this.debugFolder.add(debugObject, "showGrid").onChange((value) => {
        if (value) {
          this.setGridHelper();
        } else {
          this.removeGridHelper();
        }
      });
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    if (this.vr) {
      this.instance.setAnimationLoop(() => {
        this.instance.render(this.scene, this.camera.instance);
      });
    } else {
      this.instance.render(this.scene, this.camera.instance);
    }
  }
}
