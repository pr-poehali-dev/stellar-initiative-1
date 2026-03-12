import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const stats = [
  { value: "20+", label: "лет", description: "на рынке Приморья" },
  { value: "500+", label: "позиций", description: "в ассортименте" },
  { value: "Приморский", label: "край", description: "география поставок" },
]

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Top divider line */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="h-px bg-foreground/10"
          style={{ width: lineWidth }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            О компании
          </span>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left column — text */}
          <div ref={textRef}>
            {/* Heading */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.15] text-foreground"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              ВИС — надёжный
              <br />
              <em className="italic text-foreground/70">партнёр в строительстве</em>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mt-8 md:mt-10 text-muted-foreground text-base md:text-lg leading-[1.8] max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              С 2003 года комплектуем строительные объекты во Владивостоке и Приморье,
              предлагая клиентам широкий выбор материалов, экспертную помощь и понятный сервис.
            </motion.p>

            <motion.p
              className="mt-5 text-muted-foreground text-base md:text-lg leading-[1.8] max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Более 500 позиций в ассортименте, комплексные поставки, прозрачная стоимость
              и точные сроки позволяют экономить время, снижать издержки и уверенно вести
              стройку без лишних рисков.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="mt-14 md:mt-16 grid grid-cols-3 gap-6 md:gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm md:text-base font-medium text-foreground/80">
                    {stat.label}
                  </div>
                  <div className="mt-1.5 text-xs md:text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                  {/* Subtle top accent line */}
                  {i > 0 && (
                    <div className="absolute -left-3 md:-left-5 top-0 bottom-0 w-px bg-foreground/10" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column — image */}
          <motion.div
            className="relative lg:sticky lg:top-32"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative overflow-hidden rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image reveal mask */}
              <motion.div
                className="overflow-hidden"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/files/b1711b9b-50ea-478b-b4c1-68ed96c930c3.jpg"
                  alt="Строительные объекты ВИС"
                  className="w-full aspect-[4/5] object-cover"
                />
              </motion.div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-foreground/20" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-foreground/20" />
            </motion.div>

            {/* Floating label */}
            <motion.div
              className="absolute -bottom-6 -left-4 md:-left-8 bg-background px-5 py-3 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                С 2003 года
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}