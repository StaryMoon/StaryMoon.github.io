(function () {
  const canvas = document.getElementById("rainCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const pointer = { x: 0.64, y: 0.42, active: false };
  const rain = Array.from({ length: 78 }, (_, index) => ({
    x: (index * 37) % 560,
    y: (index * 91) % 300,
    length: 38 + ((index * 11) % 32),
    speed: 0.8 + ((index * 7) % 9) / 10,
    alpha: 0.16 + ((index * 5) % 8) / 100
  }));

  let width = 0;
  let height = 0;
  let ratio = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    ratio = window.devicePixelRatio || 1;
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(180, Math.floor(rect.height));
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function roundedRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function drawScene(clearX, clearY, clearRadius) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f7fbfb");
    gradient.addColorStop(1, "#f8f5ef");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(16, 19, 23, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height * 0.22, height);
      ctx.stroke();
    }

    ctx.fillStyle = "#e9f4f1";
    roundedRect(width * 0.08, height * 0.56, width * 0.36, height * 0.26, 8);
    ctx.fill();

    ctx.fillStyle = "#f1e8d5";
    roundedRect(width * 0.52, height * 0.46, width * 0.34, height * 0.32, 8);
    ctx.fill();

    ctx.fillStyle = "#d8ecf0";
    ctx.beginPath();
    ctx.arc(width * 0.38, height * 0.38, height * 0.18, 0, Math.PI * 2);
    ctx.fill();

    const clearGradient = ctx.createRadialGradient(
      clearX,
      clearY,
      clearRadius * 0.1,
      clearX,
      clearY,
      clearRadius
    );
    clearGradient.addColorStop(0, "rgba(255, 255, 255, 0.92)");
    clearGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = clearGradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawRain(clearX, clearY, clearRadius) {
    ctx.lineCap = "round";
    rain.forEach((drop) => {
      drop.y += drop.speed;
      if (drop.y > height + drop.length) {
        drop.y = -drop.length;
        drop.x = (drop.x + 97) % width;
      }

      const dx = drop.x - clearX;
      const dy = drop.y - clearY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const fade = Math.min(1, Math.max(0, (distance - clearRadius * 0.45) / clearRadius));

      ctx.strokeStyle = `rgba(24, 61, 78, ${drop.alpha * fade})`;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - drop.length * 0.26, drop.y + drop.length);
      ctx.stroke();
    });
  }

  function draw(time) {
    const targetX = pointer.x * width;
    const targetY = pointer.y * height;
    const driftX = pointer.active ? targetX : width * (0.55 + Math.sin(time / 1600) * 0.13);
    const driftY = pointer.active ? targetY : height * (0.48 + Math.cos(time / 1900) * 0.1);
    const clearRadius = Math.min(width, height) * 0.42;

    drawScene(driftX, driftY, clearRadius);
    drawRain(driftX, driftY, clearRadius);

    ctx.strokeStyle = "rgba(0, 166, 184, 0.32)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(driftX, driftY, clearRadius * 0.45, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  function handlePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    pointer.active = true;
  }

  canvas.addEventListener("pointermove", handlePointer);
  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });
  window.addEventListener("resize", resize);

  resize();
  requestAnimationFrame(draw);
})();
