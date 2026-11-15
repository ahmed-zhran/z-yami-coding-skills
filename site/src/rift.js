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
  const scale = (canvas.height * 0.55) / depth;
  return {
    x: canvas.width * 0.62 + x1 * scale,
    y: canvas.height * 0.42 + y1 * scale,
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

  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.4 + 0.3,
    a: Math.random() * 0.55 + 0.15,
    tw: Math.random() * Math.PI * 2,
  }));

  const onMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    mx = (event.clientX - rect.left) / rect.width - 0.5;
    my = (event.clientY - rect.top) / rect.height - 0.5;
  };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, canvas.clientWidth * dpr);
    canvas.height = Math.max(1, canvas.clientHeight * dpr);
  };
  resize();
  window.addEventListener("resize", resize);

  const plates = [
    { w: 1.7, h: 0.2, d: 1.15, y: -0.55, tones: ["#0a1422", "#16304a", "#ffffff", "#3db4ff", "#0e1a2a", "#050b14"] },
    { w: 1.85, h: 0.2, d: 1.25, y: 0, tones: ["#081220", "#12304a", "#9ad0ff", "#1a7fd4", "#0c1828", "#040910"] },
    { w: 1.6, h: 0.2, d: 1.05, y: 0.55, tones: ["#0a1018", "#2a2410", "#ffb43c", "#3db4ff", "#12140c", "#06080c"] },
  ];

  const shards = Array.from({ length: 10 }, (_, index) => ({
    angle: (Math.PI * 2 * index) / 10,
    radius: 1.85 + (index % 3) * 0.16,
    w: 0.24,
    h: 0.14,
    d: 0.24,
    tones: ["#0a1422", "#3db4ff", "#ffffff", "#16304a", "#050b14", "#1a7fd4"],
  }));

  const draw = (now) => {
    if (!running) return;
    const t = reduce ? 0.6 : now / 1000;
    const yaw = t * 0.32 + mx * 0.45;
    const pitch = 0.48 + Math.sin(t * 0.35) * 0.06 + my * 0.2;
    const open = reduce ? 0.28 : 0.18 + Math.sin(t * 0.8) * 0.14;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#03101c");
    sky.addColorStop(0.45, "#01080f");
    sky.addColorStop(1, "#010308");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      const twinkle = reduce ? star.a : star.a * (0.7 + 0.3 * Math.sin(t * 1.4 + star.tw));
      ctx.beginPath();
      ctx.fillStyle = `rgba(200, 230, 255, ${Math.min(1, twinkle + 0.12)})`;
      ctx.arc(star.x * canvas.width, star.y * canvas.height * 0.72, star.r * 1.15, 0, Math.PI * 2);
      ctx.fill();
    });

    const horizon = ctx.createRadialGradient(
      canvas.width * 0.55,
      canvas.height * 0.78,
      10,
      canvas.width * 0.55,
      canvas.height * 0.78,
      canvas.width * 0.55,
    );
    horizon.addColorStop(0, "rgba(255, 180, 60, 0.28)");
    horizon.addColorStop(0.3, "rgba(61, 180, 255, 0.14)");
    horizon.addColorStop(1, "rgba(1, 3, 8, 0)");
    ctx.fillStyle = horizon;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(
      canvas.width * 0.62,
      canvas.height * 0.4,
      20,
      canvas.width * 0.62,
      canvas.height * 0.4,
      canvas.width * 0.38,
    );
    glow.addColorStop(0, "rgba(61, 180, 255, 0.32)");
    glow.addColorStop(0.45, "rgba(255, 180, 60, 0.08)");
    glow.addColorStop(1, "rgba(61, 180, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const painted = [];
    plates.forEach((plate, index) => {
      const lift = (index - 1) * open;
      painted.push(
        ...facesOf(
          { ...plate, x: Math.sin(t * 0.7 + index) * 0.04, y: plate.y + lift, z: 0 },
          yaw,
          pitch,
          canvas,
        ),
      );
    });
    shards.forEach((shard, index) => {
      const angle = shard.angle + t * 0.28;
      painted.push(
        ...facesOf(
          {
            ...shard,
            x: Math.cos(angle) * shard.radius,
            y: Math.sin(t * 0.6 + index) * 0.28,
            z: Math.sin(angle) * shard.radius,
          },
          yaw * 1.25,
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
    window.removeEventListener("pointermove", onMove);
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
      card.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(8px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
