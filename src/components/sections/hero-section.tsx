import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const navLinks = [
  { label: "О компании", href: "#about" },
  { label: "Каталог", href: "#catalog" },
  { label: "Объекты", href: "#objects" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contacts" },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image with cinematic zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src="https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/files/2c3abcd6-2cf3-4653-8f2d-ed129c82c9a9.jpg"
          alt="Облицовочный кирпич"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white font-serif text-2xl md:text-3xl tracking-wider font-bold hover:opacity-80 transition-opacity"
        >
          ВИС
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href.replace("#", ""))}
              className="text-white/80 hover:text-white text-sm tracking-wide uppercase transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={28} />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => {
                  setMenuOpen(false)
                  setTimeout(() => scrollToSection(link.href.replace("#", "")), 300)
                }}
                className="text-white text-2xl font-serif tracking-wide hover:text-white/70 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y: textY }}
      >
        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="inline-block text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm">
            Облицовочный кирпич
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.1] max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Фасад, который
          <br />
          <em className="italic text-white/90">говорит за себя</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-white/60 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed font-sans"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Облицовочный кирпич от ведущих производителей — для домов, которые запоминаются
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={() => scrollToSection("contacts")}
            className="group relative px-8 py-4 bg-white text-black text-sm tracking-wide uppercase font-medium rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Оставить заявку
              <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button
            onClick={() => scrollToSection("contacts")}
            className="group px-8 py-4 border border-white/30 text-white text-sm tracking-wide uppercase font-medium rounded-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Icon name="Phone" size={16} />
            Заказать звонок
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
          Листайте вниз
        </span>
        <motion.div
          className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}