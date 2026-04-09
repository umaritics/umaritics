import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Backend" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Backend" },
  // Mobile & Desktop
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Mobile" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", category: "Mobile" },
  { name: "Electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg", category: "Desktop" },
  // DevOps & Tools
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "DevOps" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "DevOps" },
];

const categories = ["Frontend", "Backend", "Mobile", "Desktop", "DevOps"];

const SkillsSection = () => (
  <SectionWrapper id="skills" title="Tech Stack" subtitle="Technologies and frameworks I work with daily.">
    <div className="space-y-10">
      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">{`// ${cat}`}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {catSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bento-item flex flex-col items-center justify-center py-4 px-2 gap-2"
                  data-hoverable
                >
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8" loading="lazy" />
                  <span className="text-xs text-muted-foreground font-mono text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
