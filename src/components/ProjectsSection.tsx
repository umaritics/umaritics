import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  tech: string[];
  github?: string;
  live?: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
    longDescription: "Built a comprehensive e-commerce platform supporting multi-vendor operations, real-time inventory tracking, Stripe payment integration, and an admin dashboard with analytics.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    github: "#",
    live: "#",
    category: "Web",
  },
  {
    title: "AI Task Manager",
    description: "Intelligent task management app with AI-powered prioritization and scheduling.",
    longDescription: "Developed an AI-powered task manager that uses NLP to categorize tasks, predict deadlines, and suggest optimal scheduling based on user behavior patterns.",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    ],
    tech: ["Python", "React", "TensorFlow", "FastAPI", "MongoDB"],
    github: "#",
    live: "#",
    category: "AI/ML",
  },
  {
    title: "Cross-Platform Chat App",
    description: "Real-time messaging app for web, iOS, and Android with end-to-end encryption.",
    longDescription: "Engineered a cross-platform messaging application with WebSocket-based real-time communication, E2E encryption, media sharing, and push notifications.",
    images: [
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=500&fit=crop",
    ],
    tech: ["React Native", "Firebase", "Node.js", "Socket.io", "TypeScript"],
    github: "#",
    category: "Mobile",
  },
  {
    title: "DevOps Dashboard",
    description: "Comprehensive monitoring and CI/CD pipeline visualization tool for engineering teams.",
    longDescription: "Created a real-time DevOps dashboard integrating multiple cloud providers, CI/CD pipeline status, server metrics, and alert management in one unified interface.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop",
    ],
    tech: ["React", "Docker", "Grafana", "AWS", "Electron"],
    github: "#",
    live: "#",
    category: "Desktop",
  },
];

const StackingProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="sticky w-full"
      // Each card sticks a bit lower creating stacking effect
      // Using inline style for dynamic top based on index
    >
      <div
        className="w-full glass rounded-2xl overflow-hidden border border-border/50"
        style={{ 
          position: 'sticky',
          top: `${120 + index * 40}px`,
          zIndex: index + 1,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % project.images.length);
          }, 1500);
          (window as any)[`proj_${index}`] = interval;
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          clearInterval((window as any)[`proj_${index}`]);
          setCurrentImage(0);
        }}
        data-hoverable
      >
        <div className="flex flex-col lg:flex-row">
          {/* Large image frame - left side */}
          <div className="relative w-full lg:w-1/2 h-64 sm:h-72 lg:h-[400px] overflow-hidden">
            {project.images.map((img, imgI) => (
              <img
                key={imgI}
                src={img}
                alt={`${project.title} screenshot ${imgI + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  imgI === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                loading="lazy"
              />
            ))}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent lg:hidden" />

            {/* Image dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, imgI) => (
                <button
                  key={imgI}
                  onClick={() => setCurrentImage(imgI)}
                  className={`transition-all duration-300 rounded-full ${
                    imgI === currentImage ? "bg-primary w-6 h-2" : "bg-foreground/30 w-2 h-2"
                  }`}
                />
              ))}
            </div>

            {/* Category badge */}
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-mono rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Content - right side */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <motion.div
              initial={false}
              animate={{ x: isHovered ? 5 : 0 }}
              className="mb-2"
            >
              <span className="text-xs font-mono text-primary/60 tracking-wider">PROJECT 0{index + 1}</span>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3 flex items-center gap-2">
              {project.title}
              <ChevronRight className={`w-5 h-5 text-primary transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`} />
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
              {isHovered ? project.longDescription : project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: ti * 0.05 }}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-secondary text-secondary-foreground border border-border/50"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {project.github && (
                <a href={project.github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono group" data-hoverable>
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Source
                </a>
              )}
              {project.live && (
                <a href={project.live} className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all" data-hoverable>
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <SectionWrapper id="projects" title="Projects" subtitle="A selection of projects I've built and shipped.">
    <div className="space-y-8">
      {projects.map((project, i) => (
        <StackingProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
