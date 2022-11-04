import * as THREE from "three";
import Experience from "@Experience/Experience.js";

import Environment from "@World/Environment.js";
import Floor from "@World/Floor";
import VideoSphere from "@World/VideoSphere.js";
import Fox from "@World/Fox";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("loaded", () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.enviorment = new Environment();
      this.videoSphere = new VideoSphere();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
