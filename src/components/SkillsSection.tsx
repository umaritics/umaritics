import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Languages
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    category: "Languages",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    category: "Languages",
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    category: "Languages",
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    category: "Languages",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    category: "Languages",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    category: "Languages",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    category: "Languages",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
    category: "Languages",
  },

  // Frontend
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
  },
  {
    name: "ShadCN",
    icon: "https://cdn.simpleicons.org/shadcnui",
    category: "Frontend",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    category: "Frontend",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    category: "Frontend",
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    category: "Frontend",
  },

  // Backend
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    category: "Backend",
  },
  {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
    category: "Backend",
  },
  {
    name: "Directus",
    icon: "https://cdn.simpleicons.org/directus",
    category: "Backend",
  },

  // Mobile & Desktop
  {
    name: "Android",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    category: "Mobile",
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    category: "Mobile",
  },
  {
    name: "JavaFX",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    category: "Desktop",
  },

  // Databases
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    category: "Databases",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    category: "Databases",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    category: "Databases",
  },
  {
    name: "SQL Server",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    category: "Databases",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    category: "Databases",
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    category: "Databases",
  },

  // Tools & Libraries
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Matplotlib",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Selenium",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Hugging Face",
    icon: "https://cdn.simpleicons.org/huggingface",
    category: "Tools & Libraries",
  },
  {
    name: "n8n",
    icon: "https://cdn.simpleicons.org/n8n",
    category: "Tools & Libraries",
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel",
    category: "Tools & Libraries",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Eclipse",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "IntelliJ",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
    category: "Tools & Libraries",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    category: "Tools & Libraries",
  },
];

const categories = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Mobile",
  "Desktop",
  "Tools & Libraries",
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="skills"
      title="Tech Stack"
      subtitle="Technologies, languages, and frameworks I work with."
    >
      <div className="space-y-10" ref={ref}>
        {categories.map((cat, catIndex) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: catIndex * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">{`// ${cat}`}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {catSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 30, rotateY: 90 }}
                    animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                    transition={{
                      delay: catIndex * 0.1 + i * 0.07,
                      duration: 0.5,
                    }}
                    whileHover={{
                      y: -8,
                      rotateY: 10,
                      boxShadow: "0 10px 30px hsl(25 95% 53% / 0.15)",
                    }}
                    className="bento-item flex flex-col items-center justify-center py-4 px-2 gap-2"
                    data-hoverable
                  >
                    <motion.img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8"
                      loading="lazy"
                      whileHover={{ rotate: 15 }}
                      style={{
                        filter: skill.icon.includes("simpleicons")
                          ? "invert(0.5)"
                          : "none",
                      }}
                    />
                    <span className="text-xs text-muted-foreground font-mono text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
