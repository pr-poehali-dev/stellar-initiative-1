import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const stats = [
  { value: "20+", label: "лет", description: "на рынке Приморья" },
  { value: "500+", label: "позиций", description: "в ассортименте" },
  { value: "Приморский", label: "край", description: "география поставок" },
]

const WAREHOUSE_IMAGE = "https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/bucket/c866e475-b682-47d0-a573-b7e8ded61e55.jpeg"

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: "-100px" })
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="h-px bg-foreground/10"
          style={{ width: lineWidth }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div ref={textRef}>
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
                  {i > 0 && (
                    <div className="absolute -left-3 md:-left-5 top-0 bottom-0 w-px bg-foreground/10" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative rounded-sm overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxOpen(true)}
          >
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <img
                src={WAREHOUSE_IMAGE}
                alt="Склад стройматериалов ВИС"
                className="w-full h-auto object-contain rounded-sm"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                <Icon name="ZoomIn" size={20} className="text-foreground" />
              </div>
            </div>
            <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-foreground/15" />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-foreground/15" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative max-w-6xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={WAREHOUSE_IMAGE}
                alt="Склад стройматериалов ВИС"
                className="w-full h-auto rounded-md shadow-2xl"
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 md:top-4 md:right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <Icon name="X" size={22} className="text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ManifestoSection
