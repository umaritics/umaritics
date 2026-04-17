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
    title: "Resumator",
    description:
      "AI-powered resume generator built to create professional CVs dynamically.",
    longDescription:
      "An intelligent resume generation tool that leverages the Gemini API to help users craft professional resumes seamlessly. Built for high performance and fast global access.",
    images: [
      "/assets/resumator/main1.png",
      "/assets/resumator/main2.png",
      "/assets/resumator/main3.png",
      "/assets/resumator/template_select.png",
      "/assets/resumator/make_resume1.png",
      "/assets/resumator/make_resume2.png",
      "/assets/resumator/make_resume3.png",
      "/assets/resumator/make_resume4.png",
      "/assets/resumator/resume_preview.png",
    ],
    tech: ["Next.js", "Gemini", "Tailwind CSS", "Vercel"],
    github: "https://github.com/umaritics/Resumator",
    live: "https://resumator-zeta.vercel.app/",
    category: "Web / AI",
  },
  {
    title: "Concisio",
    description:
      "Intelligent blog summarizer powered by Hugging Face NLP models.",
    longDescription:
      "A web application designed to distill lengthy blog posts into concise summaries. It integrates advanced Hugging Face models to process text and deliver a seamless reading experience.",
    images: [
      "/assets/concisio/Main Page.png",
      "/assets/concisio/Mp2.png",
      "/assets/concisio/Summarizer.png",
      "/assets/concisio/Contact Us.png",
    ],
    tech: ["Next.js", "Hugging Face", "Tailwind CSS", "Vercel"],
    github: "https://github.com/umaritics/Blog-Summarizer",
    live: "https://blog-summarizer-six.vercel.app/",
    category: "Web / AI",
  },
  {
    title: "Socially",
    description:
      "Full-featured Instagram clone with real-time interactions and video calling.",
    longDescription:
      "A comprehensive social media platform replicating core Instagram functionalities. Features include uploading posts and stories, real-time messaging, commenting, follow/unfollow mechanisms, editing profiles, and live video calling.",
    images: [
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=Socially+Image+1",
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=Socially+Image+2",
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=Socially+Image+3",
    ],
    tech: [
      "Kotlin",
      "Firebase Auth",
      "Firebase DB",
      "MySQL",
      "PHP",
      "Agora API",
      "Picasso",
      "XML",
    ],
    github: "https://github.com/umaritics/Socially",
    category: "Mobile",
  },
  {
    title: "List It",
    description:
      "C2C marketplace app featuring real-time bidding, messaging, and geolocation.",
    longDescription:
      "A mobile marketplace where users can buy and sell items directly. It incorporates advanced features like real-time bidding, integrated messaging, dynamic wishlists, and location-based services.",
    images: [
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=List+It+Image+1",
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=List+It+Image+2",
    ],
    tech: ["Kotlin", "PHP", "Firebase", "Agora API", "Geolocation APIs"],
    github: "https://github.com/umaritics/listit-marketplace",
    category: "Mobile",
  },
  {
    title: "FastPay",
    description:
      "Digital banking wallet with intelligent balance partition functionality.",
    longDescription:
      "A robust digital wallet application built for secure fund management. It allows users to partition their balances for better financial tracking and organization.",
    images: [
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=FastPay+Image+1",
      "https://placehold.co/800x500/1a1a1a/e2e8f0?text=FastPay+Image+2",
    ],
    tech: ["JavaFX", "Supabase"],
    github: "https://github.com/umaritics/FastPay-digital-wallet",
    category: "Desktop",
  },
  {
    title: "Travel Ease",
    description:
      "Comprehensive desktop application for travel agency management.",
    longDescription:
      "A management system designed to handle the complex data and operations of a travel agency, utilizing a reliable relational database architecture for scale.",
    images: [
      "/assets/travelease/CoverPage.png",
      "/assets/travelease/Login.png",
      "/assets/travelease/Signup.png",
      "/assets/travelease/Admin.png",
      "/assets/travelease/Traveler.png",
      "/assets/travelease/TourOperator.png",
      "/assets/travelease/Guide.png",
      "/assets/travelease/Hotel.png",
      "/assets/travelease/Transport.png",
    ],
    tech: ["C#", ".NET", "SQL Server (SSMS)"],
    github: "#",
    category: "Desktop",
  },
  {
    title: "Cell Sense",
    description:
      "Smart battery alarm and analytics tool utilizing real-time system data.",
    longDescription:
      "A desktop utility tool that reads real-time Windows battery reports and status data to provide smart alarms and detailed analytics, helping users prolong their device's battery lifespan.",
    images: [
      "/assets/cellsense/Dashboard.png",
      "/assets/cellsense/Analytics.png",
      "/assets/cellsense/History.png",
    ],
    tech: ["JavaFX", "Windows Data Reports"],
    github: "https://github.com/umaritics/CellSense",
    category: "Desktop",
  },
  {
    title: "Swift Cart",
    description:
      "Smart Point of Sale (POS) system optimized for fast retail management.",
    longDescription:
      "A streamlined Point of Sale desktop application focused on providing a fast, intuitive interface for managing cart operations, inventory, and checkout processes.",
    images: [
      "/assets/swiftcart/POS.png",
      "/assets/swiftcart/Receipt.png",
      "/assets/swiftcart/dashboard.png",
      "/assets/swiftcart/Manage Products.png",
      "/assets/swiftcart/Manage Discounts.png",
      "/assets/swiftcart/Manage Cashiers.png",
      "/assets/swiftcart/Sales Reports.png",
      "/assets/swiftcart/Inventory Reports.png",
      "/assets/swiftcart/Discount Reports.png",
      "/assets/swiftcart/Cashier Performance.png",
      "/assets/swiftcart/Flop Products.png",
      "/assets/swiftcart/login.png",
    ],
    tech: ["JavaFX"],
    github: "#",
    category: "Desktop",
  },
];

const StackingProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
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
    >
      <div
        className="w-full glass rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-xl"
        style={{
          position: "sticky",
          top: `${120 + index * 40}px`,
          zIndex: index + 1,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % project.images.length);
          }, 1500);
          intervalsRef.current.set(index, interval);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          const interval = intervalsRef.current.get(index);
          if (interval) {
            clearInterval(interval);
            intervalsRef.current.delete(index);
          }
          setCurrentImage(0);
        }}
        data-hoverable
      >
        <div className="flex flex-col lg:flex-row">
          {/* Large image frame - left side */}
          <div className="relative w-full lg:w-1/2 h-64 sm:h-72 lg:h-[400px] overflow-hidden bg-muted">
            {project.images.map((img, imgI) => (
              <img
                key={imgI}
                src={img}
                alt={`${project.title} screenshot ${imgI + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ${
                  imgI === currentImage
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
                loading="lazy"
              />
            ))}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/20 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent lg:hidden" />

            {/* Image dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, imgI) => (
                <button
                  key={imgI}
                  onClick={() => setCurrentImage(imgI)}
                  className={`transition-all duration-300 rounded-full ${
                    imgI === currentImage
                      ? "bg-primary w-6 h-2"
                      : "bg-foreground/30 w-2 h-2"
                  }`}
                />
              ))}
            </div>

            {/* Category badge */}
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-mono rounded-full bg-background/50 text-foreground border border-border backdrop-blur-md">
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
              <span className="text-xs font-mono text-primary/80 tracking-wider">
                PROJECT 0{index + 1}
              </span>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3 flex items-center gap-2">
              {project.title}
              <ChevronRight
                className={`w-5 h-5 text-primary transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`}
              />
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base h-20 overflow-hidden">
              {isHovered ? project.longDescription : project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: ti * 0.05 }}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-secondary/50 text-secondary-foreground border border-border/50"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {project.github && (
                <a
                  href={project.github}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono group"
                  data-hoverable
                >
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />{" "}
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
                  data-hoverable
                >
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
  <SectionWrapper
    id="projects"
    title="Projects"
    subtitle="A selection of projects I've built and shipped."
  >
    <div className="space-y-8">
      {projects.map((project, i) => (
        <StackingProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
