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

const contactItems = [
  {
    icon: "MapPin",
    label: "Адрес",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200/60",
    glowColor: "group-hover:shadow-rose-500/15",
    content: (
      <p className="text-foreground text-base leading-relaxed">
        г. Артём, ул. Вокзальная, 114
      </p>
    ),
  },
  {
    icon: "Phone",
    label: "Телефон",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200/60",
    glowColor: "group-hover:shadow-emerald-500/15",
    content: (
      <div>
        <a
          href="tel:+74232448010"
          className="block text-foreground text-base hover:text-emerald-700 transition-colors duration-200"
        >
          +7 (423) 244-80-10
        </a>
        <a
          href="tel:+79147922784"
          className="block text-foreground text-base hover:text-emerald-700 transition-colors duration-200 mt-1"
        >
          +7 (914) 792-27-84
        </a>
      </div>
    ),
  },
  {
    icon: "Mail",
    label: "Email",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    iconBorder: "border-sky-200/60",
    glowColor: "group-hover:shadow-sky-500/15",
    content: (
      <a
        href="mailto:vostokinveststal@mail.ru"
        className="text-foreground text-base hover:text-sky-700 transition-colors duration-200"
      >
        vostokinveststal@mail.ru
      </a>
    ),
  },
  {
    icon: "MessageCircle",
    label: "Мессенджеры",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200/60",
    glowColor: "group-hover:shadow-violet-500/15",
    content: null,
  },
]

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <footer id="contacts" className="relative bg-background overflow-hidden">
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
            Контакты
          </span>
        </motion.div>

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

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="space-y-7">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`group flex items-start gap-4 p-3 -m-3 rounded-lg transition-all duration-300 hover:bg-secondary/60 ${item.glowColor} hover:shadow-lg`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="relative flex-shrink-0 mt-0.5">
                    <motion.div
                      className={`w-11 h-11 rounded-lg ${item.iconBg} border ${item.iconBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon name={item.icon} size={20} className={`${item.iconColor} transition-transform duration-300`} />
                    </motion.div>
                    <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${item.iconBg} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 pointer-events-none`} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1.5">
                      {item.label}
                    </p>
                    {item.content ? (
                      item.content
                    ) : (
                      <div className="flex gap-3 mt-0.5">
                        <a
                          href="#"
                          className="group/btn inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-200/60 bg-emerald-50/50 rounded-lg text-sm text-foreground/70 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/10"
                        >
                          <Icon name="MessageCircle" size={16} className="text-emerald-600 transition-transform duration-300 group-hover/btn:scale-110" />
                          WhatsApp
                        </a>
                        <a
                          href="#"
                          className="group/btn inline-flex items-center gap-2 px-4 py-2.5 border border-sky-200/60 bg-sky-50/50 rounded-lg text-sm text-foreground/70 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all duration-300 hover:shadow-md hover:shadow-sky-500/10"
                        >
                          <Icon name="Send" size={16} className="text-sky-600 transition-transform duration-300 group-hover/btn:scale-110" />
                          Telegram
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Имя
                </label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "name" ? "bg-amber-50 scale-110" : "bg-secondary"}`}>
                    <Icon name="User" size={16} className={`transition-colors duration-300 ${focusedField === "name" ? "text-amber-600" : "text-muted-foreground/50"}`} />
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Ваше имя"
                    className="w-full bg-secondary border border-border rounded-lg pl-14 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400/50 transition-all duration-300 hover:border-foreground/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Телефон
                </label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "phone" ? "bg-emerald-50 scale-110" : "bg-secondary"}`}>
                    <Icon name="Phone" size={16} className={`transition-colors duration-300 ${focusedField === "phone" ? "text-emerald-600" : "text-muted-foreground/50"}`} />
                  </div>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-secondary border border-border rounded-lg pl-14 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400/50 transition-all duration-300 hover:border-foreground/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-comment"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                >
                  Комментарий
                </label>
                <div className="relative">
                  <div className={`absolute left-3.5 top-4 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "comment" ? "bg-sky-50 scale-110" : "bg-secondary"}`}>
                    <Icon name="MessageSquare" size={16} className={`transition-colors duration-300 ${focusedField === "comment" ? "text-sky-600" : "text-muted-foreground/50"}`} />
                  </div>
                  <textarea
                    id="contact-comment"
                    rows={4}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, comment: e.target.value }))
                    }
                    onFocus={() => setFocusedField("comment")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Расскажите, что вас интересует"
                    className="w-full bg-secondary border border-border rounded-lg pl-14 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400/50 transition-all duration-300 resize-none hover:border-foreground/20"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white text-sm tracking-wide uppercase font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-600/20 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  Отправить заявку
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </motion.button>

              <p className="text-xs text-muted-foreground/60 text-center pt-1">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </motion.div>
        </div>

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
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-foreground/10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-foreground/10" />
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-orange-200/30 to-yellow-100/20 opacity-50 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-px bg-foreground/10" />

          <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
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
