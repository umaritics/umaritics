import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, title, subtitle, children, className = "" }: SectionWrapperProps) => (
  <section id={id} className={`py-24 px-4 md:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-3 text-lg max-w-xl">{subtitle}</p>
        )}
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
      </motion.div>
      {children}
    </div>
  </section>
);

export default SectionWrapper;
