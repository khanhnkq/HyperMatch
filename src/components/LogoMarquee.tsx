import React from "react";

const logos = [
  "https://hyperwork.vn/cdn/shop/files/LOGO_TIN_PHONG_122020-01_2b247acc-0245-49c5-9911-89a6e444c597.png?height=60&v=1767689940",
  "https://hyperwork.vn/cdn/shop/files/logo_-_mygear.svg?height=60&v=1760172045",
  "https://hyperwork.vn/cdn/shop/files/Logo_-_Phongvu.svg?height=60&v=1760171985",
  "https://hyperwork.vn/cdn/shop/files/Cellphones.svg?height=60&v=1757754587",
  "https://hyperwork.vn/cdn/shop/files/logo_-_tgdd.svg?height=60&v=1760172270",
  "https://hyperwork.vn/cdn/shop/files/Asset_1_878c5673-8259-4576-b501-ae6f799a1d3c.svg?height=60&v=1763625564",
  "https://hyperwork.vn/cdn/shop/files/logo_-_hacom.svg?height=60&v=1760172614",
  "https://hyperwork.vn/cdn/shop/files/logo_-_fptshop.svg?height=60&v=1760172766",
  "https://hyperwork.vn/cdn/shop/files/logo_-_nguyenvu_fdebba6a-0880-40ff-8c92-3f242a63d141.svg?height=60&v=1760173200"
];

export default function LogoMarquee() {
  return (
    <section className="w-full bg-white py-16 overflow-hidden ">
      <div className="w-full px-4 sm:px-6 md:px-10 mb-8 md:mb-12 flex flex-col gap-1">
        <span className="font-sans font-semibold text-[14px] md:text-[16px] text-neutral-500 tracking-wide">Đồng hành cùng hơn 100 chuỗi bán lẻ/cửa hàng</span>
        <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight">Cộng sức để vươn xa</h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-16 md:gap-24 items-center whitespace-nowrap px-8 md:px-12 group-hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((src, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-[50px] md:h-[60px] grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <img
                src={src}
                alt="Partner Logo"
                className="h-full w-auto object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          /* 18s is a good speed, adjust if needed */
          animation: marquee 25s linear infinite;
          width: max-content; /* ensure it fits all items before shrinking */
        }
      `}</style>
    </section>
  );
}
