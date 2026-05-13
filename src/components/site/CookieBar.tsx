import { useEffect, useState } from "react";

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("innover.cookies")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 bg-white border border-line shadow-lg p-4 flex items-start gap-3 text-xs">
      <p className="text-mute leading-relaxed flex-1">
        Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política.
      </p>
      <button
        onClick={() => { localStorage.setItem("innover.cookies", "1"); setShow(false); }}
        className="text-navy font-semibold hover:text-accent-blue shrink-0"
      >
        OK
      </button>
    </div>
  );
}
