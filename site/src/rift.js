const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function project(x, y, z, yaw, pitch, canvas) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cx = Math.cos(pitch);
  const sx = Math.sin(pitch);
  const x1 = x * cy - z * sy;
  const z1 = x * sy + z * cy;
  const y1 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  const depth = 5.4 + z2;
  const scale = (canvas.height * 0.72) / depth;
  return {
    x: canvas.width / 2 + x1 * scale,
    y: canvas.height / 2 + y1 * scale,
    depth,
  };
}

function facesOf(box, yaw, pitch, canvas) {
  const [hw, hh, hd] = [box.w / 2, box.h / 2, box.d / 2];
  const local = [
    [-hw, -hh, -hd],
    [hw, -hh, -hd],
    [hw, hh, -hd],
    [-hw, hh, -hd],
    [-hw, -hh, hd],
    [hw, -hh, hd],
    [hw, hh, hd],
    [-hw, hh, hd],
  ];
  const verts = local.map(([x, y, z]) => project(box.x + x, box.y + y, box.z + z, yaw, pitch, canvas));
  const index = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 1, 5, 4],
    [3, 2, 6, 7],
    [0, 3, 7, 4],
    [1, 2, 6, 5],
  ];
  return index.map((ids, face) => {
    const corners = ids.map((id) => verts[id]);
    const depth = corners.reduce((sum, point) => sum + point.depth, 0) / corners.length;
    return { corners, depth, face, tone: box.tones[face] };
  });
}

export function mountRift(canvas) {
  const ctx = canvas.getContext("2d");
  let mx = 0;
  let my = 0;
  let frame = 0;
  let running = true;

  const onMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    mx = (event.clientX - rect.left) / rect.width - 0.5;
    my = (event.clientY - rect.top) / rect.height - 0.5;
  };
  canvas.addEventListener("pointermove", onMove);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, canvas.clientWidth * dpr);
    canvas.height = Math.max(1, canvas.clientHeight * dpr);
  };
  resize();
  window.addEventListener("resize", resize);

  const plates = [
    { w: 1.7, h: 0.22, d: 1.15, y: -0.55, tones: ["#12141e", "#1c2030", "#f4f7ff", "#8eb6ff", "#16192a", "#0e111b"] },
    { w: 1.85, h: 0.22, d: 1.25, y: 0, tones: ["#10131c", "#1a1e30", "#d5def8", "#6f93e6", "#141826", "#0c0e16"] },
    { w: 1.6, h: 0.22, d: 1.05, y: 0.55, tones: ["#0e111a", "#181c2a", "#ffd8a8", "#8eb6ff", "#12151f", "#090b12"] },
  ];

  const shards = Array.from({ length: 8 }, (_, index) => ({
    angle: (Math.PI * 2 * index) / 8,
    radius: 1.7 + (index % 3) * 0.18,
    w: 0.28,
    h: 0.16,
    d: 0.28,
    tones: ["#12141e", "#8eb6ff", "#f4f7ff", "#1c2030", "#0e111b", "#6f93e6"],
  }));

  const draw = (now) => {
    if (!running) return;
    const t = reduce ? 0.6 : now / 1000;
    const yaw = t * 0.45 + mx * 0.7;
    const pitch = 0.55 + Math.sin(t * 0.4) * 0.08 + my * 0.3;
    const open = reduce ? 0.35 : 0.22 + Math.sin(t * 0.9) * 0.18;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const glow = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.5,
      20,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.42,
    );
    glow.addColorStop(0, "rgba(142, 182, 255, 0.22)");
    glow.addColorStop(0.45, "rgba(255, 216, 168, 0.06)");
    glow.addColorStop(1, "rgba(142, 182, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const painted = [];
    plates.forEach((plate, index) => {
      const lift = (index - 1) * open;
      painted.push(
        ...facesOf(
          { ...plate, x: Math.sin(t + index) * 0.05, y: plate.y + lift, z: 0 },
          yaw,
          pitch,
          canvas,
        ),
      );
    });
    shards.forEach((shard, index) => {
      const angle = shard.angle + t * 0.35;
      painted.push(
        ...facesOf(
          {
            ...shard,
            x: Math.cos(angle) * shard.radius,
            y: Math.sin(t * 0.7 + index) * 0.35,
            z: Math.sin(angle) * shard.radius,
          },
          yaw * 1.4,
          pitch,
          canvas,
        ),
      );
    });

    painted
      .sort((a, b) => b.depth - a.depth)
      .forEach((face) => {
        ctx.beginPath();
        face.corners.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fillStyle = face.tone;
        ctx.fill();
      });

    frame = requestAnimationFrame(draw);
  };

  frame = requestAnimationFrame(draw);
  return () => {
    running = false;
    cancelAnimationFrame(frame);
    canvas.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
  };
}

export function mountTilt() {
  if (reduce) return;
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(12px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
