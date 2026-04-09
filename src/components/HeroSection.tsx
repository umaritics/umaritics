import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4"
        >
          {"< Hello World />"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight mb-4"
        >
          <span className="text-gradient">Muhammad</span>
          <br />
          <span className="text-foreground">Umar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground font-mono tracking-wider"
        >
          Solutions Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Twitter, href: "#" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href + Icon.displayName}
              href={href}
              data-hoverable
              className="p-3 rounded-full glass hover:border-primary/50 transition-all duration-300"
            >
              <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-6 h-6 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
