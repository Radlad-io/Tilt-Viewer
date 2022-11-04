import path, { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@src": path.resolve(__dirname, "./src"),
      "@Experience": path.resolve(__dirname, "./src/Experience"),
      "@Utils": path.resolve(__dirname, "./src/Experience/Utils"),
      "@World": path.resolve(__dirname, "./src/Experience/World"),
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp4", "**/*.json"],
  // server: {
  //   https: true,
  // },
});
