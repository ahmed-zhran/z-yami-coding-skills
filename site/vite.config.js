import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/z-yami-coding-skills/",
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        skills: resolve("skills.html"),
        contributing: resolve("contributing.html"),
      },
    },
  },
});
