import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { CallbackModal } from "@/components/callback-modal"

const navLinks = [
  { label: "О компании", href: "about" },
  { label: "Каталог", href: "catalog" },
  { label: "Преимущества", href: "advantages" },
  { label: "Объекты", href: "objects" },
  { label: "Контакты", href: "contacts" },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${scrolled
            ? "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.08)] translate-y-0"
            : "bg-white translate-y-0"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[78px] md:h-[84px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.poehali.dev/projects/d658df8b-e030-4797-9e3a-909d5f2118eb/bucket/1bdd031a-97d9-43eb-84a1-c2db0cced3f9.png"
              alt="ВИС"
              className="h-12 md:h-14 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-[#333] hover:text-[#e67e22] text-[15px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setCallbackOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-[#2e7d32] text-[#2e7d32] text-sm font-semibold hover:bg-[#2e7d32] hover:text-white transition-all duration-200"
            >
              <Icon name="Phone" size={16} />
              Заказать звонок
            </button>
            <button
              onClick={() => scrollToSection("contacts")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#e67e22] text-white text-sm font-semibold hover:bg-[#d35400] transition-all duration-200"
            >
              Получить расчёт
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#333] z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>

        {/* Bottom border when not scrolled */}
        <div className={`h-px transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"} bg-gray-200`} />
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => {
                  setMenuOpen(false)
                  setTimeout(() => scrollToSection(link.href), 300)
                }}
                className="text-[#333] text-xl font-medium tracking-wide hover:text-[#e67e22] transition-colors"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                {link.label}
              </motion.button>
            ))}

            <div className="flex flex-col gap-3 mt-4 w-64">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setTimeout(() => setCallbackOpen(true), 300)
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-[#2e7d32] text-[#2e7d32] text-sm font-semibold"
              >
                <Icon name="Phone" size={16} />
                Заказать звонок
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setTimeout(() => scrollToSection("contacts"), 300)
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#e67e22] text-white text-sm font-semibold"
              >
                Получить расчёт
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[78px] md:h-[84px]" />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}

export default SiteHeader