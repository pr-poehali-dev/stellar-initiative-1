import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import Icon from "@/components/ui/icon"

interface CallbackModalProps {
  open: boolean
  onClose: () => void
}

export function CallbackModal({ open, onClose }: CallbackModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isValid = name.trim().length >= 2 && phone.trim().length >= 6

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 1) return digits.length ? `+${digits}` : ""
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`
    if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    if (raw === "") {
      setPhone("")
      return
    }
    let digits = raw.replace(/\D/g, "")
    if (digits.length > 11) digits = digits.slice(0, 11)
    if (!digits.startsWith("7") && !digits.startsWith("8") && digits.length === 0) {
      digits = "7" + digits
    }
    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1)
    }
    setPhone(formatPhone(digits))
  }

  function fireConfetti() {
    const duration = 2000
    const end = Date.now() + duration
    const colors = ["#e67e22", "#2e7d32", "#f39c12", "#27ae60", "#8B5E3C"]

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || loading) return
    setError("")
    setLoading(true)

    try {
      const res = await fetch(
        (await import("@/../backend/func2url.json")).default["send-callback"],
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
        }
      )
      if (!res.ok) throw new Error("Ошибка отправки")
      setSent(true)
      fireConfetti()
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setName("")
      setPhone("")
      setSent(false)
      setError("")
      setFocusedField(null)
    }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            <div className="relative bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 px-6 pt-6 pb-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <Icon name="X" size={18} />
              </button>
              <div className="relative flex items-center gap-3 mb-1">
                <motion.div
                  className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10"
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Icon name="Phone" size={22} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white text-lg font-bold">Заказать звонок</h3>
                  <p className="text-white/80 text-sm">Перезвоним в течение 15 минут</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!sent ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Ваше имя <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${focusedField === "name" ? "bg-amber-50 scale-110" : "bg-gray-50"}`}>
                        <Icon name="User" size={16} className={`transition-colors duration-300 ${focusedField === "name" ? "text-amber-600" : "text-gray-400"}`} />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Введите ваше имя"
                        className="w-full pl-13 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/15 focus:bg-white transition-all duration-300"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Телефон <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${focusedField === "phone" ? "bg-emerald-50 scale-110" : "bg-gray-50"}`}>
                        <Icon name="Phone" size={16} className={`transition-colors duration-300 ${focusedField === "phone" ? "text-emerald-600" : "text-gray-400"}`} />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full pl-13 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/15 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-3"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={!isValid || loading}
                    className="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white font-semibold text-[15px] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/25 flex items-center justify-center gap-2 mt-1"
                    whileHover={{ scale: isValid ? 1.01 : 1 }}
                    whileTap={{ scale: isValid ? 0.98 : 1 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {loading ? (
                      <div className="relative w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span className="relative flex items-center gap-2">
                        <Icon name="PhoneCall" size={18} />
                        Запросить обратный звонок
                      </span>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              ) : (
                <motion.div
                  className="flex flex-col items-center text-center py-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/15"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                  >
                    <Icon name="CheckCircle" size={32} className="text-emerald-600" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Спасибо за Ваше обращение!
                  </h4>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                    Мы перезвоним вам в&nbsp;ближайшее время.
                  </p>
                  <motion.button
                    onClick={handleClose}
                    className="group px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Закрыть
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CallbackModal
