import { useRef } from "react";

export function MagneticButton({
  children,
  className = "",
  onClick,
  cursorText,
  as = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  cursorText?: string;
  as?: "button" | "a";
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const commonProps = {
    ref: ref as any,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className: `transition-transform duration-200 ${className}`,
    "data-cursor-text": cursorText,
    ...props,
  };

  if (as === "a") {
    return <a {...commonProps}>{children}</a>;
  }

  return <button {...commonProps}>{children}</button>;
}
