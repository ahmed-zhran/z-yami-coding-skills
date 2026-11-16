const base = import.meta.env.BASE_URL;
const load = (path) => import(/* @vite-ignore */ `${base}${path}`);

const scripts = [
  "assets/system.js",
  "assets/ui/ui.js",
  "assets/layout/layout.js",
  "assets/motion/motion.js",
  "assets/effects/fx.js",
  "assets/moments/moments.js",
];

Promise.all(scripts.map(load)).then(() => import("./site.js"));
