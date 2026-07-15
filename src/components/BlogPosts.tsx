import { CaretRight, CalendarBlank } from "@phosphor-icons/react";

const posts = [
  {
    title: "HyperWork tại TechWorld 2026: Mang hệ sinh thái làm việc hiện đại đến gần hơn với người trẻ",
    link: "/blogs/fact-tips/hyperwork-techworld-2026",
    image: "https://hyperwork.vn/cdn/shop/articles/hyper-team-tai-tech-world-2026.jpg",
    excerpt: "HyperWork góp mặt tại TECHWORLD 2026 với khu vực trải nghiệm thực tế, nơi khách tham quan được khám phá hệ sinh thái làm việc hiện đại gồm bàn nâng hạ, ghế công thái học và các giải pháp nâng cao h...",
    date: "24 Thg 6, 2026"
  },
  {
    title: "HyperWork mang setup công thái học đến Colorful Campus Tour 2026",
    link: "/blogs/fact-tips/hyperwork-colorful-campus-tour-2026",
    image: "https://hyperwork.vn/cdn/shop/articles/kol-tan-mot-cu_82591ee1-63b5-47f2-b257-f7623d79aafa.jpg",
    excerpt: "Không gian setup công thái học thực tế, hàng trăm phần quà hấp dẫn và sự quan tâm lớn từ sinh viên đã giúp booth HyperWork trở thành một trong những điểm đến nổi bật tại Colorful Campus Tour 2026.",
    date: "20 Thg 6, 2026"
  },
  {
    title: "HyperWork ra mắt 4 mẫu giá treo tivi mới: Nên chọn TVF01, TVF02, TVF03 hay TVF04?",
    link: "/blogs/fact-tips/gia-treo-tv-gan-tuong-hyperwork-tvf01-tvf02-tvf03-tvf04",
    image: "https://hyperwork.vn/cdn/shop/articles/gia-treo-tv-gan-tuong-hyperwork.jpg",
    excerpt: "Giá treo TV nào phù hợp với TV của bạn? So sánh TVF01, TVF02, TVF03 và TVF04 từ HyperWork về kích thước hỗ trợ, tải trọng, khả năng xoay nghiêng và ứng dụng thực tế.",
    date: "20 Thg 6, 2026"
  }
];

export default function BlogPosts() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-10 font-sans">
      <div className="max-w-full mx-auto flex flex-col gap-6 md:gap-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-3xl md:text-4xl text-neutral-900 tracking-tight">
            Blog posts
          </h2>
          <a href="/blogs/fact-tips" className="group flex items-center gap-2 text-neutral-900 font-medium hover:text-neutral-600 transition-colors">
            <span className="relative">
              Xem thêm
            </span>
            <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-neutral-900 group-hover:text-neutral-900 transition-colors">
              <CaretRight weight="bold" className="w-3 h-3 text-neutral-500 group-hover:text-neutral-900" />
            </div>
          </a>
        </div>

        {/* Posts Grid / Scroll Area */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 pb-4">
          {posts.map((post, idx) => (
            <div key={idx} className="flex-none w-[85vw] sm:w-[350px] md:w-[calc(33.333%-16px)] snap-start group flex flex-col gap-4">
              <a href={post.link} className="block overflow-hidden rounded-lg aspect-[3/2]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 font-sans"
                  loading="lazy"
                />
              </a>
              <div className="flex flex-col gap-3 flex-grow">
                <a href={post.link} className="font-sans font-bold text-lg md:text-xl text-neutral-900 hover:text-neutral-600 transition-colors line-clamp-2">
                  {post.title}
                </a>
                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-2 flex items-center gap-2 text-neutral-400 text-sm">
                  <CalendarBlank className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
