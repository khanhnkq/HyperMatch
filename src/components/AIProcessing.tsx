import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";

function CarouselCard({ prod, index, x, viewportWidth }: { prod: any, index: number, x: any, viewportWidth: number }) {
  // Center of the current card relative to the start of the track (x=0)
  const cardCenter = index * 304 + 152;

  // Transform x to distance from center of screen
  const distance = useTransform(x, (latestX: number) => {
    // The physical absolute position of the card's center on screen is `latestX + cardCenter`
    return Math.abs((viewportWidth / 2) - (latestX + cardCenter));
  });

  // Calculate dynamic scale, opacity and box-shadow based on distance
  const scale = useTransform(distance, [0, 304], [1.15, 0.85], { clamp: true });
  const opacity = useTransform(distance, [0, 304], [1.0, 0.35], { clamp: true });
  const boxShadow = useTransform(
    distance,
    [0, 150, 304],
    [
      "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
      "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.025)",
      "0 1px 2px 0 rgba(0,0,0,0.05)"
    ],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ scale, opacity, boxShadow }}
      className="w-72 h-[380px] rounded-[16px] overflow-hidden flex flex-col justify-end p-6 cursor-pointer relative shrink-0 bg-white"
    >
      <img
        src={prod.image}
        alt={prod.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full flex justify-between items-end gap-2">
        <div className="flex flex-col gap-0.5 text-left">
          <h4 className="font-sans font-bold text-[16px] md:text-[18px] text-neutral-900 group-hover:text-black transition-colors leading-tight">
            {prod.name}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

interface AIProcessingProps {
  onFinished: () => void;
}

const THINKING_STEPS = [
  "Khởi động hệ thống phân tích AI...",
  "Đang quét dữ liệu công thái học & thói quen...",
  "Đang chạy thuật toán sàng lọc sản phẩm...",
  "Đang lọc cấu hình tối ưu và tương thích...",
  "Đang tính toán điểm không gian hiệu quả...",
  "Đang chốt thiết lập setup tối ưu nhất...",
];

const CAROUSEL_PRODUCTS = [
  {
    id: "p1",
    name: "Arm P1 Single",
    category: "Giá đỡ màn hình",
    image: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=600",
    price: "739.000₫"
  },
  {
    id: "p2",
    name: "HyperOne Gen 3 Plus",
    category: "Bàn phím không dây",
    image: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=600",
    price: "950.000₫"
  },
  {
    id: "p3",
    name: "Giá treo TV TVF04",
    category: "Giá treo màn hình",
    image: "https://hyperwork.vn/cdn/shop/files/TVF04-6copy_086a34c8-2f9f-4cbc-bb17-4a3a61557380.jpg?v=1781758770&width=600",
    price: "799.000₫"
  },
  {
    id: "p4",
    name: "Ghế Sleek Ergonomic",
    category: "Ghế công thái học",
    image: "https://hyperwork.vn/cdn/shop/files/Setup1-PG02-2_11zon_1.jpg",
    price: "4.590.000₫"
  }
];

const cardWidth = 304; // 288px width + 16px gap

export default function AIProcessing({ onFinished }: AIProcessingProps) {
  const [isExpanding, setIsExpanding] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion Values for high-performance animation
  const x = useMotionValue(0);

  // Generate a long list of cards (repeat the base list 6 times) for infinite feel
  const LOOPING_CARDS = Array.from({ length: 24 }, (_, i) => {
    const product = CAROUSEL_PRODUCTS[i % CAROUSEL_PRODUCTS.length];
    return {
      ...product,
      uniqueId: `${product.id}-${i}`
    };
  });

  useEffect(() => {
    // Measure viewport width
    if (containerRef.current) {
      setViewportWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);

    // Continuous gentle sliding marquee in Framer Motion (1 loop = 4 cards)
    const loopWidth = cardWidth * CAROUSEL_PRODUCTS.length; // 304 * 4 = 1216
    const xAnim = animate(x, -loopWidth, {
      duration: 12, // 12 seconds per loop = very smooth and gentle
      ease: "linear",
      repeat: Infinity,
    });

    let step = 0;
    // Dynamic step increments (takes ~6 seconds total)
    const interval = setInterval(() => {
      if (step < THINKING_STEPS.length - 1) {
        step++;
      } else {
        clearInterval(interval);

        // Stop continuous marquee
        xAnim.stop();

        // Calculate current track X and find nearest Ghế index (i % 4 === 3)
        const currentX = x.get();
        let targetX = 0;
        let minDistance = Infinity;

        for (let i = 3; i < 24; i += 4) {
          const cardCenter = i * 304 + 152;
          const x_center = viewportWidth / 2 - cardCenter;
          const dist = Math.abs(currentX - x_center);
          if (dist < minDistance) {
            minDistance = dist;
            targetX = x_center;
          }
        }

        // Smoothly snap the closest Ghế card to the center
        animate(x, targetX, {
          type: "spring",
          stiffness: 180,
          damping: 20,
          onComplete: () => {
            // Wait 150ms for snapping animation to fully settle, then expand
            setTimeout(() => {
              setIsExpanding(true);
              setTimeout(() => {
                onFinished();
              }, 1100);
            }, 150);
          }
        });
      }
    }, 600);

    return () => {
      xAnim.stop();
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);


  return (
    <div className="w-full min-h-[100dvh] bg-[#f5f5f7] flex items-center justify-center relative overflow-hidden font-sans select-none">
      {/* Ambient soft gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-neutral-900/[0.02] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.01] blur-[100px]" />
      </div>

      <AnimatePresence>
        {!isExpanding ? (
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 flex flex-col items-center justify-between min-h-[100dvh] py-12 md:py-16 w-full"
          >
            {/* Top: Header */}
            <div className="flex flex-col items-center gap-3 text-center w-full max-w-5xl px-6">
              <motion.img
                src="https://hyperwork.vn/cdn/shop/files/logo1.svg"
                alt="HyperWork"
                className="h-7 object-contain opacity-80"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.6 }}
              />
              <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight text-neutral-900 mt-3">
                AI Workspace Advisor
              </h3>
              <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                Đang tìm kiếm thiết bị phù hợp nhất...
              </p>
            </div>

            {/* Middle: Horizontal Carousel gentle rolling */}
            <div
              ref={containerRef}
              className="w-full overflow-hidden py-32 relative flex justify-start items-center animate-pulse-slow"
            >
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f5f5f7] via-[#f5f5f7]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f5f5f7] via-[#f5f5f7]/80 to-transparent z-10 pointer-events-none" />

              {/* Roller Track */}
              <motion.div
                style={{ x }}
                className="flex gap-4"
              >
                {LOOPING_CARDS.map((prod, index) => (
                  <CarouselCard
                    key={prod.uniqueId}
                    prod={prod}
                    index={index}
                    x={x}
                    viewportWidth={viewportWidth}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Card Expand Transition Phase */
          <motion.div
            key="expand-screen"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f5f5f7]"
          >
            {/* The expanding card container */}
            <motion.div
              initial={{
                width: 331.2, // card width 288px * scale 1.15
                height: 437, // card height 380px * scale 1.15
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
              }}
              animate={{
                width: "100%",
                height: "100%",
                borderRadius: 0,
                borderWidth: 0,
                backgroundColor: "rgba(255,255,255,1)",
                boxShadow: "none",
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center justify-center p-8 relative overflow-hidden"
            >
              {/* Expanding card elements that fade out */}
              <motion.div
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none"
              >
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                    Đã chọn cấu hình
                  </span>
                  <h4 className="text-lg font-bold text-neutral-800 mt-1">
                    Ghế Sleek Ergonomic
                  </h4>
                </div>
                <img
                  src="https://hyperwork.vn/cdn/shop/files/Setup1-PG02-2_11zon_1.jpg"
                  alt="Ergonomic Setup"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-xs font-mono text-neutral-500 font-bold">Mở khóa thành công</span>
                </div>
              </motion.div>

              {/* New screen elements that fade in as card finishes expanding */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-6 z-10"
              >
                <img
                  src="https://hyperwork.vn/cdn/shop/files/logo1.svg"
                  alt="HyperWork"
                  className="h-8 object-contain"
                />

                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-neutral-900">
                    Workspace đã sẵn sàng!
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm font-medium tracking-wide">
                    Đang thiết lập layout chi tiết cho không gian của bạn...
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
