import * as THREE from "three";
import Experience from "@Experience/Experience.js";

// TODO: Should be a cube / skybox
// https://github.com/EnayetHossain/3d-world/blob/master/public/client.js

export default class VideoSphere {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setModel();
  }

  setModel() {
    this.video = document.createElement("video");
    this.video.src = "/videos/360_Video.mp4";
    this.video.muted = true;
    this.video.loop = true;
    this.video.crossOrigin = "";
    this.video.setAttribute("webkit-playsinline", "true");
    this.video.setAttribute("playsinline", "true");
    this.video.load();

    this.texture = new THREE.VideoTexture(this.video);
    this.texture.encoding = THREE.sRGBEncoding;
    this.texture.needsUpdate = true;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.BackSide,
    });
    this.geometry = new THREE.SphereGeometry(12, 32, 32);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 6, 0);

    this.video.addEventListener("canplay", () => {
      this.scene.add(this.mesh);
      this.video.play();
    });
  }
}
