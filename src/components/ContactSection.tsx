import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Heart } from "lucide-react";

const ContactSection = () => (
  <footer id="contact" className="py-24 px-4 md:px-8">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient inline-block">
          Let's Connect
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-xl">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="bento-item flex items-center gap-4" data-hoverable>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono">Email</p>
              <p className="text-foreground font-heading">umar@example.com</p>
            </div>
          </div>
          <div className="bento-item flex items-center gap-4" data-hoverable>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono">Location</p>
              <p className="text-foreground font-heading">Available Worldwide</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                data-hoverable
                className="p-3 rounded-xl glass hover:border-primary/50 transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bento-item space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-1.5 block">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1.5 block">Subject</label>
            <input
              type="text"
              placeholder="Project inquiry"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1.5 block">Message</label>
            <textarea
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            data-hoverable
          >
            <Send className="w-4 h-4" /> Send Message
          </motion.button>
        </motion.form>
      </div>

      {/* Footer bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 pt-8 border-t border-border/50 text-center"
      >
        <p className="text-sm text-muted-foreground font-mono flex items-center justify-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> by Muhammad Umar
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">© 2024 All rights reserved.</p>
      </motion.div>
    </div>
  </footer>
);

export default ContactSection;
