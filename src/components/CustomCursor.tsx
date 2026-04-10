import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const trailRefs = useRef<{ x: number; y: number }[]>(Array(6).fill({ x: 0, y: 0 }));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-hoverable]")) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isMobile, cursorX, cursorY]);

  // Circuit trace trail canvas
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update trail positions with easing
      const newTrails = [...trailRefs.current];
      for (let i = newTrails.length - 1; i > 0; i--) {
        newTrails[i] = {
          x: newTrails[i].x + (newTrails[i - 1].x - newTrails[i].x) * 0.15,
          y: newTrails[i].y + (newTrails[i - 1].y - newTrails[i].y) * 0.15,
        };
      }
      newTrails[0] = { ...mousePos.current };
      trailRefs.current = newTrails;

      // Draw circuit-style traces (right-angle connections)
      ctx.strokeStyle = `hsl(25, 95%, 53%)`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      
      for (let i = 0; i < newTrails.length - 1; i++) {
        const opacity = 0.3 * (1 - i / newTrails.length);
        ctx.strokeStyle = `hsla(25, 95%, 53%, ${opacity})`;
        ctx.beginPath();
        const from = newTrails[i];
        const to = newTrails[i + 1];
        ctx.moveTo(from.x, from.y);
        // Create right-angle circuit trace
        ctx.lineTo(to.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Draw small nodes at corners
        ctx.fillStyle = `hsla(25, 95%, 53%, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(to.x, from.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      {/* Main cursor - CPU/chip shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className={`relative transition-all duration-200 ${isHovering ? 'scale-150' : 'scale-100'}`}>
          {/* Chip body */}
          <div className={`w-5 h-5 rounded-sm border-2 border-primary bg-primary/20 transition-all duration-200 ${isHovering ? 'bg-primary/40 shadow-[0_0_15px_hsl(25,95%,53%,0.5)]' : ''}`}>
            {/* Chip die */}
            <div className="absolute inset-1 rounded-[1px] bg-primary/30" />
          </div>
          {/* Pins - top */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-[2px] h-1.5 bg-primary/60" />
            <div className="w-[2px] h-1.5 bg-primary/60" />
          </div>
          {/* Pins - bottom */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-[2px] h-1.5 bg-primary/60" />
            <div className="w-[2px] h-1.5 bg-primary/60" />
          </div>
          {/* Pins - left */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 flex flex-col gap-1">
            <div className="h-[2px] w-1.5 bg-primary/60" />
            <div className="h-[2px] w-1.5 bg-primary/60" />
          </div>
          {/* Pins - right */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 flex flex-col gap-1">
            <div className="h-[2px] w-1.5 bg-primary/60" />
            <div className="h-[2px] w-1.5 bg-primary/60" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
