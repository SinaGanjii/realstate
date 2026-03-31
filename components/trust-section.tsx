"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState, useRef } from "react"
import { useAnimation } from "framer-motion"

/* ─── Animated counter ─── */
function AnimatedCounter({
  value,
  suffix = "",
  isInView,
}: {
  value: number
  suffix?: string
  isInView: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const duration = 2000
    const tick = (now: number) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, isInView])

  return <>{display}{suffix}</>
}

/* ─── Data ─── */
const stats = [
  { key: "projects",   value: 500, suffix: "+" },
  { key: "clients",    value: 350, suffix: "+" },
  { key: "experience", value: 12,  suffix: "" },
]

const testimonials = [
  {
    quote: "The attention to detail and professionalism exceeded all our expectations. Truly a premium service.",
    author: "Sarah M.",
    role: "Homeowner",
    location: "Paris",
  },
  {
    quote: "Our kitchen installation was handled with exceptional care. Every single detail was perfect.",
    author: "Thomas B.",
    role: "Interior Designer",
    location: "Lyon",
  },
  {
    quote: "Moving day was completely stress-free thanks to the MAISON team. White-glove service at its finest.",
    author: "Clara D.",
    role: "Property Manager",
    location: "Bordeaux",
  },
  {
    quote: "From consultation to execution, every step was flawless. I highly recommend their services.",
    author: "Antoine R.",
    role: "Architect",
    location: "Nice",
  },
  {
    quote: "The furniture assembly team was punctual, clean, and incredibly skilled. Outstanding work.",
    author: "Isabelle V.",
    role: "Homeowner",
    location: "Marseille",
  },
]

const team = [
  { name: "Alexandre Martin", role: "Founder & CEO",       initials: "AM" },
  { name: "Sophie Laurent",   role: "Head of Operations",  initials: "SL" },
  { name: "Lucas Bernard",    role: "Lead Technician",     initials: "LB" },
  { name: "Emma Dupont",      role: "Client Relations",    initials: "ED" },
]

/* ─── Main section ─── */
export function TrustSection() {
  const { t } = useLanguage()
  const { ref: titleRef, isInView: titleInView }   = useScrollAnimation()
  const { ref: statsRef, isInView: statsInView }   = useScrollAnimation()
  const { ref: teamRef,  isInView: teamInView }    = useScrollAnimation()

  const allTestimonials = [...testimonials, ...testimonials]
  const marqueeControls = useAnimation()

  useEffect(() => {
    marqueeControls.start({
      x: ["0%", "-50%"],
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    })
  }, [marqueeControls])

  return (
    <section id="about" className="relative py-16 lg:py-32 overflow-hidden">

      {/* ── Header ── */}
      <div ref={titleRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-widest text-accent"
          >
            {t.trust.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            {t.trust.title}
          </motion.h2>
        </div>

        {/* ── Stats ── */}
        <div
          ref={statsRef}
          className="relative mx-auto max-w-4xl mb-24"
        >
          {/* outer border */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={statsInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-2xl border border-border/60 origin-left"
          />

          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center px-3 py-7 text-center sm:px-8 sm:py-10"
              >
                <span className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={statsInView} />
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:mt-2 sm:text-xs sm:tracking-widest">
                  {t.trust[stat.key as keyof typeof t.trust] as string}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Testimonials marquee ── */}
      <div className="relative mb-16 overflow-hidden lg:mb-24">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          animate={marqueeControls}
          className="flex gap-5 w-max"
          style={{ willChange: "transform" }}
          onMouseEnter={() => marqueeControls.stop()}
          onMouseLeave={() =>
            marqueeControls.start({
              x: ["0%", "-50%"],
              transition: { duration: 40, repeat: Infinity, ease: "linear" },
            })
          }
        >
          {allTestimonials.map((item, i) => (
            <div
              key={i}
              className="w-80 shrink-0 rounded-2xl border border-border/50 bg-card p-7 shadow-sm"
            >
              {/* accent rule */}
              <div className="mb-5 h-px w-8 bg-accent" />

              <p className="text-sm leading-relaxed text-muted-foreground italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                  {item.author.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.role} · {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Team ── */}
      <div ref={teamRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* team header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-end sm:justify-between lg:mb-12"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Our Team
            </span>
            <h3 className="mt-2 font-serif text-3xl font-medium text-foreground sm:text-4xl">
              The People Behind MAISON
            </h3>
          </div>
        </motion.div>

        {/* team grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-7 transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              {/* subtle hover tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* avatar */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground ring-1 ring-border/50 transition-all duration-500 group-hover:ring-accent/40">
                  {member.initials}
                </div>

                {/* top accent line */}
                <div className="mb-4 h-px w-6 bg-accent transition-all duration-500 group-hover:w-10" />

                <p className="font-serif text-lg font-medium text-foreground leading-tight">
                  {member.name}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
