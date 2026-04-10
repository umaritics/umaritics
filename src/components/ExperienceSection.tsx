import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Software Developer",
    company: "FYESoft Technologies, New York, U.S.A",
    period: "August 2025 – Present",
    location: "Remote",
    description:
      "Designing and implementing end-to-end business solutions as part of the core team, collaborating across development to deliver scalable and high-quality applications.",
    tech: [
      "Angular",
      "PostgreSQL",
      "Python",
      "Google Cloud",
      "TypeScript",
      "Directus",
      "Jira",
      "Git",
    ],
  },
  {
    role: "Freelance Audio & Video Editor (Contract)",
    company: "Self-Employed",
    period: "June 2025 – Present",
    location: "Remote",
    description:
      "Managed end-to-end post-production for UKMLA-focused animated medical videos, including advanced audio cleanup, noise reduction, and precise synchronization with animation sequences. Delivered high-quality educational content optimized for clarity, professionalism, and learner engagement.",
    tech: ["Videoscribe", "Audacity", "DaVinci Resolve"],
  },
  {
    role: "Web Development Intern",
    company: "Nexium",
    period: "July 2025 – August 2025",
    location: "Remote",
    description:
      "Developed full-stack web applications using Next.js, Tailwind CSS, and ShadCN, building responsive and modern user interfaces. Integrated backend services with PostgreSQL, MongoDB, and n8n, and implemented AI-powered features using Hugging Face models.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN",
      "PostgreSQL",
      "MongoDB",
      "n8n",
      "Hugging Face",
      "Git",
    ],
  },
  {
    role: "Data Science Intern",
    company: "AI GenMat",
    period: "June 2025 – August 2025",
    location: "Remote",
    description:
      "Performed data analysis, mining, and visualization to prepare datasets for machine learning workflows. Built automated web scraping and data extraction pipelines using Python, Selenium, Pandas, and Matplotlib to ensure efficient and reliable data collection.",
    tech: [
      "Python",
      "Selenium",
      "Numpy",
      "Pandas",
      "Matplotlib",
      "Requests",
      "Regular Expressions",
      "BeautifulSoup",
      "seaborn",
      "scikit-learn",
      "Git",
    ],
  },
  {
    role: "Freelance Data Operations Engineer (Contract)",
    company: "Self-Employed",
    period: "March 2025 – April 2025",
    location: "Remote",
    description:
      "Executed a contract-based data acquisition project involving large-scale scraping of FIR records from Maharashtra State, India. Transformed unstructured legal data into structured datasets through automated extraction, validation, and rigorous data cleaning workflows to ensure accuracy and completeness.",
    tech: [
      "Web Scraping",
      "Data Extraction",
      "Data Mining",
      "Data Cleaning",
      "Automation",
      "Data Processing",
      "Google Sheets",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="My professional journey."
    >
      <div className="relative" ref={ref}>
        {/* Animated timeline line */}
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-4 md:left-8 top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent"
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.2,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-12 md:pl-20"
            >
              {/* Animated timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-primary glow"
              />

              <motion.div
                whileHover={{
                  x: 8,
                  boxShadow: "0 0 30px hsl(25 95% 53% / 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bento-item"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-mono text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 md:mt-0 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.2 + ti * 0.05 }}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
