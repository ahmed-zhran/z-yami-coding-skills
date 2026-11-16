const base = import.meta.env.BASE_URL;
const load = (path) => import(/* @vite-ignore */ `${base}${path}`);

Promise.all([load("assets/system.js"), load("assets/motion/motion.js")]);
