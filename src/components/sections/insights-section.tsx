import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Icon from "@/components/ui/icon"

const advantages = [
  {
    icon: "Shield",
    title: "Более 100 лет службы фасада",
    description:
      "Облицовочный кирпич не теряет прочности, цвета и формы на протяжении десятилетий",
    accentFrom: "from-amber-500/20",
    accentTo: "to-orange-600/10",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200/60",
    glowColor: "shadow-amber-500/10",
    hoverBorder: "group-hover:border-amber-300/50",
  },
  {
    icon: "Paintbrush",
    title: "Не требует сложного ухода",
    description:
      "Фасад сохраняет идеальный вид без дополнительных затрат на обслуживание",
    accentFrom: "from-emerald-500/20",
    accentTo: "to-teal-600/10",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200/60",
    glowColor: "shadow-emerald-500/10",
    hoverBorder: "group-hover:border-emerald-300/50",
  },
  {
    icon: "Thermometer",
    title: "Подходит для климата Приморья",
    description:
      "Выдерживает перепады температур, влажность и морские ветры дальневосточного региона",
    accentFrom: "from-sky-500/20",
    accentTo: "to-blue-600/10",
    iconColor: "text-sky-700",
    iconBg: "bg-sky-50",
    iconBorder: "border-sky-200/60",
    glowColor: "shadow-sky-500/10",
    hoverBorder: "group-hover:border-sky-300/50",
  },
  {
    icon: "Palette",
    title: "Богатый выбор цветов и фактур",
    description:
      "Десятки оттенков и текстур для воплощения любого архитектурного замысла",
    accentFrom: "from-rose-500/20",
    accentTo: "to-pink-600/10",
    iconColor: "text-rose-700",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200/60",
    glowColor: "shadow-rose-500/10",
    hoverBorder: "group-hover:border-rose-300/50",
  },
  {
    icon: "Handshake",
    title: "Помощь в подборе и комплектации",
    description:
      "Эксперты помогут рассчитать объём, подобрать цвет и скомплектовать заказ",
    accentFrom: "from-violet-500/20",
    accentTo: "to-purple-600/10",
    iconColor: "text-violet-700",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200/60",
    glowColor: "shadow-violet-500/10",
    hoverBorder: "group-hover:border-violet-300/50",
  },
  {
    icon: "Truck",
    title: "Надёжные поставки с 2003 года",
    description:
      "Более 20 лет опыта комплексных поставок стройматериалов по всему Приморью",
    accentFrom: "from-stone-500/20",
    accentTo: "to-amber-700/10",
    iconColor: "text-stone-700",
    iconBg: "bg-stone-50",
    iconBorder: "border-stone-200/60",
    glowColor: "shadow-stone-500/10",
    hoverBorder: "group-hover:border-stone-300/50",
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
          className="mb-6"
        >
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Преимущества
          </span>
        </motion.div>

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

        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              className={`group relative bg-secondary/50 border border-border rounded-sm p-7 md:p-8 transition-all duration-500 hover:shadow-xl ${item.glowColor} ${item.hoverBorder}`}
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
              <div className={`absolute inset-0 rounded-sm bg-gradient-to-br ${item.accentFrom} ${item.accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative mb-6">
                <motion.div
                  className={`w-13 h-13 rounded-lg ${item.iconBg} border ${item.iconBorder} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${item.glowColor}`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon
                    name={item.icon}
                    size={24}
                    className={`${item.iconColor} transition-all duration-300 group-hover:scale-110`}
                  />
                </motion.div>
                <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${item.accentFrom} ${item.accentTo} opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500 pointer-events-none`} />
              </div>

              <h3 className="relative text-base md:text-lg font-serif text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              <div className={`absolute top-3 right-3 w-6 h-6 border-t border-r border-transparent group-hover:border-foreground/10 transition-colors duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InsightsSection