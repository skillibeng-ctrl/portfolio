// src/components/ConstellationBG.jsx
// Lightweight constellation background: slow drifting dots that link up when close.
//
// Improvements over the first version:
//   - DPR-aware canvas (crisp on retina), capped at 2x for perf
//   - Dots are preserved across resizes (positions scaled) instead of reshuffled
//   - Link lines batched into 6 alpha buckets -> at most 6 stroke() calls instead of ~N²
//   - Dots drawn in a single path + single fill()
//   - Animation loop fully stops when off-screen (IntersectionObserver) and resets after tab switch
//   - Tunable props, defaults identical to before
import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const AREA_PER_DOT = 16000;
const LINK_BUCKETS = 6;
const FRAME_MS = 33; // ~30fps cap

export default function ConstellationBG({
  linkDistance = 120,
  maxDots = 70,
  speed = 1,
  dotColor = "rgba(147,197,253,0.8)",
  linkRgb = "59,130,246",
  linkOpacity = 0.35,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dots = [];
    let raf = 0;
    let last = 0;
    let running = false;

    // Precompute one rgba string per alpha bucket.
    const linkStyles = Array.from({ length: LINK_BUCKETS }, (_, i) => {
      const t = (i + 0.5) / LINK_BUCKETS;
      return `rgba(${linkRgb},${(t * linkOpacity).toFixed(3)})`;
    });

    const targetCount = () => Math.min(maxDots, Math.floor((w * h) / AREA_PER_DOT));

    const makeDot = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * speed,
      vy: (Math.random() - 0.5) * 0.25 * speed,
      r: Math.random() * 1.2 + 0.6,
    });

    // Keep existing dots across resizes: scale positions, then add/trim to target count.
    const syncDots = (prevW, prevH) => {
      if (prevW > 0 && prevH > 0 && dots.length) {
        const sx = w / prevW;
        const sy = h / prevH;
        for (const d of dots) {
          d.x *= sx;
          d.y *= sy;
        }
      }
      const target = targetCount();
      while (dots.length < target) dots.push(makeDot());
      if (dots.length > target) dots.length = target;
    };

    const draw = () => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      // --- Dots: one path, one fill ---
      if (dots.length) {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        for (const d of dots) {
          ctx.moveTo(d.x + d.r, d.y);
          ctx.arc(d.x, d.y, d.r, 0, TAU);
        }
        ctx.fill();
      }

      // --- Links: bucket by alpha, then one stroke() per bucket ---
      const maxSq = linkDistance * linkDistance;
      const buckets = Array.from({ length: LINK_BUCKETS }, () => []);

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const sq = dx * dx + dy * dy;
          if (sq < maxSq) {
            const fade = 1 - Math.sqrt(sq) / linkDistance; // 0..1
            const idx = Math.min(LINK_BUCKETS - 1, (fade * LINK_BUCKETS) | 0);
            buckets[idx].push(a.x, a.y, b.x, b.y);
          }
        }
      }

      ctx.lineWidth = 1;
      for (let b = 0; b < LINK_BUCKETS; b++) {
        const pts = buckets[b];
        if (!pts.length) continue;
        ctx.strokeStyle = linkStyles[b];
        ctx.beginPath();
        for (let k = 0; k < pts.length; k += 4) {
          ctx.moveTo(pts[k], pts[k + 1]);
          ctx.lineTo(pts[k + 2], pts[k + 3]);
        }
        ctx.stroke();
      }
    };

    const step = (dt) => {
      const k = dt / 16.67; // normalise to 60fps speed
      for (const d of dots) {
        d.x += d.vx * k;
        d.y += d.vy * k;
        if (d.x < 0) d.x = w;
        else if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        else if (d.y > h) d.y = 0;
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!last) {
        last = now;
        return;
      }
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return;
      last = now;
      step(Math.min(elapsed, 100));
      draw();
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const prevW = w;
      const prevH = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      if (!w || !h) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // canvas resize resets state

      syncDots(prevW, prevH);
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    // Tab switch: rAF pauses, so `last` would be stale on return.
    const onVisibility = () => {
      if (!document.hidden) last = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Paint something immediately rather than waiting for the first observer tick.
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [linkDistance, maxDots, speed, dotColor, linkRgb, linkOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}