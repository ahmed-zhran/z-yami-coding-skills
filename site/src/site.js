function swap(apply) {
  if (document.startViewTransition) document.startViewTransition(apply);
  else apply();
}

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

function bindParallax(rootSel, sceneSel, intensity = 1) {
  const root = document.querySelector(rootSel);
  if (!root || !fine || reduce) return;
  const scene = root.querySelector(sceneSel);
  if (!scene) return;
  let raf = 0;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  const baseX = 10;
  const tick = () => {
    raf = 0;
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    const rx = (baseX - cy * 14 * intensity).toFixed(2);
    const ry = (cx * 18 * intensity).toFixed(2);
    scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
  };
  root.addEventListener(
    "pointermove",
    (e) => {
      const r = root.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true },
  );
  root.addEventListener("pointerleave", () => {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  });
}

bindParallax("[data-flow-stage]", "[data-flow-scene]", 1);
bindParallax("[data-orch-stage]", "[data-orch-scene]", 0.85);

/* before / after: overlay panes; warped stick only (leans left at rest) */
const compare = document.querySelector("[data-compare]");
if (compare) {
  const warp = compare.querySelector("[data-compare-warp]");
  const label = compare.querySelector("[data-compare-label]");
  let dragging = false;

  const warpPath = (v) => {
    // Rest leans left of center; drag adds more lean.
    const lean = ((v - 40) / 20) * 16;
    const a = 18 - lean;
    const b = 30 + lean;
    return `M24 0 C ${a} 40, ${b} 80, 22 120 C ${a - 4} 160, ${b + 4} 200, 20 240 C ${a} 280, ${b} 320, 22 360 C 14 380, 30 390, 22 400`;
  };

  const set = (value) => {
    const v = Math.max(28, Math.min(72, Number(value) || 40));
    compare.style.setProperty("--split", `${v}%`);
    compare.setAttribute("aria-valuenow", String(Math.round(v)));
    if (warp) warp.setAttribute("d", warpPath(v));
    if (label) {
      label.textContent =
        v < 38
          ? "Stick left · With Yami peeks in"
          : v > 55
            ? "Stick right · With Yami covers most"
            : "Drag the stick · sides overlay";
    }
  };

  const fromEvent = (e) => {
    const r = compare.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };

  set(40);

  compare.addEventListener("pointerdown", (e) => {
    dragging = true;
    compare.setPointerCapture?.(e.pointerId);
    set(fromEvent(e));
  });
  compare.addEventListener("pointermove", (e) => {
    if (!dragging && !(fine && !reduce)) return;
    if (!dragging && fine && !reduce) {
      set(fromEvent(e));
      return;
    }
    if (dragging) set(fromEvent(e));
  });
  const endDrag = () => {
    dragging = false;
  };
  compare.addEventListener("pointerup", endDrag);
  compare.addEventListener("pointercancel", endDrag);
  compare.addEventListener("keydown", (e) => {
    const now = Number(compare.getAttribute("aria-valuenow") || 40);
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      set(now - 3);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      set(now + 3);
    }
  });
  if (!compare.hasAttribute("tabindex")) compare.setAttribute("tabindex", "0");
}

/* Herdr hero: cycle ask/steer beats across parent + kids */
const herdr = document.querySelector("[data-herdr-beat]");
if (herdr && !reduce) {
  let beat = 0;
  const tick = () => {
    herdr.classList.remove("beat-0", "beat-1", "beat-2", "beat-3");
    herdr.classList.add(`beat-${beat}`);
    beat = (beat + 1) % 4;
  };
  tick();
  window.setInterval(tick, 2200);
} else if (herdr) {
  herdr.classList.add("beat-0", "beat-1", "beat-2", "beat-3");
}

/* walkthrough steps */
const walk = document.querySelector("[data-walk]");
if (walk) {
  const buttons = [...walk.querySelectorAll("[data-walk-step]")];
  const panes = [...walk.querySelectorAll("[data-walk-pane]")];
  const show = (id) => {
    buttons.forEach((btn) => {
      const on = btn.dataset.walkStep === id;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    panes.forEach((pane) => {
      const on = pane.dataset.walkPane === id;
      pane.hidden = !on;
      pane.classList.toggle("is-on", on);
    });
  };
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => show(btn.dataset.walkStep));
  });
  let i = 0;
  if (!reduce && buttons.length) {
    window.setInterval(() => {
      if (walk.matches(":hover")) return;
      i = (i + 1) % buttons.length;
      show(buttons[i].dataset.walkStep);
    }, 4200);
  }
}

/* pointer glow on interactive cards */
if (fine && !reduce) {
  document.querySelectorAll("[data-glow]").forEach((card) => {
    card.addEventListener(
      "pointermove",
      (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      },
      { passive: true },
    );
  });
}

/* magnetic primary buttons */
if (fine && !reduce) {
  document.querySelectorAll(".btn--primary").forEach((btn) => {
    btn.addEventListener(
      "pointermove",
      (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        btn.style.transform = `translate(${(x * 6).toFixed(1)}px, ${(y * 4 - 1).toFixed(1)}px)`;
      },
      { passive: true },
    );
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}
