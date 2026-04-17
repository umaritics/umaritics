import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Heart,
} from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer id="contact" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase block mb-3">
            // Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient inline-block">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl">
            Have a project in mind or want to collaborate? I'd love to hear from
            you.
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "umar.irpk@gmail.com" },
              { icon: MapPin, label: "Location", value: "Available Worldwide" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                whileHover={{
                  x: 8,
                  boxShadow: "0 0 25px hsl(25 95% 53% / 0.1)",
                }}
                className="bento-item flex items-center gap-4"
                data-hoverable
              >
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {item.label}
                  </p>
                  <p className="text-foreground font-heading">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="flex gap-3 pt-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/umaritics",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/umarific",
                  label: "LinkedIn",
                },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  data-hoverable
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 0 20px hsl(25 95% 53% / 0.2)",
                  }}
                  className="p-3 rounded-xl glass hover:border-primary/50 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bento-item space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                Subject
              </label>
              <input
                type="text"
                placeholder="Project inquiry"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-1.5 block">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px hsl(25 95% 53% / 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              data-hoverable
            >
              <Send className="w-4 h-4" /> Send Message
            </motion.button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground font-mono flex items-center justify-center gap-1.5">
            Built by Muhammad Umar
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            © 2026 All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default ContactSection;
