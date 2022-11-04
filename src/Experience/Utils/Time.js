import EventEmitter from "@Utils/EventEmitter";
import Stats from "stats.js";
import Experience from "@Experience/Experience.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    //  Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    // initial delta starts at 1/60 fps to avoide bugs
    this.delta = 16;

    // Stats
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.stats = new Stats();
    this.stats.showPanel(0);
    if (this.debug.active) {
      document.body.appendChild(this.stats.dom);
    }

    // waits 1 frame to start tick sequence
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      if (this.debug.active) {
        // TODO: Not sure this is working as intended
        this.stats.begin();
        this.stats.end();
      }
      this.tick();
    });
  }
}
