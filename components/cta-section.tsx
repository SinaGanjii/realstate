"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"

const trustPoints = [
  { label: "Free Consultation", detail: "No commitment, no fees" },
  { label: "24/7 Support",      detail: "Always here when you need us" },
  { label: "Satisfaction Guaranteed", detail: "We don't stop until it's perfect" },
]

const contactDetails = [
  { icon: Phone, value: "+33 1 23 45 67 89" },
  { icon: Mail,  value: "contact@maison.fr" },
  { icon: MapPin, value: "Paris, France" },
]

export function CTASection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: leftRef,  isInView: leftInView }  = useScrollAnimation()
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden py-16 lg:py-0"
    >
      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="overflow-hidden rounded-3xl bg-primary shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* subtle texture overlay */}
          <motion.div
            style={{ y: bgY }}
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden
          >
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </motion.div>

          {/* decorative large serif number — background */}
          <span className="pointer-events-none absolute -bottom-8 -right-4 select-none font-serif text-[220px] font-bold leading-none text-primary-foreground/[0.03] lg:text-[320px]">
            M
          </span>

          <div className="relative grid lg:grid-cols-2">

            {/* ── Left: content ── */}
            <div
              ref={leftRef}
              className="flex flex-col justify-between px-8 py-12 sm:px-12 lg:py-20"
            >
              <div>
                {/* label */}
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={leftInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-medium uppercase tracking-widest text-accent"
                >
                  Contact Us
                </motion.span>

                {/* title */}
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={leftInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance"
                >
                  {t.cta.title}
                </motion.h2>

                {/* subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={leftInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="mt-5 max-w-sm text-base leading-relaxed text-primary-foreground/60"
                >
                  {t.cta.subtitle}
                </motion.p>

                {/* trust points */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={leftInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-10 space-y-5"
                >
                  {trustPoints.map((point, i) => (
                    <motion.li
                      key={point.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={leftInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.32 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-1 h-px w-6 shrink-0 bg-accent" />
                      <div>
                        <p className="text-sm font-semibold text-primary-foreground">
                          {point.label}
                        </p>
                        <p className="mt-0.5 text-xs text-primary-foreground/50">
                          {point.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* contact details */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-12 space-y-3 border-t border-primary-foreground/10 pt-8"
              >
                {contactDetails.map(({ icon: Icon, value }) => (
                  <li key={value} className="flex items-center gap-3 text-sm text-primary-foreground/50">
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                    <span>{value}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* ── Right: form ── */}
            <div
              ref={rightRef}
              className="flex items-center border-t border-primary-foreground/10 px-8 py-12 sm:px-12 lg:border-l lg:border-t-0 lg:py-20"
            >
              {!sent ? (
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  animate={rightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="w-full space-y-8"
                >
                  {/* Name */}
                  <div className="group relative">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary-foreground/40">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Alexandre Martin"
                      className="w-full border-b border-primary-foreground/20 bg-transparent pb-3 text-base text-primary-foreground placeholder:text-primary-foreground/20 focus:border-accent focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary-foreground/40">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="alex@example.com"
                      className="w-full border-b border-primary-foreground/20 bg-transparent pb-3 text-base text-primary-foreground placeholder:text-primary-foreground/20 focus:border-accent focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary-foreground/40">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us about your project…"
                      className="w-full resize-none border-b border-primary-foreground/20 bg-transparent pb-3 text-base text-primary-foreground placeholder:text-primary-foreground/20 focus:border-accent focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary-foreground px-8 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:shadow-lg"
                  >
                    <span className="relative z-10">{t.cta.button}</span>
                    <motion.span
                      className="relative z-10"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-accent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-primary-foreground">
                    Message Sent
                  </h3>
                  <p className="mt-3 text-sm text-primary-foreground/50">
                    Thank you for reaching out. We'll be in touch within 24 hours.
  </p>
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
