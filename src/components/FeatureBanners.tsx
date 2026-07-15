export default function FeatureBanners() {
  return (
    <section className="w-full bg-white px-0 md:px-2 py-2 overflow-hidden font-sans">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">

        {/* Panel 1: New Keyboard */}
        <div className="relative overflow-hidden aspect-[2/3] md:aspect-[3/2] group flex flex-col items-center md:items-end justify-start md:justify-center p-10 md:p-16 lg:p-24 text-center md:text-right">
          <img
            src="https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=1920"
            alt="New Keyboard"
            className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center md:items-end gap-3 md:gap-4 max-w-[340px] md:max-w-[420px]">
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-neutral-800 tracking-tight">
              New Keyboard
            </h2>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
              Bổ sung Numpad với bàn phím full size HyperOne Gen 3 Plus.
            </p>
            <a
              href="/products/ban-phim-khong-day-hyperone-gen-3-plus-kb1-g3-plus"
              className="mt-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-colors active:scale-95"
            >
              Mua ngay
            </a>
          </div>
        </div>

        {/* Panel 2: Build your setup */}
        <div className="relative overflow-hidden aspect-[2/3] md:aspect-[3/2] group flex flex-col items-center md:items-start justify-start md:justify-center p-10 md:p-16 lg:p-24 text-center md:text-left">
          <img
            src="https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=1920"
            alt="Build your setup"
            className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center md:items-start gap-3 md:gap-4 max-w-[340px] md:max-w-[420px]">
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-neutral-800 tracking-tight">
              Build your setup
            </h2>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
              Chọn bàn, ghế, arm màn hình và phụ kiện để tạo góc làm việc đúng gu của bạn.
            </p>
            <a
              href="/pages/desk-builder"
              className="mt-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold text-sm px-8 py-3.5 rounded-full transition-colors active:scale-95 shadow-sm"
            >
              Xem thêm
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
