import { useState } from "react"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

const footerLinks = [
  { label: "О компании", id: "about" },
  { label: "Каталог", id: "catalog" },
  { label: "Объекты", id: "objects" },
  { label: "Преимущества", id: "advantages" },
  { label: "Контакты", id: "contacts" },
]

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <footer id="contacts" className="relative bg-background overflow-hidden">
      {/* Top divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-foreground/10" />
      </div>

      {/* ===================== Contact Block ===================== */}
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
            Контакты
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
          Свяжитесь
          <br />
          <em className="italic text-foreground/70">с нами</em>
        </motion.h2>

        <motion.p
          className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Поможем подобрать кирпич, рассчитать объём и организовать доставку
        </motion.p>

        {/* Two-column layout */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left column — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="MapPin" size={18} className="text-foreground/60" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1.5">
                    Адрес
                  </p>
                  <p className="text-foreground text-base leading-relaxed">
                    г. Артём, ул. Вокзальная, 114
                  </p>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Phone" size={18} className="text-foreground/60" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1.5">
                    Телефон
                  </p>
                  <a
                    href="tel:+74232448010"
                    className="block text-foreground text-base hover:text-primary transition-colors duration-200"
                  >
                    +7 (423) 244-80-10
                  </a>
                  <a
                    href="tel:+79147922784"
                    className="block text-foreground text-base hover:text-primary transition-colors duration-200 mt-1"
                  >
                    +7 (914) 792-27-84
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Mail" size={18} className="text-foreground/60" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:vostokinveststal@mail.ru"
                    className="text-foreground text-base hover:text-primary transition-colors duration-200"
                  >
                    vostokinveststal@mail.ru
                  </a>
                </div>
              </div>

              {/* Messengers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="MessageCircle" size={18} className="text-foreground/60" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2.5">
                    Мессенджеры
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-sm text-sm text-foreground/70 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
                    >
                      <Icon name="MessageCircle" size={16} />
                      WhatsApp
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-sm text-sm text-foreground/70 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
                    >
                      <Icon name="Send" size={16} />
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Имя
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ваше имя"
                  className="w-full bg-secondary border border-border rounded-sm px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Телефон
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-secondary border border-border rounded-sm px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="contact-comment"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Комментарий
                </label>
                <textarea
                  id="contact-comment"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, comment: e.target.value }))
                  }
                  placeholder="Расскажите, что вас интересует"
                  className="w-full bg-secondary border border-border rounded-sm px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full px-8 py-4 bg-foreground text-background text-sm tracking-wide uppercase font-medium rounded-sm hover:bg-foreground/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Отправить заявку
                <Icon
                  name="ArrowRight"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <p className="text-xs text-muted-foreground/60 text-center pt-1">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </motion.div>
        </div>

        {/* ===================== Map Placeholder ===================== */}
        <motion.div
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-sm border border-border overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Icon name="Map" size={32} className="text-gray-300" />
              <p className="text-sm text-muted-foreground/60 tracking-wide">
                Карта — г. Артём, ул. Вокзальная, 114
              </p>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-foreground/10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-foreground/10" />
          </div>
        </motion.div>
      </div>

      {/* ===================== Footer ===================== */}
      <div className="relative">
        {/* Gradient blob — warm terracotta/amber */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-orange-200/30 to-yellow-100/20 opacity-50 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/10" />

          <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left — logo and nav */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-wider hover:opacity-70 transition-opacity"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ВИС
              </motion.button>

              <nav className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
                {footerLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Right — copyright */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>&copy; 2025 ВИС. Все права защищены.</p>
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-foreground/20"
              >
                Политика конфиденциальности
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}