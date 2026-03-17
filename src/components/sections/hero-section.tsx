import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Icon from "@/components/ui/icon"

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section
      ref={containerRef}
      className="relative h-[calc(100vh-84px)] w-full overflow-hidden"
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