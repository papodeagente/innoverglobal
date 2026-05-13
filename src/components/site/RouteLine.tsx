/** Decorative section "route" line: animates from left point to right point on scroll. */
import { useEffect, useRef } from "react";

export function RouteLine({ label }: { label?: string }) {
  const ref = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.style.transition = "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.strokeDashoffset = "0";
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="flex items-center gap-4 py-6">
      {label && <span className="label-mono whitespace-nowrap">{label}</span>}
      <svg viewBox="0 0 600 16" className="flex-1 h-4" preserveAspectRatio="none">
        <circle cx="4" cy="8" r="3" fill="#1E5BFF" />
        <path
          ref={ref}
          d="M 8 8 Q 200 -4 300 8 T 592 8"
          fill="none"
          stroke="#1E5BFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="600"
          strokeDashoffset="600"
        />
        <circle cx="596" cy="8" r="3" fill="#1E5BFF" />
      </svg>
    </div>
  );
}
