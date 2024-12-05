import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 10000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(0);
  const rafIdRef = useRef<number>();

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateCounter = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentCount = Math.round(easedProgress * end);

    if (countRef.current !== currentCount) {
      countRef.current = currentCount;
      setCount(currentCount);
    }

    if (progress < 1) {
      rafIdRef.current = requestAnimationFrame(animateCounter);
    }
  };

  useEffect(() => {
    startTimeRef.current = 0;
    countRef.current = 0;
    setCount(0);
    rafIdRef.current = requestAnimationFrame(animateCounter);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [end]);

  return (
    <span className="counter-value">
      {count.toLocaleString()}
    </span>
  );
};

export default Counter;
