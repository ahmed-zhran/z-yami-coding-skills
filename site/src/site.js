import { mountRift, mountTilt } from "./rift.js";

const canvas = document.querySelector("[data-rift]");
if (canvas) mountRift(canvas);
mountTilt();

function swap(apply) {
  if (document.startViewTransition) document.startViewTransition(apply);
  else apply();
}

const tabs = document.querySelectorAll("[data-install-tab]");
const panels = document.querySelectorAll("[data-install-panel]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const name = tab.dataset.installTab;
    swap(() => {
      tabs.forEach((item) => {
        const on = item === tab;
        item.classList.toggle("is-on", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.installPanel !== name;
      });
    });
  });
});

const stopButtons = document.querySelectorAll("[data-stop]");
const stopPanels = document.querySelectorAll("[data-stop-panel]");
stopButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.stop;
    swap(() => {
      stopButtons.forEach((item) => {
        const on = item === button;
        item.classList.toggle("is-on", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      stopPanels.forEach((panel) => {
        panel.hidden = panel.dataset.stopPanel !== name;
      });
    });
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(button.dataset.copy);
    const text = target?.innerText?.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1400);
  });
});

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollDriven = CSS.supports("animation-timeline", "view()");
if (reduce) {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
} else if (!scrollDriven && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
} else if (!scrollDriven) {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
}
