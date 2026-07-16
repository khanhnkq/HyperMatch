import { useRef, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const slides = [
  {
    id: 5,
    image: "https://hyperwork.vn/cdn/shop/files/594963097_1171542285183580_3994440484315189889_n.jpg?v=1769765615&width=2400",
    kicker: "AI Workspace Setup",
    heading: "Build Your Perfect Workspace",
    caption: "Trả lời vài câu hỏi đơn giản, AI sẽ phân tích và đề xuất setup workspace phù hợp nhất.",
    buttonText: "Bắt đầu ngay",
    buttonLink: "#",
  },
  {
    id: 1,
    image: "https://hyperwork.vn/cdn/shop/files/DSC08799_11zon.jpg?v=1760324549&width=2800",
    kicker: "Giải pháp tiết kiệm",
    heading: "Ngày hội Thanh lý",
    caption: "Áp dụng 1/6-30/6",
    buttonText: "Group Zalo",
    buttonLink: "https://zalo.me/g/d0liqrxvwhary43rfqlb",
  },
  {
    id: 2,
    image: "https://hyperwork.vn/cdn/shop/files/ctkm-25.6-home_copy_copy_c6cfac43-91fb-4245-b0bf-bde80e1a6ac0.jpg?v=1784084798&width=2800",
    kicker: "",
    heading: "",
    caption: "",
    buttonText: "Săn sale ngay!",
    buttonLink: "https://hyperwork.vn/pages/mid-month-sale-don-tron-trieu-15-16-7",
  },
  {
    id: 3,
    image: "https://hyperwork.vn/cdn/shop/files/DS02_-_Setups_-_s1_-_1_11zon.jpg?v=1764125309&width=2800",
    kicker: "Giải pháp văn phòng",
    heading: "cho Doanh nghiệp",
    caption: "Hệ sinh thái đồng bộ - bền bỉ - tiết kiệm.",
    buttonText: "Xem thêm",
    buttonLink: "#",
  },
  {
    id: 4,
    image: "https://hyperwork.vn/cdn/shop/files/74_03594_11zon_54604b3d-de7f-4649-9ad5-ffbbc9217547.jpg?v=1760323357&width=2800",
    kicker: "Kết nối với chúng tôi",
    heading: "Hợp tác Marketing",
    caption: "Cùng lan tỏa thông điệp, sản phẩm và dịch vụ HyperWork.",
    buttonText: "Xem thêm",
    buttonLink: "#",
  }
];

interface PromoBannersProps {
  onStartAdvisor?: () => void;
}

export default function PromoBanners({ onStartAdvisor }: PromoBannersProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // We use a slight timeout to ensure DOM layout is fully painted before calculating widths
    setTimeout(() => {
      if (container.children.length < slides.length * 3) return;
      const setWidth = (container.children[slides.length] as HTMLElement).offsetLeft - (container.children[0] as HTMLElement).offsetLeft;

      // Calculate offset to perfectly center the slide (25% on desktop, 17% on mobile)
      const offset = (container.clientWidth - (container.children[0] as HTMLElement).offsetWidth) / 2;
      container.scrollLeft = setWidth + offset + 4;
    }, 100);

    let intervalId: any;
    let isScrolling: any;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!container) return;
        const setWidth = (container.children[slides.length] as HTMLElement).offsetLeft - (container.children[0] as HTMLElement).offsetLeft;

        // Warp silently if near the right boundary
        if (container.scrollLeft > setWidth * 1.8) {
          container.scrollLeft -= setWidth;
        }

        // Wait a tick for DOM to update scrollLeft before smoothly animating
        setTimeout(() => {
          const slideW = (container.children[0] as HTMLElement).offsetWidth;
          // Add gap to slide width
          container.scrollBy({ left: slideW + 8, behavior: "smooth" });
        }, 20);
      }, 4000);
    };

    startAutoScroll();

    // Debounced boundary check to keep user safely in the middle set (Set 2) when they stop manual swiping
    const handleScroll = () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        if (container.children.length < slides.length * 3) return;
        const setWidth = (container.children[slides.length] as HTMLElement).offsetLeft - (container.children[0] as HTMLElement).offsetLeft;

        if (container.scrollLeft > setWidth * 1.8) {
          container.scrollLeft -= setWidth;
        } else if (container.scrollLeft < setWidth * 0.8) {
          container.scrollLeft += setWidth;
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll);

    // Pause auto-scroll on hover to allow user interaction
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoScroll();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      clearTimeout(isScrolling);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollLeftAction = () => {
    const container = carouselRef.current;
    if (!container) return;
    const setWidth = (container.children[slides.length] as HTMLElement).offsetLeft - (container.children[0] as HTMLElement).offsetLeft;

    if (container.scrollLeft < setWidth * 0.8) {
      container.scrollLeft += setWidth;
    }

    setTimeout(() => {
      const slideW = (container.children[0] as HTMLElement).offsetWidth;
      container.scrollBy({ left: -(slideW + 8), behavior: "smooth" });
    }, 20);
  };

  const scrollRightAction = () => {
    const container = carouselRef.current;
    if (!container) return;
    const setWidth = (container.children[slides.length] as HTMLElement).offsetLeft - (container.children[0] as HTMLElement).offsetLeft;

    if (container.scrollLeft > setWidth * 1.8) {
      container.scrollLeft -= setWidth;
    }

    setTimeout(() => {
      const slideW = (container.children[0] as HTMLElement).offsetWidth;
      container.scrollBy({ left: slideW + 8, behavior: "smooth" });
    }, 20);
  };

  return (
    <section className="w-full bg-white pt-1 pb-2 px-0 overflow-hidden relative group/carousel font-sans">
      {/* Navigation Arrows */}
      <button
        onClick={scrollLeftAction}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black p-3.5 rounded-full shadow-lg cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 border border-neutral-200 hidden md:block"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      <button
        onClick={scrollRightAction}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black p-3.5 rounded-full shadow-lg cursor-pointer opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 border border-neutral-200 hidden md:block"
      >
        <CaretRight size={20} weight="bold" />
      </button>

      {/* Carousel Container (Full-bleed horizontal scroll-snap) */}
      <div
        ref={carouselRef}
        className="flex gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory w-full"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Render exactly 3 sets for standard infinite seamless looping */}
        <CardSet onStartAdvisor={onStartAdvisor} />
        <CardSet onStartAdvisor={onStartAdvisor} />
        <CardSet onStartAdvisor={onStartAdvisor} />
      </div>
    </section>
  );
}

