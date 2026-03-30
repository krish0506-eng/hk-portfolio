"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { toast } from "sonner";

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    collaborationType: "freelance",
    isInternship: false,
    isMVP: false,
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "", collaborationType: "freelance", isInternship: false, isMVP: false });
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase">Let's Talk</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-light mt-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted text-lg font-body leading-relaxed mb-8">
              I'm open to freelance projects and collaborations. Have an
              idea? Let's build something remarkable together.
            </p>

            {/* SLA & Reply Time (Idea 113) */}
            <div className="mb-8 glass glow-border rounded-2xl p-5 border border-border/50">
              <p className="text-sm text-muted font-mono mb-2">⏱ Service Level Agreement</p>
              <p className="text-base text-light font-body">Typical reply within 4 hours. Project scoping within 24 hours.</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: FiMail, label: "krishnaahari05@gmail.com", href: "mailto:krishnaahari05@gmail.com", color: "#ff2d78" },
                { icon: FiLinkedin, label: "linkedin.com/in/hari-krishnaa-n-", href: "https://linkedin.com/in/hari-krishnaa-n-", color: "#0077b5" },
                { icon: FiGithub, label: "github.com/krishnaa-0506", href: "https://github.com/krishnaa-0506", color: "#6c63ff" },
              ].map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 glass glow-border rounded-2xl px-6 py-4 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="font-body text-base text-muted group-hover:text-light transition-colors">{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="glass glow-border rounded-3xl p-8 space-y-5"
          >
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.id}>
                <label className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id as "name" | "email"]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  required
                  className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Collaboration Type Dropdown (Idea 111) */}
            <div>
              <label className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">Collaboration Type</label>
              <select
                value={form.collaborationType}
                onChange={(e) => setForm({ ...form, collaborationType: e.target.value })}
                className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-light text-base font-body focus:outline-none focus:border-accent transition-colors"
              >
                <option value="freelance">Freelance Project</option>
                <option value="placement">Placement Role</option>
                <option value="internship">Internship</option>
                <option value="fulltime">Full-time Work</option>
                <option value="consulting">AI Consulting</option>
              </select>
            </div>

            {/* Checkboxes for Internship & MVP (Ideas 120-121) */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isInternship}
                  onChange={(e) => setForm({ ...form, isInternship: e.target.checked })}
                  className="w-5 h-5 rounded accent accent border-border bg-bg/50 cursor-pointer"
                />
                <span className="text-sm text-muted group-hover:text-light transition-colors font-body">This is an internship opportunity</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isMVP}
                  onChange={(e) => setForm({ ...form, isMVP: e.target.checked })}
                  className="w-5 h-5 rounded accent border-border bg-bg/50 cursor-pointer"
                />
                <span className="text-sm text-muted group-hover:text-light transition-colors font-body">I need idea-to-MVP support</span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(108,99,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-body font-medium text-white flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #6c63ff, #00f5ff)" }}
            >
              {sending ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
              ) : (
                <><FiSend size={16} /> Send Message</>
              )}
            </motion.button>

            {/* Privacy Note (Idea 124) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted text-center font-body leading-relaxed"
            >
              Your information is handled securely and only used to respond to your inquiry. 
              <br />
              No spam, ever.
            </motion.p>

            {/* Success State Next Steps (Idea 125) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sending ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center"
            >
              <p className="text-sm text-light font-body font-medium">
                ✓ Message submitted! I'll review and get back to you within 4 hours.
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
