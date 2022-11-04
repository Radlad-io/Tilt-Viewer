import * as THREE from "three";
import Experience from "@Experience/Experience.js";

import Environment from "@World/Environment.js";
import Tilt from "@World/Tilt";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("loaded", () => {
      this.tilt = new Tilt();
      this.enviorment = new Environment();
    });
  }

  update() {}
}
