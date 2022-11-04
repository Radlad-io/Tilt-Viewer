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
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    if (this.vr) {
      this.instance.xr.enabled = true;
      document.body.appendChild(VRButton.createButton(this.instance));
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
