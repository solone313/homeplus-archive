import { useEffect, useRef, useState } from "react";

type Props = {
  cols?: number;
  rows?: number;
  width?: number;
  height?: number;
  threshold?: number;
  attractRange?: number;
  connectDist?: number;
  className?: string;
};

type Node = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
};

export function MagneticField({
  cols = 4,
  rows = 3,
  width = 1120,
  height = 420,
  threshold = 180,
  attractRange = 320,
  connectDist = 200,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; lastMove: number }>({
    x: 0,
    y: 0,
    active: false,
    lastMove: 0,
  });
  const nodesRef = useRef<Node[]>([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: width, h: height });
  const reducedRef = useRef<boolean>(false);

  const [displaySize, setDisplaySize] = useState<{ w: number; h: number }>({
    w: width,
    h: height,
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const compute = () => {
      const parentW = wrap.parentElement?.clientWidth ?? width;
      const availW = Math.min(width, parentW);
      const ratio = height / width;
      const w = Math.max(280, availW);
      const h = Math.round(w * ratio);
      sizeRef.current = { w, h };
      setDisplaySize({ w, h });
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (wrap.parentElement) ro.observe(wrap.parentElement);
    return () => ro.disconnect();
  }, [width, height]);

  useEffect(() => {
    const { w, h } = sizeRef.current;
    const nodes: Node[] = [];
    const padX = w / (cols + 1);
    const padY = h / (rows + 1);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = padX * (c + 1);
        const oy = padY * (r + 1);
        nodes.push({
          ox,
          oy,
          x: ox,
          y: oy,
          vx: 0,
          vy: 0,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    nodesRef.current = nodes;
  }, [cols, rows, displaySize.w, displaySize.h]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const { w, h } = sizeRef.current;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      mouseRef.current.lastMove = performance.now();
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    if (!isMobile) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const nodes = nodesRef.current;
      const reduced = reducedRef.current;

      const idleMs = now - mouseRef.current.lastMove;
      const mouseLive = mouseRef.current.active && idleMs < 3000 && !reduced;
      const easeBack = idleMs >= 3000;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const k = easeBack ? 0.08 : 0.05;
        const fx = (n.ox - n.x) * k;
        const fy = (n.oy - n.y) * k;
        n.vx += fx;
        n.vy += fy;

        if (!reduced) {
          const wobX = Math.sin(t * 0.6 + n.phase) * 0.06;
          const wobY = Math.cos(t * 0.5 + n.phase * 1.3) * 0.06;
          n.vx += wobX;
          n.vy += wobY;
        }

        if (mouseLive) {
          const dx = n.x - mouseRef.current.x;
          const dy = n.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          if (dist < threshold) {
            const f = (1 - dist / threshold) * 2.4;
            n.vx += (dx / dist) * f;
            n.vy += (dy / dist) * f;
          } else if (dist < attractRange) {
            const t2 = (dist - threshold) / (attractRange - threshold);
            const f = (1 - t2) * 0.35;
            n.vx -= (dx / dist) * f;
            n.vy -= (dy / dist) * f;
          }
        }

        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx;
        n.y += n.vy;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connectDist) {
            const alpha = (1 - d / connectDist) * 0.55;
            ctx.strokeStyle = `rgba(212, 212, 216, ${alpha.toFixed(3)})`;
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = "rgba(139, 141, 148, 0.85)";
      ctx.fillStyle = "rgba(24, 24, 27, 0.9)";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.strokeRect(n.x - 12, n.y - 12, 24, 24);
        ctx.fillRect(n.x - 0.5, n.y - 0.5, 1, 1);
      }
      ctx.setLineDash([]);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [displaySize.w, displaySize.h, threshold, attractRange, connectDist, cols, rows]);

  return (
    <div
      ref={wrapRef}
      className={`relative border border-line/60 bg-paper-soft overflow-hidden ${className}`}
      style={{ width: displaySize.w, height: displaySize.h }}
    >
      <canvas ref={canvasRef} className="block" />
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
        VOID FIELD / {cols}×{rows} NODES
      </div>
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-[0.24em] text-mute uppercase">
        HOVER TO PERTURB · RELEASE 3000ms
      </div>
    </div>
  );
}