import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  pad = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  pad?: number;
}) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const formatted = pad > 0 ? String(v).padStart(pad, "0") : String(v);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}
