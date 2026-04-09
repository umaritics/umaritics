import { motion } from "framer-motion";
import { Home, User, Code2, Briefcase, FolderGit2, Award, Mail } from "lucide-react";

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
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 py-2 flex items-center gap-1"
    >
      {navItems.map((item) => (
        <motion.button
          key={item.label}
          data-hoverable
          onClick={() => scrollTo(item.href)}
          className="relative group p-3 rounded-full transition-colors duration-300 hover:bg-primary/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <motion.span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary bg-card border border-border px-2 py-1 rounded-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {item.label}
          </motion.span>
        </motion.button>
      ))}
    </motion.nav>
  );
};

export default Navbar;
