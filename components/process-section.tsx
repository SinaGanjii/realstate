"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useLanguage } from "@/lib/language-context"

const steps = [
  { number: "01", key: "step1" },
  { number: "02", key: "step2" },
  { number: "03", key: "step3" },
]

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const { t } = useLanguage()
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 })

  const stepTranslations = t.process[step.key as keyof typeof t.process] as {
    title: string
    description: string
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col"
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.18 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/40 to-transparent"
      />

      {/* Step number */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.18 + 0.25 }}
        className="font-serif text-6xl font-light leading-none tracking-tight text-accent/30 select-none lg:text-7xl"
      >
        {step.number}
      </motion.span>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.18 + 0.32 }}
        className="mt-6"
      >
        <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          {stepTranslations.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {stepTranslations.description}
        </p>
      </motion.div>

      {/* Connector arrow — desktop only */}
      {!isLast && (
        <div className="absolute top-0 left-full hidden w-16 -translate-y-px items-center lg:flex">
          <div className="h-px flex-1 bg-border/40" />
          <svg className="h-3 w-3 shrink-0 text-border/40" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 1l5 5-5 5" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

export function ProcessSection() {
  const { t } = useLanguage()
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-muted/30 py-24 lg:py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="mx-auto max-w-2xl text-center mb-12 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-widest text-accent"
          >
            {t.process.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            {t.process.title}
          </motion.h2>
        </div>

        {/* Process Steps */}
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.key}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
