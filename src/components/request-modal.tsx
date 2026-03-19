import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

interface RequestModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
}

export function RequestModal({ isOpen, onClose, productName }: RequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (productName) {
        setFormData((prev) => ({
          ...prev,
          comment: `Интересует: ${productName}`,
        }))
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, productName])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", phone: "", comment: "" })
        setFocusedField(null)
      }, 300)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md bg-background rounded-lg shadow-2xl shadow-foreground/10 border border-border overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div>
                <h3 className="text-xl font-serif text-foreground">
                  Оставить заявку
                </h3>
                {productName && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {productName}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="px-6 py-12 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" size={24} className="text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-serif text-foreground">
                    Заявка отправлена
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-all duration-200"
                  >
                    Закрыть
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="px-6 pb-6 pt-4 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                    >
                      Имя
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "name" ? "bg-amber-50 scale-110" : "bg-secondary"}`}
                      >
                        <Icon
                          name="User"
                          size={16}
                          className={`transition-colors duration-300 ${focusedField === "name" ? "text-amber-600" : "text-muted-foreground/50"}`}
                        />
                      </div>
                      <input
                        id="modal-name"
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
                      htmlFor="modal-phone"
                      className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                    >
                      Телефон
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "phone" ? "bg-emerald-50 scale-110" : "bg-secondary"}`}
                      >
                        <Icon
                          name="Phone"
                          size={16}
                          className={`transition-colors duration-300 ${focusedField === "phone" ? "text-emerald-600" : "text-muted-foreground/50"}`}
                        />
                      </div>
                      <input
                        id="modal-phone"
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
                      htmlFor="modal-comment"
                      className="block text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2"
                    >
                      Комментарий
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute left-3.5 top-4 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${focusedField === "comment" ? "bg-sky-50 scale-110" : "bg-secondary"}`}
                      >
                        <Icon
                          name="MessageSquare"
                          size={16}
                          className={`transition-colors duration-300 ${focusedField === "comment" ? "text-sky-600" : "text-muted-foreground/50"}`}
                        />
                      </div>
                      <textarea
                        id="modal-comment"
                        rows={3}
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
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
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default RequestModal
