import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
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

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

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

        <motion.h1
          variants={glitchVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight mb-4"
        >
          <span className="text-gradient">Muhammad</span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-foreground"
          >
            Umar
          </motion.span>
        </motion.h1>

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
          Solutions Engineer
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