// Extracted CardSet component representing one full sequence of promotional cards
const CardSet = ({ onStartAdvisor }: { onStartAdvisor?: () => void }) => (
  <>
    {slides.map((slide, index) => (
      <div
        key={`${slide.id}-${index}`}
        className="relative flex-shrink-0 snap-center overflow-hidden w-[100vw] md:w-[calc(50vw-12px)] aspect-[2/3] md:aspect-[3/2] cursor-pointer group"
      >
        <img
          src={slide.image}
          alt={slide.heading || "Promo"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 text-white z-10 pointer-events-none">
          {slide.kicker && <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-1">{slide.kicker}</span>}
          {slide.heading && <h4 className="font-display font-black text-2xl md:text-3xl text-white mt-1 mb-2">{slide.heading}</h4>}
          {slide.caption && <span className="text-[12px] text-white/90 font-medium mb-3">{slide.caption}</span>}

          <div className="mt-1 pointer-events-auto w-fit">
            <a
              href={slide.buttonLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black hover:bg-neutral-200 text-xs font-bold px-8 py-3 rounded-full transition-colors duration-200 cursor-pointer shadow-md inline-block active:scale-98"
              onClick={(e) => {
                if (slide.id === 5 && onStartAdvisor) {
                  e.preventDefault();
                  onStartAdvisor();
                } else if (slide.buttonLink === "#") {
                  e.preventDefault();
                }
                e.stopPropagation();
              }}
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      </div>
    ))}
  </>
);
