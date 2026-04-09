import { motion } from "framer-motion";
import { useState } from "react";
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
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    ],
    tech: ["React", "Docker", "Grafana", "AWS", "Electron"],
    github: "#",
    live: "#",
    category: "Desktop",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bento-item group overflow-hidden p-0"
      onMouseEnter={() => {
        setIsHovered(true);
        const interval = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % project.images.length);
        }, 1500);
        (window as any)[`project_${index}`] = interval;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        clearInterval((window as any)[`project_${index}`]);
        setCurrentImage(0);
      }}
      data-hoverable
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {project.images.map((img, imgI) => (
          <img
            key={imgI}
            src={img}
            alt={`${project.title} screenshot ${imgI + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              imgI === currentImage ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Image indicator dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {project.images.map((_, imgI) => (
            <div
              key={imgI}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                imgI === currentImage ? "bg-primary w-4" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Category badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-mono rounded-full bg-primary/20 text-primary border border-primary/30">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
          {project.title}
          <ChevronRight className={`w-4 h-4 text-primary transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {isHovered ? project.longDescription : project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs font-mono rounded bg-secondary text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {project.github && (
            <a href={project.github} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono" data-hoverable>
              <Github className="w-3.5 h-3.5" /> Code
            </a>
          )}
          {project.live && (
            <a href={project.live} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono" data-hoverable>
              <ExternalLink className="w-3.5 h-3.5" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <SectionWrapper id="projects" title="Projects" subtitle="A selection of projects I've built and shipped.">
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
