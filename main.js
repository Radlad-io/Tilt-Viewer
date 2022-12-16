import "./style.css";
import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import ServiceWorker from "@Experience/Utils/RegisterServiceWorker.js";
import Tilt from "@World/Tilt";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const experience = new Experience(canvas);

new ServiceWorker();
new Tilt("models/Sierra_Oxenrider.glb");

// const fileSelector = document.getElementById("file-selector");
// const uploader = document.querySelector(".uploader");

// const fileSelector = document.querySelector("#file-uploader");
// fileSelector.addEventListener("change", (event) => {
//   const reader = new FileReader();
//   const file = event.target.files[0];
//   // const URL = new URL();
//   // const fileURL = URL.createObjectURL(reader.readAsDataURL(file));
//   uploader.className = "hide";

//   // reader.addEventListener("load", (e) => {
//   //   console.log(e.target.result);
//   //   console.log(reader);
//   // });
// });
