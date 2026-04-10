import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FloatingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Circuit board nodes
    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const nodeCount = 60;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
      });
    }

    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && nodes[i].connections.length < 3) {
          nodes[i].connections.push(j);
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circuit traces
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const target = nodes[j];
          ctx.strokeStyle = 'hsla(25, 95%, 53%, 0.04)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          // Right-angle trace
          ctx.lineTo(target.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });

        // Draw node
        ctx.fillStyle = 'hsla(25, 95%, 53%, 0.06)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();

    const handleResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default FloatingBackground;
