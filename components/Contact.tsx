"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiSend } from "react-icons/fi";
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
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSending(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "", collaborationType: "freelance", isInternship: false, isMVP: false });
      } else {
        const message = data.error || "Failed to send message. Please try again.";
        setSubmitError(message);
        toast.error(message);
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.");
      toast.error("Network error. Please check your connection.");
      console.error("Form submission error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 px-4 sm:px-6">
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
          <p className="mt-3 text-muted font-body max-w-lg mx-auto text-base">
            Let's build something remarkable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="glass glow-border rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono text-accent text-sm tracking-widest uppercase">Direct Contact</span>
                <h3 className="font-display font-bold text-2xl text-light mt-3">Send a brief and I’ll route it to the right place.</h3>
                <p className="mt-4 text-muted font-body leading-relaxed text-base">
                  Use the form to share project details, internship opportunities, or MVP ideas. The contact section no longer lists personal handles here.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  "Project inquiries",
                  "Freelance and collaboration requests",
                  "Internship and placement opportunities",
                  "Idea-to-MVP builds",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/60 bg-bg/40 px-4 py-3 text-sm text-light font-body">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="glass glow-border rounded-3xl p-5 sm:p-8 space-y-5"
            aria-describedby="contact-status"
          >
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">{field.label}</label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id as "name" | "email"]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  autoComplete={field.id === "name" ? "name" : "email"}
                  required
                  className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                autoComplete="off"
                required
                className="w-full bg-bg/50 border border-border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Collaboration Type Dropdown (Idea 111) */}
            <div>
              <label htmlFor="collaborationType" className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">Collaboration Type</label>
              <select
                id="collaborationType"
                name="collaborationType"
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
              className="w-full py-4 rounded-xl font-body font-medium text-white flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg, #6c63ff, #00f5ff)" }}
            >
              {sending ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
                  Sending...
                </>
              ) : (
                <><FiSend size={16} /> Send Message</>
              )}
            </motion.button>

            <div id="contact-status" role="status" aria-live="polite" className="text-center min-h-5">
              {submitError && <p className="text-sm text-rose-300">{submitError}</p>}
            </div>

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

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sending ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center"
            >
              <p className="text-sm text-light font-body font-medium">
                ✓ Message submitted! I'll review and get back to you soon.
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
