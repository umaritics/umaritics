import { motion } from "framer-motion";
import {
  Home,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: FolderGit2, label: "Projects", href: "#projects" },
  { icon: Award, label: "Certifications", href: "#certifications" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "home";

      for (const item of navItems) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop - 150;
          if (scrollY >= top) {
            current = item.href.slice(1);
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop & Mobile navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-2"
      >
        {/* FIX: Removed overflow-x-auto and scrollbar hiding classes so the tooltips can break out of the container vertically */}
        <div className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <motion.button
                key={item.label}
                data-hoverable
                onClick={() => scrollTo(item.href)}
                // FIX: Used p-2.5 for mobile and sm:p-3 for larger screens to ensure it fits without scrolling
                className={`relative group p-2.5 sm:p-3 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-primary/15" : "hover:bg-primary/10"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
                <motion.span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary bg-card border border-border px-2 py-1 rounded-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
