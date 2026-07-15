import { ShoppingCart } from "@phosphor-icons/react";

const products = [
  {
    id: "p1",
    title: "P1 Single",
    category: "Giá đỡ màn hình",
    price: "739.000₫",
    originalPrice: "829.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/PA02-1.jpg?v=1783495644&width=600",
    link: "/products/gia-do-man-hinh-p1-single-pa02",
    badge: "Sản phẩm mới"
  },
  {
    id: "p2",
    title: "HyperOne Gen 3 Plus",
    category: "Bàn phím không dây",
    price: "950.000₫",
    originalPrice: "1.099.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/10_b2942421-a51e-4d2e-bbf7-856f380a6dd0.jpg?v=1782961460&width=600",
    link: "/products/ban-phim-khong-day-hyperone-gen-3-plus-kb1-g3-plus",
    badge: "Sản phẩm mới"
  },
  {
    id: "p3",
    title: "TVF04",
    category: "Giá treo TV gắn tường",
    price: "799.000₫",
    originalPrice: "880.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/TVF04-6copy_086a34c8-2f9f-4cbc-bb17-4a3a61557380.jpg?v=1781758770&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/TVF04-5copy.jpg?v=1781688307&width=600",
    link: "/products/gia-treo-tivi-gan-tuong-hyperwork-tvf04",
    badge: "Sản phẩm mới"
  },
  {
    id: "p4",
    title: "TVF03",
    category: "Giá treo TV gắn tường",
    price: "439.000₫",
    originalPrice: "499.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/TVF04-6copy_f007041c-f465-446d-82f5-c997253ca020.jpg?v=1781758833&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/TVF03-3copy.jpg?v=1781684308&width=600",
    link: "/products/gia-treo-tivi-gan-tuong-hyperwork-tvf03",
    badge: "Sản phẩm mới"
  },
  {
    id: "p5",
    title: "TVF02",
    category: "Giá treo TV gắn tường",
    price: "339.000₫",
    originalPrice: "399.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/TVF02-2copy.jpg?v=1781680321&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/TVF02-3copy.jpg?v=1781680320&width=600",
    link: "/products/gia-treo-tivi-gan-tuong-hyperwork-tvf02",
    badge: "Sản phẩm mới"
  },
  {
    id: "p6",
    title: "TVF01",
    category: "Giá treo TV gắn tường",
    price: "199.000₫",
    originalPrice: "259.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/TVF01-2copy.jpg?v=1781663671&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/TVF01-4copy.jpg?v=1781663671&width=600",
    link: "/products/gia-treo-tivi-gan-tuong-hyperwork-tvf01",
    badge: "Sản phẩm mới"
  },
  {
    id: "p7",
    title: "Mặt bàn gỗ MFC - Bo góc",
    category: "Dành cho khung bàn HyperWork",
    price: "Từ 950.000₫",
    originalPrice: "990.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/2_copy_deb4a696-8204-4bd8-897c-9266933c4a56.jpg?v=1774006415&width=600",
    link: "/products/mat-ban-go-hyperwork-mfc",
    badge: ""
  },
  {
    id: "p8",
    title: "Mặt bàn gỗ MDF - Góc vuông",
    category: "Dành cho khung bàn HyperWork",
    price: "Từ 939.000₫",
    originalPrice: "979.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/2_copy_deb4a696-8204-4bd8-897c-9266933c4a56.jpg?v=1774006415&width=600",
    link: "/products/mat-ban-go-hyperwork-mdf",
    badge: ""
  },
  {
    id: "p9",
    title: "CM04",
    category: "Khay đi dây",
    price: "649.000₫",
    originalPrice: "690.000₫",
    image1: "https://hyperwork.vn/cdn/shop/files/TVF04-6copy_086a34c8-2f9f-4cbc-bb17-4a3a61557380.jpg?v=1781758770&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/TVF04-5copy.jpg?v=1781688307&width=600",
    link: "/products/khay-di-day-cm04",
    badge: ""
  },
  {
    id: "p10",
    title: "Atlas Elite",
    category: "Bàn nâng hạ HyperWork",
    price: "15.990.000₫",
    originalPrice: "",
    image1: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=600",
    image2: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=600",
    link: "/products/ban-nang-ha-atlas-elite",
    badge: "Miễn phí lắp đặt"
  }
];

export default function NewArrivals() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 sm:px-6 md:px-10 font-sans">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight">
            Mới lên kệ
          </h2>
          <a href="/collections/all" className="hidden md:flex items-center gap-2 text-neutral-900 font-medium hover:text-neutral-600 transition-colors group">
            <span>Xem tất cả</span>
            <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-neutral-900 transition-colors">
              <svg role="presentation" focusable="false" width="5" height="8" className="text-neutral-500 group-hover:text-neutral-900 transition-colors" viewBox="0 0 5 8">
                <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
              </svg>
            </div>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square bg-neutral-100 rounded-md overflow-hidden mb-4">
                <a href={product.link} className="block w-full h-full">
                  <img
                    src={product.image1}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={product.image2}
                    alt={`${product.title} hover`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </a>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#EE2724] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                    {product.badge}
                  </div>
                )}

                {/* Quick Add Button */}
                <button
                  className="absolute bottom-3 right-3 w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                  aria-label="+ Thêm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic
                  }}
                >
                  <ShoppingCart size={18} weight="bold" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 font-medium">
                  {product.category}
                </span>
                <a href={product.link} className="font-display font-bold text-base md:text-[15px] text-neutral-900 hover:text-neutral-600 transition-colors line-clamp-1">
                  {product.title}
                </a>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[15px] font-medium text-[#EE2724]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden">
          <a href="/collections/all" className="flex items-center justify-center w-full py-3 border border-neutral-200 rounded-full text-neutral-900 font-bold hover:bg-neutral-50 transition-colors">
            Xem tất cả
          </a>
        </div>
      </div>
    </section>
  );
}
