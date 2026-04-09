import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Terminal, Coffee, Zap, Globe } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { label: "Years Experience", value: "5+", icon: Coffee },
    { label: "Projects Completed", value: "30+", icon: Zap },
    { label: "Technologies", value: "20+", icon: Terminal },
    { label: "Countries Served", value: "10+", icon: Globe },
  ];

  return (
    <SectionWrapper id="about" title="About Me" subtitle="Passionate about building elegant solutions to complex problems.">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-item"
        >
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bento-item flex flex-col items-center justify-center text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mb-3" />
              <span className="text-3xl font-heading font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
