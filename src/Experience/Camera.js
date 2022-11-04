import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "@Experience/Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.parentFolder = this.debug.ui.addFolder("Perspective");
      this.cameraFolder = this.parentFolder.addFolder("Camera");
      this.targetFolder = this.parentFolder.addFolder("Target");
    }

    this.setInstace();
    this.setOrbitControls();
  }

  setInstace() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      .5,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
    this.setDebug();
  }

  setDebug() {
    if (this.debug.active) {
      const debugObject = {
        cameraX: 6,
        cameraY: 4,
        cameraZ: 8,
        targetX: 0,
        targetY: 2,
        targetZ: 0,
      };
      this.cameraFolder.add(debugObject, "cameraX", 0, 10).onChange((value) => {
        this.instance.position.set(
          value,
          this.instance.position.y,
          this.instance.position.z
        );
      });
      this.cameraFolder.add(debugObject, "cameraY", 0, 10).onChange((value) => {
        this.instance.position.set(
          this.instance.position.x,
          value,
          this.instance.position.z
        );
      });
      this.cameraFolder.add(debugObject, "cameraZ", 0, 10).onChange((value) => {
        this.instance.position.set(
          this.instance.position.x,
          this.instance.position.y,
          value
        );
      });
      this.targetFolder.add(debugObject, "targetX", 0, 10).onChange((value) => {
        this.controls.target.set(
          value,
          this.controls.target.y,
          this.controls.target.z
        );
      });
      this.targetFolder.add(debugObject, "targetY", 0, 10).onChange((value) => {
        this.controls.target.set(
          this.controls.target.x,
          value,
          this.controls.target.z
        );
      });
      this.targetFolder.add(debugObject, "targetZ", 0, 10).onChange((value) => {
        this.controls.target.set(
          this.controls.target.x,
          this.controls.target.y,
          value
        );
      });
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
