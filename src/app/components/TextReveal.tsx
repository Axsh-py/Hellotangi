import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";

export function TextReveal({
  children,
  className = "",
  as: Component = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "div";
}) {
  const elRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const splitRef = useRef<any>(null);

  useEffect(() => {
    if (!elRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Split the text
            splitRef.current = new SplitType(elRef.current!, { 
              types: "words,chars" 
            });

            // Initial state for chars
            if (splitRef.current.chars) {
              splitRef.current.chars.forEach((char: HTMLElement) => {
                char.style.display = "inline-block";
                char.style.transform = "translateY(18px)";
                char.style.opacity = "0";
              });

              // Trigger animation after a small delay
              setTimeout(() => {
                splitRef.current.chars?.forEach((char: HTMLElement, i: number) => {
                  char.style.transition = 
                    "transform 700ms cubic-bezier(.22,1,.36,1), opacity 700ms cubic-bezier(.22,1,.36,1)";
                  char.style.transitionDelay = `${i * 18}ms`;
                  char.style.transform = "translateY(0px)";
                  char.style.opacity = "1";
                });
              }, 50);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(elRef.current);

    return () => {
      observer.disconnect();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [hasAnimated]);

  const Element = Component;

  return (
    <Element ref={elRef as any} className={className}>
      {children}
    </Element>
  );
}
