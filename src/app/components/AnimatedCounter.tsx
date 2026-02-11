import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract number and suffix from value (e.g., "500+" -> number: 500, suffix: "+")
    const matches = value.match(/^([\d,₹.]+)(.*?)$/);
    if (!matches) {
      setDisplayValue(value);
      return;
    }

    const numStr = matches[1].replace(/[,₹]/g, '');
    const suffix = matches[2];
    const targetNum = parseFloat(numStr);
    
    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;

      if (step >= steps) {
        current = targetNum;
        clearInterval(timer);
      }

      // Format the number
      let formatted = Math.floor(current).toString();
      
      // Add commas for thousands
      if (current >= 1000 && !value.includes('₹')) {
        formatted = Math.floor(current).toLocaleString('en-IN');
      }
      
      // Add ₹ symbol if original had it
      if (value.includes('₹')) {
        formatted = '₹' + formatted;
      }

      // Add Cr if original had it
      if (value.includes('Cr')) {
        // Show decimal for Cr values
        formatted = (current).toFixed(0);
        if (value.includes('₹')) {
          formatted = '₹' + formatted + 'Cr';
        }
      }

      setDisplayValue(formatted + suffix);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className={`relative ${className}`}>
      {displayValue}
    </span>
  );
}