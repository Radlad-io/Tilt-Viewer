import * as THREE from "three";
import Experience from "@Experience/Experience.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFGoogleTiltBrushMaterialExtension } from "three-icosa/dist/three-icosa.module.js";

export default class Tilt {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.loader = new GLTFLoader();

    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Tilt");
    }

    this.setModel();
  }

  setModel() {
    this.loader.register(
      (parser) =>
        new GLTFGoogleTiltBrushMaterialExtension(
          parser,
          "../../textures/brushes/"
        )
    );
    this.loader.load("models/Pallet/pallet.glb", (model) => {
      model.scene.position.set(2, -3.5, 4.5);
      model.scene.scale.set(4, 4, 4);
      model.scene.name = "TiltModel";
      this.scene.add(model.scene);
      this.setDebug();
    });
  }

  setDebug() {
    this.ref = this.scene.children.find(({ name }) => name === "TiltModel");
    if (this.debug.active) {
      const debugObject = {
        positionX: this.ref.position.x,
        positionY: this.ref.position.y,
        positionZ: this.ref.position.z,
        scale: this.ref.scale.x,
      };
      this.debugFolder
        .add(debugObject, "positionX", -20, 20)
        .step(0.25)
        .onChange((value) => {
          this.ref.position.set(
            value,
            this.ref.position.y,
            this.ref.position.z
          );
        });
      this.debugFolder
        .add(debugObject, "positionY", -20, 20)
        .step(0.25)
        .onChange((value) => {
          this.ref.position.set(
            this.ref.position.x,
            value,
            this.ref.position.z
          );
        });
      this.debugFolder
        .add(debugObject, "positionZ", -20, 20)
        .step(0.25)
        .onChange((value) => {
          this.ref.position.set(
            this.ref.position.x,
            this.ref.position.y,
            value
          );
        });
      this.debugFolder
        .add(debugObject, "scale", -20, 20)
        .step(0.25)
        .onChange((value) => {
          this.ref.scale.set(value, value, value);
        });
    }
  }
}
