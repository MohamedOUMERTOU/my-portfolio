import React, { useEffect, useRef } from "react";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Interactive 3D globe of technology logos: drag (or swipe) to spin it, it keeps its momentum.
function TechSphere({ items, label }) {
  const stageRef = useRef();
  const itemRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const n = items.length;
    // fibonacci-distributed points on the unit sphere
    const pts = items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(GOLDEN_ANGLE * i) * r, y, Math.sin(GOLDEN_ANGLE * i) * r];
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vx = 0.002; // rotation speed around the X axis
    let vy = reduced ? 0 : 0.006; // around the Y axis
    let radius = stage.clientWidth * 0.38;
    let drag = null;
    let frame;

    const rotate = (ax, ay) => {
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (const p of pts) {
        const [x, y, z] = p;
        const y1 = y * cx - z * sx;
        const z1 = y * sx + z * cx;
        p[0] = x * cy + z1 * sy;
        p[1] = y1;
        p[2] = -x * sy + z1 * cy;
      }
    };

    const render = () => {
      pts.forEach(([x, y, z], i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const depth = (z + 1) / 2; // 0 = back, 1 = front
        const scale = 0.55 + depth * 0.65;
        el.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
        el.style.opacity = 0.25 + depth * 0.75;
        el.style.zIndex = Math.round(depth * 100);
        el.style.filter = `blur(${(1 - depth) * 1.5}px)`;
      });
    };

    const tick = () => {
      if (!drag) {
        rotate(vx, vy);
        // ease back to a gentle idle spin after a flick
        vx += ((reduced ? 0 : 0.002) - vx) * 0.02;
        vy += ((reduced ? 0 : 0.006) - vy) * 0.02;
      }
      render();
      frame = requestAnimationFrame(tick);
    };

    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY };
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      vy = dx * 0.006;
      vx = -dy * 0.006;
      rotate(vx, vy);
    };
    const onUp = () => {
      drag = null;
    };
    const ro = new ResizeObserver(() => {
      radius = stage.clientWidth * 0.38;
    });

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    ro.observe(stage);
    tick();

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      ro.disconnect();
    };
  }, [items]);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={label}
      className="relative mx-auto aspect-square w-full max-w-md cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <div className="absolute inset-[18%] rounded-full bg-gradient opacity-20 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-[10%] rounded-full border border-slate-300/40 dark:border-slate-600/30" aria-hidden="true" />
      {items.map(({ name, img }, i) => (
        <div
          key={name}
          ref={(el) => (itemRefs.current[i] = el)}
          className="absolute left-1/2 top-1/2 flex flex-col items-center will-change-transform"
        >
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-dark-card/80 shadow-lg shadow-purple-500/10 backdrop-blur">
            <img src={img} alt="" draggable="false" className="h-7 w-7 md:h-8 md:w-8" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
          </div>
          <span className="mt-1 whitespace-nowrap text-[10px] md:text-xs font-medium text-dark-heading dark:text-light-heading">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TechSphere;
