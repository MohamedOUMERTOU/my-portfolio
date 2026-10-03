import React, { useRef } from "react";

// Card that tilts toward the pointer in 3D, with a moving light glare.
// Children can pop out of the surface with the `.depth-*` classes (see index.css).
function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef();

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--glare", "1");
  };

  const onPointerLeave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className="tilt-scene h-full">
      <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`tilt-card ${className}`}>
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

export default TiltCard;
