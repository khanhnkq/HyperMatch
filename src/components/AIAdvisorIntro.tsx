import { motion } from "motion/react";

interface AIAdvisorIntroProps {
  onStartAdvisor: () => void;
}

export default function AIAdvisorIntro({ onStartAdvisor }: AIAdvisorIntroProps) {
  return (
    <section className="w-full bg-white pb-1 md:pb-1 px-0 md:px-2 font-sans">
      <div className="relative w-full overflow-hidden min-h-[560px] md:min-h-[620px] flex items-center group">
        {/* Background Image */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(max-width: 699px)"
            srcSet="https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=1200"
          />
          <img
            src="https://hyperwork.vn/cdn/shop/files/HPWT93781_11zon.jpg?v=1760322746&width=2800"
            alt="HyperWork Workspace Setup"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
          />
        </picture>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl px-6 sm:px-10 md:px-16 py-12 md:py-20 flex flex-col gap-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col gap-3"
          >
            <h2 className="font-sans font-black text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] leading-[1.08] tracking-tight text-white">
              Build Your
              <br />
              Perfect Workspace
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-md font-light">
              Trả lời vài câu hỏi đơn giản, AI sẽ phân tích và đề xuất setup workspace phù hợp nhất dựa trên nhu cầu làm việc, phong cách và ngân sách của bạn.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap gap-3 mt-2"
          >
            <button
              onClick={onStartAdvisor}
              className="bg-white text-black hover:bg-neutral-200 text-sm font-bold px-8 py-3 rounded-full transition-colors duration-200 cursor-pointer shadow-md inline-block active:scale-98"
            >
              <span>Bắt đầu tư vấn</span>
            </button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
