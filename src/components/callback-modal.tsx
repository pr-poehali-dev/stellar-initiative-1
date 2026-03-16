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
            <div className="relative bg-gradient-to-r from-[#2e7d32] to-[#43a047] px-6 pt-6 pb-5">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon name="Phone" size={20} />
                </div>
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
                      Ваше имя <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/20 transition-all"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Icon name="Phone" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/20 transition-all"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!isValid || loading}
                    className="w-full py-3.5 rounded-xl bg-[#2e7d32] text-white font-semibold text-[15px] hover:bg-[#256b29] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-1"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Icon name="PhoneCall" size={18} />
                        Запросить обратный звонок
                      </>
                    )}
                  </button>

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
                  <div className="w-16 h-16 rounded-full bg-[#2e7d32]/10 flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={32} className="text-[#2e7d32]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Спасибо за Ваше обращение!
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    Мы с вами свяжемся в ближайшее время
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Закрыть
                  </button>
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