import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const hexConcepts = [
  { title: "IA", desc: "Automatizamos la detección de amenazas con inteligencia artificial." },
  { title: "Redes", desc: "Protegemos la infraestructura de red de tu empresa." },
  { title: "Ciberseguridad", desc: "Monitoreo y defensa 24/7 contra ciberataques." },
  { title: "Optimización", desc: "Mejoramos la eficiencia y seguridad de tus sistemas." },
  { title: "Consultoría", desc: "Te asesoramos en estrategias de seguridad digital." },
  { title: "Innovación", desc: "Soluciones a la medida, siempre a la vanguardia." },
];

const TOTAL_HEX = hexConcepts.length;
const HEX_WIDTH = 170;
const HEX_HEIGHT = 150;
const SECTION_HEIGHT = 900; // px, ajustable

function getBezierPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const curve = 0.35;
  const cx1 = x1 + dx * curve;
  const cy1 = y1 + dy * 0.1 + 40 * (dx > 0 ? 1 : -1);
  const cx2 = x2 - dx * curve;
  const cy2 = y2 - dy * 0.1 - 40 * (dx > 0 ? 1 : -1);
  return `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
}

export default function Seguridad360() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hexRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [line, setLine] = useState<{ path: string } | null>(null);
  const [hexPositions, setHexPositions] = useState<{ x: number; y: number }[]>([]);

  // Calcular posiciones en círculo grande, centrado en la sección
  const getHexPositions = () => {
    const section = sectionRef.current;
    if (!section) return Array(TOTAL_HEX).fill({ x: 0, y: 0 });
    const rect = section.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - HEX_WIDTH / 1.2;
    return hexConcepts.map((_, i) => {
      const angle = (2 * Math.PI * i) / TOTAL_HEX - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  };

  useEffect(() => {
    const recalc = () => setHexPositions(getHexPositions());
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // Mostrar solo un hexágono según el scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom < 0 || rect.top > windowHeight) {
        setActiveIndex(0);
        return;
      }
      const sectionScroll = Math.min(Math.max(windowHeight - rect.top, 0), rect.height);
      const fraction = sectionScroll / rect.height;
      const idx = Math.min(TOTAL_HEX - 1, Math.floor(fraction * TOTAL_HEX));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Calcular líneas SVG para todos los hexágonos visibles
  const [lines, setLines] = useState<{ path: string }[]>([]);

  useEffect(() => {
    if (!logoRef.current || !sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();
    const logoCenter = {
      x: logoRect.left - sectionRect.left + logoRect.width / 2,
      y: logoRect.top - sectionRect.top + logoRect.height / 2,
    };
    const newLines: { path: string }[] = [];
    for (let i = 0; i <= activeIndex; i++) {
      const hex = hexRefs.current[i];
      if (!hex) continue;
      const hexRect = hex.getBoundingClientRect();
      const hexCenter = {
        x: hexRect.left - sectionRect.left + hexRect.width / 2,
        y: hexRect.top - sectionRect.top + hexRect.height / 2,
      };
      newLines.push({ path: getBezierPath(logoCenter.x, logoCenter.y, hexCenter.x, hexCenter.y) });
    }
    setLines(newLines);
  }, [activeIndex, hexPositions]);

  useEffect(() => {
    const updateLine = () => {
      if (!logoRef.current || !sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();
      const logoCenter = {
        x: logoRect.left - sectionRect.left + logoRect.width / 2,
        y: logoRect.top - sectionRect.top + logoRect.height / 2,
      };
      const hex = hexRefs.current[activeIndex];
      if (!hex) {
        setLine(null);
        return;
      }
      const hexRect = hex.getBoundingClientRect();
      const hexCenter = {
        x: hexRect.left - sectionRect.left + hexRect.width / 2,
        y: hexRect.top - sectionRect.top + hexRect.height / 2,
      };
      setLine({ path: getBezierPath(logoCenter.x, logoCenter.y, hexCenter.x, hexCenter.y) });
    };
    window.addEventListener("resize", updateLine);
    window.addEventListener("scroll", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
      window.removeEventListener("scroll", updateLine);
    };
  }, [activeIndex, hexPositions]);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: SECTION_HEIGHT,
        height: SECTION_HEIGHT,
        width: "100%",
        background: "radial-gradient(ellipse at center, #18122B 60%, #1B1A55 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo centrado relativo a la sección */}
      <motion.div
        ref={logoRef}
        style={{
          position: "absolute",
          left: `calc(50% - ${HEX_WIDTH / 2}px)` ,
          top: `calc(50% - ${HEX_HEIGHT / 2}px)` ,
          zIndex: 10,
          width: HEX_WIDTH,
          height: HEX_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,255,255,0.08)",
          borderRadius: "50%",
          boxShadow: "0 0 32px #0ff6, 0 2px 12px #1B1A55",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        <img src="/shield-logo.png" alt="SparkFound" style={{ width: 90, height: 90 }} />
      </motion.div>

      {/* Líneas SVG curvas (Bezier) para todos los visibles */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <defs>
          <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ff" />
            <stop offset="100%" stopColor="#1B6FFF" />
          </linearGradient>
        </defs>
        {lines.map((line, idx) => (
          <motion.path
            key={idx}
            d={line.path}
            stroke="url(#cableGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.1 + idx * 0.12 }}
            style={{ filter: "drop-shadow(0 0 8px #0ff)" }}
          />
        ))}
      </svg>

      {/* Hexágonos visibles hasta el índice activo */}
      {hexConcepts.map((item, index) => {
        const pos = hexPositions[index] || { x: 0, y: 0 };
        return (
          <motion.div
            key={index}
            ref={el => (hexRefs.current[index] = el)}
            style={{
              position: "absolute",
              left: pos.x - HEX_WIDTH / 2,
              top: pos.y - HEX_HEIGHT / 2,
              zIndex: 6,
              pointerEvents: "auto",
              width: HEX_WIDTH,
              height: HEX_HEIGHT,
              display: index <= activeIndex ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={index <= activeIndex ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 30 }}
            transition={{ delay: 0.18 + index * 0.12, duration: 0.6, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px #0ff, 0 2px 24px #1B1A55" }}
          >
            <div
              style={{
                width: HEX_WIDTH,
                height: HEX_HEIGHT,
                background: "rgba(255,255,255,0.13)",
                color: "#18122B",
                border: "2.5px solid #0ff",
                boxShadow: "0 0 32px #0ff6, 0 2px 16px #1B1A55, inset 0 1.5px 18px #fff3",
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center",
                padding: 14,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderImage: "linear-gradient(135deg, #0ff 60%, #1B6FFF 100%) 1",
                transition: "box-shadow 0.2s, border 0.2s, background 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 18,
                boxShadow: "inset 0 2px 24px #fff6, 0 0 0 2px #0ff2",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 0.18,
              }} />
              <div style={{ fontSize: "1.25rem", marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>{item.title}</div>
              <div style={{ fontSize: "1.05rem", opacity: 0.88, fontWeight: 500 }}>{item.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 