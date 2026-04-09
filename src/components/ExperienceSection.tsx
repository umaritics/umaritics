import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Solutions Engineer",
    company: "Tech Company",
    period: "2022 – Present",
    location: "Remote",
    description: "Architecting and delivering end-to-end software solutions for enterprise clients. Leading cross-functional teams and driving technical decisions across web, mobile, and desktop platforms.",
    tech: ["React", "Node.js", "AWS", "TypeScript", "Docker"],
  },
  {
    role: "Senior Software Developer",
    company: "Software Agency",
    period: "2020 – 2022",
    location: "Hybrid",
    description: "Developed scalable web and mobile applications serving millions of users. Implemented CI/CD pipelines and mentored junior developers.",
    tech: ["React Native", "Python", "PostgreSQL", "Redis", "GCP"],
  },
  {
    role: "Full Stack Developer",
    company: "Startup Inc.",
    period: "2018 – 2020",
    location: "On-site",
    description: "Built MVPs and core products from scratch. Worked across the entire stack from database design to frontend development and deployment.",
    tech: ["Django", "React", "MongoDB", "Firebase", "Flutter"],
  },
];

const ExperienceSection = () => (
  <SectionWrapper id="experience" title="Experience" subtitle="My professional journey in software engineering.">
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative pl-12 md:pl-20"
          >
            {/* Timeline dot */}
            <div className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-primary glow" />

            <div className="bento-item">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-mono text-sm">{exp.company}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{exp.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{exp.location}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
