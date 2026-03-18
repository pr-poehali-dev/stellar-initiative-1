import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import Icon from "@/components/ui/icon"

interface BrickItem {
  manufacturer: string
  name: string
  tag: string
}

function deriveTag(name: string): string {
  if (name.includes("Антик")) return "Антик"
  if (name.includes("Рустик")) return "Рустик"
  if (name.includes("Флэш") || name.includes("Флеш")) return "Флэш"
  if (name.includes("Обжиг")) return "Обжиг"
  return "Классик"
}

const CDN_BASE = "https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/bucket"

const imageMap: Record<string, [string, string, string]> = {
  "Белый Антик": [
    `${CDN_BASE}/24c78df7-28a5-4de0-b8f9-11e77bca5c12.jpeg`,
    `${CDN_BASE}/5933d479-d817-4f96-b24a-07483eeeac6f.png`,
    `${CDN_BASE}/fe444510-6226-42f0-a9b6-0e85fdf237ef.png`,
  ],
  "Ваниль Антик": [
    `${CDN_BASE}/262df2e6-e718-4a8e-b642-c19f1b6aa5c9.jpeg`,
    `${CDN_BASE}/90f682c0-17d6-419d-adf0-8029055876cc.jpeg`,
    `${CDN_BASE}/ce83b42f-9fed-4759-8108-09f5a77a96c4.png`,
  ],
}

function getImages(name: string): string[] | null {
  return imageMap[name] || null
}

const brickCatalog: BrickItem[] = [
  { manufacturer: "Магма Керамик", name: "Белый Антик", tag: deriveTag("Белый Антик") },
  { manufacturer: "Магма Керамик", name: "Ваниль Антик", tag: deriveTag("Ваниль Антик") },
  { manufacturer: "Магма Керамик", name: "Белый", tag: deriveTag("Белый") },
  { manufacturer: "Магма Керамик", name: "Флэш Обжиг", tag: deriveTag("Флэш Обжиг") },
  { manufacturer: "Магма Керамик", name: "Флеш Обжиг Антик", tag: deriveTag("Флеш Обжиг Антик") },
  { manufacturer: "Магма Керамик", name: "Флеш Графит Антик", tag: deriveTag("Флеш Графит Антик") },
  { manufacturer: "Магма Керамик", name: "Флеш Графит", tag: deriveTag("Флеш Графит") },
  { manufacturer: "Магма Керамик", name: "Туман", tag: deriveTag("Туман") },
  { manufacturer: "Магма Керамик", name: "Орион", tag: deriveTag("Орион") },
  { manufacturer: "5-й элемент", name: "Сокровище Кенигсберга", tag: deriveTag("Сокровище Кенигсберга") },
  { manufacturer: "5-й элемент", name: "Буря над Раушеном", tag: deriveTag("Буря над Раушеном") },
  { manufacturer: "5-й элемент", name: "Классик Мюнхен Руст", tag: deriveTag("Классик Мюнхен Руст") },
  { manufacturer: "Recke", name: "5-32-00-0-00", tag: deriveTag("5-32-00-0-00") },
  { manufacturer: "Recke", name: "5-82-00-2-00", tag: deriveTag("5-82-00-2-00") },
  { manufacturer: "Recke", name: "5-82-2-12", tag: deriveTag("5-82-2-12") },
  { manufacturer: "ЖКЗ", name: "Серый", tag: deriveTag("Серый") },
  { manufacturer: "ЖКЗ", name: "Солома", tag: deriveTag("Солома") },
  { manufacturer: "ЖКЗ", name: "Коричневый", tag: deriveTag("Коричневый") },
  { manufacturer: "Старый Оскол", name: "Коричневый Рустик", tag: deriveTag("Коричневый Рустик") },
  { manufacturer: "Старый Оскол", name: "Солома Рустик", tag: deriveTag("Солома Рустик") },
  { manufacturer: "Старый Оскол", name: "Эмират", tag: deriveTag("Эмират") },
]

const pavingStones: BrickItem[] = [
  { manufacturer: "5-й элемент", name: "Позиция 1", tag: "Брусчатка" },
  { manufacturer: "5-й элемент", name: "Позиция 2", tag: "Брусчатка" },
  { manufacturer: "5-й элемент", name: "Позиция 3", tag: "Брусчатка" },
]

