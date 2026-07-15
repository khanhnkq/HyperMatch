import { motion } from "motion/react";

const categories = [
  {
    title: "Nội thất văn phòng",
    link: "/collections/noi-that-van-phong",
    image: "https://hyperwork.vn/cdn/shop/files/Capture_One_Catalog05971_11zon.svg",
  },
  {
    title: "Phụ kiện bàn làm việc",
    link: "/collections/phu-kien-ban-lam-viec",
    image: "https://hyperwork.vn/cdn/shop/files/Setup1-PG02-2_11zon_1.jpg",
  },
  {
    title: "Thiết bị công nghệ",
    link: "/collections/thiet-bi-cong-nghe",
    image: "https://hyperwork.vn/cdn/shop/files/BBB_11zon.svg",
  },
  {
    title: "Phong cách sống & di động",
    link: "/collections/phong-cach-song-va-di-dong",
    image: "https://hyperwork.vn/cdn/shop/files/Capture_Ones_sCastalog0065_11zon.jpg",
  }
];

export default function ProductCategories() {
  return (
    <section className="w-full bg-white pt-16 pb-8 px-4 sm:px-6 md:px-10 font-sans">
      <div className="max-w-full mx-auto flex flex-col gap-6 md:gap-8">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="font-sans font-semibold text-[14px] md:text-[16px] text-neutral-500 uppercase tracking-wide">
            Chúng tôi có gì?
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight">
            Danh mục sản phẩm
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.a
              href={cat.link}
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#f5f5f7] rounded-[16px] overflow-hidden flex flex-col justify-end p-6 aspect-[3/4] cursor-pointer group relative block shadow-sm hover:shadow-md"
            >
              {/* Full Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Text Layer */}
              <div className="relative z-10 w-full flex justify-between items-end gap-2">
                <h3 className="font-sans font-bold text-[16px] md:text-[18px] text-neutral-900 group-hover:text-black transition-colors leading-tight">
                  {cat.title}
                </h3>
                <div className="text-neutral-900 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center group-hover:text-white group-hover:bg-neutral-900 transition-colors duration-300">
                  <svg role="presentation" focusable="false" width="28" height="28" className="icon icon-circle-button-right-clipped" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12ZM10.47 9.53 12.94 12l-2.47 2.47 1.06 1.06 3-3 .53-.53-.53-.53-3-3-1.06 1.06Z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
