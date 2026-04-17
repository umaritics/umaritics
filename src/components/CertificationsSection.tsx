import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Frontend Development in Angular",
    issuer: "Board Infinity",
    date: "2025",
    credentialUrl: "https://coursera.org/verify/4J3KRVLOJLLL",
    badge: "🏅",
  },
  {
    title: "Databases for Data Scientists",
    issuer: "University of Colorado, USA",
    date: "2025",
    credentialUrl: "https://coursera.org/verify/specialization/EZY2IAEBXOPD",
    badge: "🏅",
  },
  {
    title: "SAP Professional Fundamentals",
    issuer: "SAP",
    date: "2025",
    credentialUrl: "https://coursera.org/verify/2E2466I7ORJH",
    badge: "🏅",
  },
  {
    title: "Introduction to Web Development with HTML,CSS, Javascript",
    issuer: "IBM",
    date: "2025",
    credentialUrl: "https://coursera.org/verify/RXEK4I6IUC4I",
    badge: "🏅",
  },
  {
    title: "Google Sheets",
    issuer: "Google",
    date: "2024",
    credentialUrl: "https://coursera.org/verify/FCIBXCIEO7P9",
    badge: "🏅",
  },
  {
    title: "Google Soft Skills",
    issuer: "Google",
    date: "2024",
    credentialUrl: "",
    badge: "🏅",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <SectionWrapper
      id="certifications"
      title="Certifications"
      subtitle="Professional certifications and credentials."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" ref={ref}>
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -8,
              rotateY: 5,
              boxShadow: "0 15px 40px hsl(25 95% 53% / 0.12)",
            }}
            className="bento-item flex flex-col justify-between group"
            data-hoverable
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <motion.span
                  className="text-2xl"
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  {cert.badge}
                </motion.span>
                <Award className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {cert.issuer}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {cert.date}
              </span>
              <a
                href={cert.credentialUrl}
                className="flex items-center gap-1 text-xs text-primary hover:underline font-mono"
                data-hoverable
              >
                Verify <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default CertificationsSection;