const manufacturers = ["Все", "Магма Керамик", "5-й элемент", "Recke", "ЖКЗ", "Старый Оскол"]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }, [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose, prev, next])

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/90" onClick={onClose} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-200"
        >
          <Icon name="X" size={20} className="text-white" />
        </button>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-200"
        >
          <Icon name="ChevronLeft" size={24} className="text-white" />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-200"
        >
          <Icon name="ChevronRight" size={24} className="text-white" />
        </button>

        <div className="relative z-10 max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current}
              src={images[current]}
              alt={`Изображение ${current + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/70 w-2"
              }`}
            />
          ))}
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm">
          {current + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

function ImageCarousel({ images, tag }: { images: string[]; tag: string }) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  return (
    <>
      <div
        className="relative aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${tag} ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block text-[10px] tracking-[0.15em] uppercase font-medium bg-white/90 backdrop-blur-sm text-foreground/70 px-3 py-1 rounded-sm">
            {tag}
          </span>
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
        >
          <Icon name="ChevronRight" size={16} />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setCurrent(i)
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === current ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 pointer-events-none" />
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          startIndex={current}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

function BrickCard({ item, index }: { item: BrickItem; index: number }) {
  const images = getImages(item.name)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group bg-background border border-border rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/5"
    >
      {images ? (
        <ImageCarousel images={images} tag={item.tag} />
      ) : (
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              name="Image"
              size={32}
              className="text-gray-300 group-hover:text-gray-400 transition-colors duration-300"
            />
          </div>
          <div className="absolute top-3 left-3">
            <span className="inline-block text-[10px] tracking-[0.15em] uppercase font-medium bg-white/90 backdrop-blur-sm text-foreground/70 px-3 py-1 rounded-sm">
              {item.tag}
            </span>
          </div>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>
      )}

      <div className="p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
          {item.manufacturer}
        </p>
        <h3 className="mt-1.5 text-base font-serif text-foreground leading-snug">
          {item.name}
        </h3>
        <button
          onClick={() => scrollToSection("contacts")}
          className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-wide uppercase font-medium text-primary hover:text-primary/80 transition-colors duration-200 group/btn"
        >
          Узнать цену
          <Icon
            name="ArrowRight"
            size={13}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
          />
        </button>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const [activeFilter, setActiveFilter] = useState("Все")

  const filteredBricks =
    activeFilter === "Все"
      ? brickCatalog
      : brickCatalog.filter((b) => b.manufacturer === activeFilter)

  return (
    <section id="catalog" className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-foreground/10" />
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
            Каталог
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.15] text-foreground max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Цвет и фактура
          <br />
          <em className="italic text-foreground/70">будущего фасада</em>
        </motion.h2>

        <motion.p
          className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Подберите облицовочный кирпич по производителю, цвету и характеру фасада
        </motion.p>

        <motion.div
          className="mt-12 md:mt-16 flex flex-wrap gap-2 md:gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {manufacturers.map((m) => (
            <button
              key={m}
              onClick={() => setActiveFilter(m)}
              className={`
                relative px-5 py-2.5 text-xs md:text-sm tracking-wide uppercase font-medium rounded-sm
                transition-all duration-300 border
                ${
                  activeFilter === m
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/60 border-border hover:border-foreground/30 hover:text-foreground"
                }
              `}
            >
              {m}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 md:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredBricks.map((brick, i) => (
                <BrickCard key={`${brick.manufacturer}-${brick.name}`} item={brick} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filteredBricks.length} {filteredBricks.length === 1 ? "позиция" : filteredBricks.length < 5 ? "позиции" : "позиций"}
        </motion.div>

        <div className="mt-24 md:mt-32">
          <div className="h-px bg-foreground/10 mb-16 md:mb-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              Дополнительно
            </span>
          </motion.div>

          <motion.h3
            className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.2] text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Тротуарный клинкер <em className="italic text-foreground/70">в тон фасаду</em>
          </motion.h3>

          <motion.p
            className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Подберите брусчатку, которая гармонично дополнит облицовку дома
          </motion.p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {pavingStones.map((stone, i) => (
              <BrickCard key={`paving-${stone.name}`} item={stone} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-24 md:mt-32 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-foreground rounded-sm px-8 md:px-16 py-14 md:py-20 text-center">
            <div className="absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 border-t border-l border-background/15" />
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 border-b border-r border-background/15" />

            <motion.h3
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-background leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Не знаете, какой кирпич выбрать?
            </motion.h3>

            <motion.p
              className="mt-4 text-background/60 text-base md:text-lg max-w-lg mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Подберём вариант под стиль дома, цвет кровли и бюджет
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <button
                onClick={() => scrollToSection("contacts")}
                className="group px-7 py-3.5 bg-background text-foreground text-sm tracking-wide uppercase font-medium rounded-sm hover:bg-background/90 transition-all duration-300 flex items-center gap-2"
              >
                Подобрать кирпич
                <Icon
                  name="ArrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="px-7 py-3.5 border border-background/30 text-background text-sm tracking-wide uppercase font-medium rounded-sm hover:bg-background/10 hover:border-background/50 transition-all duration-300"
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="px-7 py-3.5 border border-background/30 text-background text-sm tracking-wide uppercase font-medium rounded-sm hover:bg-background/10 hover:border-background/50 transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="Tag" size={15} />
                Узнать цену
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}