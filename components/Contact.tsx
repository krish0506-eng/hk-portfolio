"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiSend, FiMail, FiGithub, FiLinkedin, FiMessageCircle } from "react-icons/fi";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateName(v: string): string | undefined {
  if (!v.trim()) return "Name is required";
  if (v.trim().length < 2) return "Name must be at least 2 characters";
}

function validateEmail(v: string): string | undefined {
  if (!v.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Enter a valid email address";
}

function validateMessage(v: string): string | undefined {
  if (!v.trim()) return "Message is required";
  if (v.trim().length < 10) return "Message must be at least 10 characters";
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [form, setForm] = useState({
    name: "", email: "", message: "",
    collaborationType: "freelance", isInternship: false, isMVP: false,
  });
  const [sending, setSending] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const errors: FormErrors = {};
  const errName = validateName(form.name);
  const errEmail = validateEmail(form.email);
  const errMessage = validateMessage(form.message);
  if (errName) errors.name = errName;
  if (errEmail) errors.email = errEmail;
  if (errMessage) errors.message = errMessage;
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (!submitStatus) return;
    const t = setTimeout(() => setSubmitStatus(null), 5000);
    return () => clearTimeout(t);
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (hasErrors) return;
    setSending(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ ok: true, msg: "Message sent! I'll reply within 24 hours." });
        setForm({ name: "", email: "", message: "", collaborationType: "freelance", isInternship: false, isMVP: false });
        setTouched({});
      } else {
        setSubmitStatus({ ok: false, msg: "Something went wrong. Email me directly at krishnaahari05@gmail.com" });
      }
    } catch {
      setSubmitStatus({ ok: false, msg: "Something went wrong. Email me directly at krishnaahari05@gmail.com" });
    } finally {
      setSending(false);
    }
  };

  const blur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="font-mono text-accent text-sm tracking-widest uppercase section-label">Let's Talk</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-light mt-3">
            Reach <span className="gradient-text">Out</span>
          </h2>
          <p className="mt-3 text-muted font-body max-w-lg mx-auto text-base">
            Start a conversation about your next project, hardware build, or idea.
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
                <h3 className="font-display font-bold text-2xl text-light mt-3">Open a profile and reach out directly.</h3>
                <p className="mt-4 text-muted font-body leading-relaxed text-base">
                  Use the buttons below to open the correct profile links, or send a message through the form if you prefer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: FiMail, label: "Email", href: "mailto:krishnaahari05@gmail.com?subject=Opportunity%20from%20Portfolio", color: "#ff2d78" },
                  { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/hari-krishnaa-n", color: "#0077b5" },
                  { icon: FiGithub, label: "GitHub", href: "https://github.com/krishnaa-0506", color: "#6c63ff" },
                  { icon: FiMessageCircle, label: "WhatsApp", href: "https://wa.me/916379726858?text=Hi%20Hari%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!", color: "#25d366", isWhatsApp: true },
                ].map(({ icon: Icon, label, href, color, isWhatsApp }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6, scale: 1.01 }}
                    className={`rounded-2xl border border-border/60 px-4 py-4 flex items-center gap-3 text-sm font-body transition-all duration-200 ${isWhatsApp ? 'bg-green-900/10 hover:bg-green-900/20 border-green-500/20' : 'bg-bg/40 text-light'}`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={isWhatsApp ? 'text-green-300' : 'text-light'}>{label}</span>
                      <span className="text-xs text-muted">Open profile</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            noValidate
            className="glass glow-border rounded-3xl p-5 sm:p-8 space-y-5"
            aria-describedby="contact-status"
          >
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((field) => {
              const hasErr = touched[field.id] && errors[field.id as keyof FormErrors];
              return (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">{field.label}</label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as "name" | "email"]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    onBlur={() => blur(field.id)}
                    autoComplete={field.id === "name" ? "name" : "email"}
                    required
                    className={`w-full bg-bg/50 border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none transition-all duration-200 ${hasErr ? 'border-rose-400' : ''}`}
                    style={hasErr ? { borderColor: undefined } : { borderColor: 'rgb(var(--color-border))' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12), 0 0 12px rgba(139,92,246,0.08)'; }}
                  />
                  {hasErr && (
                    <p className="mt-1 text-xs text-rose-300 font-body">{errors[field.id as keyof FormErrors]}</p>
                  )}
                </div>
              );
            })}
            <div>
              <label htmlFor="message" className="block font-mono text-sm text-accent mb-2 tracking-wider uppercase">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onBlur={() => blur("message")}
                autoComplete="off"
                required
                className={`w-full bg-bg/50 border rounded-xl px-4 py-3 text-light text-base font-body placeholder:text-muted focus:outline-none transition-all duration-200 resize-none ${touched.message && errors.message ? 'border-rose-400' : ''}`}
                style={touched.message && errors.message ? { borderColor: undefined } : { borderColor: 'rgb(var(--color-border))' }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12), 0 0 12px rgba(139,92,246,0.08)'; }}
              />
              {touched.message && errors.message && (
                <p className="mt-1 text-xs text-rose-300 font-body">{errors.message}</p>
              )}
            </div>

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
                <option value="hardware">Hardware / IoT Project</option>
                <option value="placement">Placement Role</option>
                <option value="internship">Internship</option>
                <option value="fulltime">Full-time Work</option>
                <option value="consulting">AI Consulting</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isInternship}
                  onChange={(e) => setForm({ ...form, isInternship: e.target.checked })}
                  className="w-5 h-5 rounded accent border-border bg-bg/50 cursor-pointer"
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
              whileHover={sending ? {} : { scale: 1.02, boxShadow: "0 0 30px rgba(108,99,255,0.4)" }}
              whileTap={sending ? {} : { scale: 0.98 }}
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
              {submitStatus && (
                <p className={`text-sm font-body ${submitStatus.ok ? 'text-green-400' : 'text-rose-300'}`}>
                  {submitStatus.ok && <span className="mr-1">✓</span>}
                  {submitStatus.msg}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 available-dot" />
              <span className="text-xs font-mono text-muted">Available for new opportunities</span>
            </div>

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
          </motion.form>
        </div>
      </div>
    </section>
  );
}
