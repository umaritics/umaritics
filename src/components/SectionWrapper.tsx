import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} className={`py-24 px-4 md:px-8 relative ${className}`}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase block mb-3"
          >
            {/* {`// ${title}`} */}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient inline-block">
            {`// ${title}`}
          </h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-3 text-lg max-w-xl"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
          />
        </motion.div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
