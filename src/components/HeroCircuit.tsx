import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
}

interface Path {
  nodes: number[];
  progress: number;
  speed: number;
  delay: number;
}

const HeroCircuit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create grid-based circuit nodes
    const nodes: Node[] = [];
    const cols = 16;
    const rows = 10;
    const spacingX = () => canvas.width / dpr / (cols + 1);
    const spacingY = () => canvas.height / dpr / (rows + 1);

    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        nodes.push({ x: c / (cols + 1), y: r / (rows + 1) });
      }
    }

    // Build edges (right-angle paths between nearby nodes)
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);
        if (dx < 0.15 && dy < 0.15 && (dx < 0.01 || dy < 0.01) && Math.random() < 0.4) {
          edges.push([i, j]);
        }
      }
    }

    // Create transmission paths (chains of connected edges)
    const paths: Path[] = [];
    for (let p = 0; p < 8; p++) {
      const startEdge = edges[Math.floor(Math.random() * edges.length)];
      if (!startEdge) continue;
      const chain: number[] = [startEdge[0], startEdge[1]];

      // Extend the path
      for (let step = 0; step < 6; step++) {
        const last = chain[chain.length - 1];
        const candidates = edges.filter(
          ([a, b]) =>
            (a === last || b === last) && !chain.includes(a === last ? b : a)
        );
        if (candidates.length === 0) break;
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        chain.push(pick[0] === last ? pick[1] : pick[0]);
      }

      paths.push({
        nodes: chain,
        progress: 0,
        speed: 0.15 + Math.random() * 0.2,
        delay: p * 1.2,
      });
    }

    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    const getPos = (n: Node) => ({ x: n.x * w(), y: n.y * h() });

    let time = 0;
    const draw = () => {
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      // Draw static circuit traces
      ctx.strokeStyle = "hsla(25, 95%, 53%, 0.04)";
      ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        const pA = getPos(nodes[a]);
        const pB = getPos(nodes[b]);
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        // Right-angle path
        ctx.lineTo(pB.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      });

      // Draw nodes
      ctx.fillStyle = "hsla(25, 95%, 53%, 0.06)";
      nodes.forEach((n) => {
        const p = getPos(n);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate transmission pulses
      time += 0.016;
      paths.forEach((path) => {
        const t = time - path.delay;
        if (t < 0) return;

        const totalSegments = path.nodes.length - 1;
        if (totalSegments < 1) return;

        const cycleTime = totalSegments / path.speed;
        const normalized = ((t * path.speed) % totalSegments);

        // Draw the pulse as a glowing dot moving along the path
        const segIndex = Math.floor(normalized);
        const segFrac = normalized - segIndex;

        if (segIndex >= totalSegments) return;

        const fromNode = getPos(nodes[path.nodes[segIndex]]);
        const toNode = getPos(nodes[path.nodes[segIndex + 1]]);

        // Right-angle interpolation
        const midX = toNode.x;
        const midY = fromNode.y;

        let px: number, py: number;
        if (segFrac < 0.5) {
          const f = segFrac * 2;
          px = fromNode.x + (midX - fromNode.x) * f;
          py = fromNode.y;
        } else {
          const f = (segFrac - 0.5) * 2;
          px = midX;
          py = midY + (toNode.y - midY) * f;
        }

        // Glowing pulse
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 20);
        gradient.addColorStop(0, "hsla(25, 95%, 53%, 0.6)");
        gradient.addColorStop(0.5, "hsla(25, 95%, 53%, 0.15)");
        gradient.addColorStop(1, "hsla(25, 95%, 53%, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = "hsla(25, 95%, 63%, 0.9)";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        // Trail - highlight the path segment behind the pulse
        ctx.strokeStyle = "hsla(25, 95%, 53%, 0.12)";
        ctx.lineWidth = 2;
        for (let s = 0; s <= segIndex; s++) {
          const fN = getPos(nodes[path.nodes[s]]);
          const tN = getPos(nodes[path.nodes[s + 1]]);
          const alpha = Math.max(0, 0.12 - (segIndex - s) * 0.03);
          ctx.strokeStyle = `hsla(25, 95%, 53%, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(fN.x, fN.y);
          ctx.lineTo(tN.x, fN.y);
          ctx.lineTo(tN.x, tN.y);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HeroCircuit;
