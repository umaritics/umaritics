import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { Terminal, Coffee, Zap, Globe } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Years Experience", value: "5+", icon: Coffee },
    { label: "Projects Completed", value: "30+", icon: Zap },
    { label: "Technologies", value: "20+", icon: Terminal },
    { label: "Countries Served", value: "10+", icon: Globe },
  ];

  return (
    <SectionWrapper id="about" title="About Me" subtitle="Passionate about building elegant solutions to complex problems.">
      <div className="grid md:grid-cols-2 gap-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, rotateY: -15 }}
          animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bento-item relative overflow-hidden"
        >
          {/* Decorative corner circuit */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/10 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/10 rounded-bl-xl" />
          
          <p className="text-secondary-foreground leading-relaxed mb-4">
            I'm a <span className="text-primary font-semibold">Solutions Engineer</span> and Computer Scientist
            with a passion for crafting scalable, performant software across web, mobile, and desktop platforms.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            My expertise spans the full software development lifecycle — from architecting systems and writing clean code
            to deploying and maintaining production-grade applications. I thrive on turning complex business
            requirements into intuitive, efficient solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source,
            or mentoring aspiring developers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 0 30px hsl(25 95% 53% / 0.15)',
                borderColor: 'hsl(25 95% 53% / 0.3)',
              }}
              className="bento-item flex flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={isInView ? { rotate: [0, 360] } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-primary mb-3" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="text-3xl font-heading font-bold text-foreground"
              >
                {stat.value}
              </motion.span>
              <span className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
