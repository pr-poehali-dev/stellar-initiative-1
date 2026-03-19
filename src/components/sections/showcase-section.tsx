import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Icon from "@/components/ui/icon"

const placeholderObjects = [
  { id: 1, label: "Частный дом", location: "Владивосток" },
  { id: 2, label: "Загородный коттедж", location: "Артём" },
  { id: 3, label: "Таунхаус", location: "Уссурийск" },
  { id: 4, label: "Жилой комплекс", location: "Владивосток" },
  { id: 5, label: "Частная резиденция", location: "Находка" },
  { id: 6, label: "Дачный дом", location: "Приморский край" },
]

function ObjectCard({
  item,
  index,
  yOffset,
}: {
  item: (typeof placeholderObjects)[0]
  index: number
  yOffset: ReturnType<typeof useTransform>
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-sm"
      style={{ y: yOffset }}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Placeholder image area */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-250 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/bucket/fedab3ad-5f8e-4699-bb79-0702a05a1ced.jpeg"
            alt="Фото объекта"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Object info — visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white text-base font-serif">{item.label}</p>
          <p className="text-white/60 text-xs tracking-wide mt-1 flex items-center gap-1.5">
            <Icon name="MapPin" size={11} />
            {item.location}
          </p>
        </div>
      </div>

      {/* Card footer - always visible */}
      <div className="px-4 py-4 bg-background border border-t-0 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-serif text-foreground">{item.label}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5 flex items-center gap-1">
              <Icon name="MapPin" size={10} />
              {item.location}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/30 transition-colors duration-300">
            <Icon
              name="ArrowUpRight"
              size={13}
              className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Create parallax offsets for 6 cards with varying intensities
  const y0 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y4 = useTransform(scrollYProgress, [0, 1], [140, -140])
  const y5 = useTransform(scrollYProgress, [0, 1], [70, -70])
  const yValues = [y0, y1, y2, y3, y4, y5]

  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"])

  return (
    <section
      id="objects"
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
            Готовые объекты
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
          Дома, которые
          <br />
          <em className="italic text-foreground/70">вдохновляют</em>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Реальные фасады из облицовочного кирпича — от наших клиентов
        </motion.p>

        {/* Gallery grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {placeholderObjects.map((item, i) => (
            <ObjectCard
              key={item.id}
              item={item}
              index={i}
              yOffset={yValues[i]}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-secondary/60 border border-border rounded-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Скоро здесь появятся фотографии реальных объектов наших клиентов
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}