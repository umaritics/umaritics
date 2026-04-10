import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroScene from "./HeroScene";
import HeroCircuit from "./HeroCircuit";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";

const glitchVariants = {
  hidden: { opacity: 0, y: 40, skewX: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    skewX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const subtitles = [
  "Solutions Engineer",
  "Software Developer",
  "Full Stack Builder",
  "Problem Solver",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const TypingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = subtitles[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % subtitles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: () => 1 }}
        className="text-primary"
      >
        |
      </motion.span>
    </span>
  );
};

const ParticleBurst = ({ particles }: { particles: Particle[] }) => (
  <AnimatePresence>
    {particles.map((p) => (
      <motion.div
        key={p.id}
        initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
        animate={{
          x: p.x + p.vx * 60,
          y: p.y + p.vy * 60,
          opacity: 0,
          scale: 0,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed pointer-events-none z-50"
        style={{ width: p.size, height: p.size }}
      >
        <div className="w-full h-full rounded-full bg-primary" />
      </motion.div>
    ))}
  </AnimatePresence>
);

const HeroSection = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const count = 12;
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 3 + Math.random() * 5,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 900);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onClick={handleClick}
    >
      <HeroScene />
      <HeroCircuit />
      <ParticleBurst particles={particles} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-primary mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for opportunities
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3 
            }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight"
          >
            <span className="text-gradient">Muhammad</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.6 
            }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight text-foreground"
          >
            Umar
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '200px' }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-lg md:text-xl text-muted-foreground font-mono tracking-wider"
        >
          <TypingText />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              data-hoverable
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              whileHover={{ y: -3, boxShadow: '0 0 20px hsl(25 95% 53% / 0.3)' }}
              className="p-3 rounded-full glass hover:border-primary/50 transition-all duration-300"
            >
              <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted-foreground/50">scroll</span>
          <ChevronDown className="w-5 h-5 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
