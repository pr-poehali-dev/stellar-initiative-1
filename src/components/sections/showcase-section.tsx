import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const placeholderObjects = [
  {
    id: 1,
    label: "Частный дом",
    location: "Владивосток",
    image:
      "https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/bucket/fe037af1-3a03-4523-9afc-31145e2f71c2.jpg",
  },
  { id: 2, label: "Загородный коттедж", location: "Артём", image: null },
  { id: 3, label: "Таунхаус", location: "Уссурийск", image: null },
  { id: 4, label: "Жилой комплекс", location: "Владивосток", image: null },
  { id: 5, label: "Частная резиденция", location: "Находка", image: null },
  { id: 6, label: "Дачный дом", location: "Приморский край", image: null },
]

function Lightbox({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* close button */}
        <button
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          onClick={onClose}
        >
          <Icon name="X" size={18} className="text-white" />
        </button>

        {/* image */}
        <motion.img
          src={src}
          alt=""
          className="relative z-10 max-w-[90vw] max-h-[88vh] object-contain rounded-sm shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  )
}

function ObjectCard({
  item,
  index,
  yOffset,
  onImageClick,
}: {
  item: (typeof placeholderObjects)[0]
  index: number
  yOffset: ReturnType<typeof useTransform>
  onImageClick: (src: string) => void
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
      <div
        className={`relative aspect-[4/5] overflow-hidden ${item.image ? "cursor-zoom-in" : "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-250"}`}
        onClick={() => item.image && onImageClick(item.image)}
      >
        {item.image ? (
          <motion.img
            src={item.image}
            alt={item.label}
            className="absolute inset-0 w-full h-full object-contain bg-gray-100"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-150 to-gray-300"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Icon
                name="Camera"
                size={28}
                className="text-gray-300 group-hover:text-gray-400 transition-colors duration-500"
              />
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-500 transition-colors duration-500">
                Фото объекта
              </span>
            </div>
          </motion.div>
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* zoom hint for cards with photo */}
        {item.image && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Icon name="ZoomIn" size={14} className="text-white" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

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

        {/* Gallery grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {placeholderObjects.map((item, i) => (
            <ObjectCard
              key={item.id}
              item={item}
              index={i}
              yOffset={yValues[i]}
              onImageClick={setLightboxSrc}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </section>
  )
}
