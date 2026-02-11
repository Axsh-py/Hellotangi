import { useEffect, useRef, useState } from "react";

export function LayoutDemo() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState([
    { id: 'A', label: 'Item A' },
    { id: 'B', label: 'Item B' },
    { id: 'C', label: 'Item C' },
    { id: 'D', label: 'Item D' },
  ]);

  useEffect(() => {
    // Random shuffle function using Fisher-Yates algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Auto-loop: shuffle every 2.5 seconds
    const interval = setInterval(() => {
      setItems(prev => shuffleArray(prev));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="layout" 
      style={{ 
        padding: 24, 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "#f5f5f5" 
      }}
    >
      <h2 style={{ marginBottom: 32, fontSize: "24px", fontWeight: 700, color: "#333" }}>
        Auto Random Shuffle Animation
      </h2>

      <div ref={gridRef} className="layout-root">
        <div className="grid-layout">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="item"
              style={{
                transition: 'all 0.9s cubic-bezier(0.45, 0, 0.55, 1)',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #layout .layout-root {
          width: 520px;
          margin: 0 auto;
        }

        #layout .grid-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        #layout .item {
          background: #7CFF5B;
          border-radius: 14px;
          padding: 18px;
          font-weight: 700;
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #000;
        }
      `}</style>
    </section>
  );
}
