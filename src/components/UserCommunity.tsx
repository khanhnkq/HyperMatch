import { motion } from "motion/react";

export default function UserCommunity() {
  const buttons = [
    { name: "Fanpage", href: "https://www.facebook.com/HyperWorkVN" },
    { name: "Group", href: "https://www.facebook.com/groups/645385320265568" },
    { name: "Tiktok", href: "https://www.tiktok.com/@hyperworkvn" },
    { name: "Zalo OA", href: "https://zalo.me/683310998609151897" },
  ];

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 md:px-10 font-sans">
      <div className="max-w-full mx-auto relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] min-h-[480px] sm:min-h-[500px] flex items-center shadow-lg group">
        {/* Background Image / Picture */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(max-width: 699px)"
            srcSet="https://hyperwork.vn/cdn/shop/files/CleanShost_2025-10-11_at_16.30.25_2x_5867399d-6b8d-419f-9e3c-d42304858be3.jpg?v=1760178001&width=1200"
          />
          <img
            src="https://hyperwork.vn/cdn/shop/files/group.svg?v=1760175074&width=3796"
            alt="Cộng đồng người dùng HyperWork"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
        </picture>

        {/* Ambient Dark/Gradient Overlay for superior text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent sm:from-black/75 sm:via-black/35 sm:to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 max-w-xl md:max-w-2xl px-6 sm:px-12 md:px-16 flex flex-col gap-4 sm:gap-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Cộng đồng người dùng
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              Đây là các kênh sóng, nơi bạn có thể cập nhật thông tin mới nhất về sản phẩm, dịch vụ và thương hiệu HyperWork. Đừng quên kết nối với những người cùng đam mê, chia sẻ về sản phẩm, góc setup và mẹo tối ưu không gian làm việc. Tham gia và cùng tạo nên một cộng đồng ý nghĩa và lớn mạnh hơn nhé!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-2"
          >
            {buttons.map((btn) => (
              <a
                key={btn.name}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white border-[2px] rounded-full font-bold text-sm tracking-wide bg-transparent shadow-sm text-center min-w-[110px]"
              >
                {btn.name}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
