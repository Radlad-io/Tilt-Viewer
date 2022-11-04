import "./style.css";
import Experience from "@Experience/Experience.js";
import ServiceWorker from "@Experience/Utils/RegisterServiceWorker.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const experience = new Experience(canvas);

new ServiceWorker();
