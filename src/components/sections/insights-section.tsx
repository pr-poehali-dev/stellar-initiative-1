import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Icon from "@/components/ui/icon"

const advantages = [
  {
    icon: "Shield",
    title: "Более 100 лет службы фасада",
    description:
      "Облицовочный кирпич не теряет прочности, цвета и формы на протяжении десятилетий",
  },
  {
    icon: "Paintbrush",
    title: "Не требует покраски и сложного ухода",
    description:
      "Фасад сохраняет идеальный вид без дополнительных затрат на обслуживание",
  },
  {
    icon: "Thermometer",
    title: "Подходит для климата Приморья",
    description:
      "Выдерживает перепады температур, влажность и морские ветры дальневосточного региона",
  },
  {
    icon: "Palette",
    title: "Богатый выбор цветов и фактур",
    description:
      "Десятки оттенков и текстур для воплощения любого архитектурного замысла",
  },
  {
    icon: "Handshake",
    title: "Помощь в подборе и комплектации",
    description:
      "Эксперты помогут рассчитать объём, подобрать цвет и скомплектовать заказ",
  },
  {
    icon: "Truck",
    title: "Надёжные поставки с 2003 года",
    description:
      "Более 20 лет опыта комплексных поставок стройматериалов по всему Приморью",
  },
]

export function InsightsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"])

  return (
    <section
      id="advantages"
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Top divider */}
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
          className="mb-6"
        >
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Преимущества
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.15] text-foreground max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Почему
          <br />
          <em className="italic text-foreground/70">облицовочный кирпич</em>
        </motion.h2>

        {/* Advantage grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative bg-secondary/50 border border-border rounded-sm p-7 md:p-8 transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/[0.04]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="relative mb-6 w-12 h-12 rounded-sm bg-background border border-border flex items-center justify-center group-hover:border-foreground/20 transition-colors duration-300">
                <Icon
                  name={item.icon}
                  size={22}
                  className="text-foreground/60 group-hover:text-foreground transition-colors duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="relative text-base md:text-lg font-serif text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Corner accent on hover */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-transparent group-hover:border-foreground/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}