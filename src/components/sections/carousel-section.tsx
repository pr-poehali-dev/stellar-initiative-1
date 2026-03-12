import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const marqueeText = "ОБЛИЦОВОЧНЫЙ КИРПИЧ \u2022 ФАСАДНЫЕ РЕШЕНИЯ \u2022 ПРЕМИУМ КАЧЕСТВО \u2022 С 2003 ГОДА \u2022 "

export function CarouselSection() {
  const repeatedText = marqueeText.repeat(6)

  return (
    <section className="relative bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-background/40 font-medium">
            Видео
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.15] text-background max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Кирпич, который
          <br />
          <em className="italic text-background/70">создаёт характер</em>
        </motion.h2>

        {/* Video placeholder */}
        <motion.div
          className="mt-14 md:mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-background/10 bg-gradient-to-br from-background/[0.06] via-background/[0.03] to-transparent">
            {/* Inner subtle gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/[0.04] to-transparent" />

            {/* Play button and text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              {/* Play circle */}
              <motion.button
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-background/30 flex items-center justify-center group"
                whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-background/15"
                  animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <Icon
                  name="Play"
                  size={28}
                  className="text-background/80 ml-1 group-hover:text-background transition-colors duration-300"
                />
              </motion.button>

              <p className="text-background/40 text-xs md:text-sm tracking-[0.2em] uppercase">
                Видео о производстве и объектах
              </p>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-t border-l border-background/15" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-b border-r border-background/15" />
          </div>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="relative py-10 md:py-14 border-t border-background/10">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="text-3xl md:text-5xl lg:text-6xl font-serif text-background/10 tracking-wide">
            {repeatedText}
          </span>
          <span className="text-3xl md:text-5xl lg:text-6xl font-serif text-background/10 tracking-wide">
            {repeatedText}
          </span>
        </motion.div>
      </div>
    </section>
  )
}