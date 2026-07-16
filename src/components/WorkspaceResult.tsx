import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle,
  ShieldCheck,
  CreditCard
} from "@phosphor-icons/react";

interface OnboardingData {
  role: string;
  hours: number;
  problems: string[];
  budget: number;
  style: string;
  color: string;
  equipment: string[];
  photo: File | null;
}

interface WorkspaceResultProps {
  data: OnboardingData;
  onRestart: () => void;
}

interface SetupSuggestion {
  id: string;
  image: string;
  title: string;
  style: "Minimalist" | "Ergonomic" | "Creator" | "Cozy";
  color: "Walnut" | "White" | "Black";
  price: number;
  description: string;
  products: string[];
  aspectRatio: string; // for Pinterest variance
}

const SETUP_SUGGESTIONS: SetupSuggestion[] = [
  {
    id: "s1",
    image: "https://hyperwork.vn/cdn/shop/files/Setup_Tet_2026_-_5_11zon.jpg?v=1770620641&width=720",
    title: "Minimalist White Studio",
    style: "Minimalist",
    color: "White",
    price: 6900000,
    description: "Không gian làm việc tông màu trắng tối giản kiểu Bắc Âu, tràn ngập ánh sáng tự nhiên với các thiết bị ẩn cáp gọn gàng.",
    products: ["Bàn phím không dây HyperOne Gen 3", "Arm màn hình Single T6 Pro", "Lót chuột da HyperWork", "Khay đi dây ẩn dưới bàn"],
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "s2",
    image: "https://hyperwork.vn/cdn/shop/files/593454481_1171545718516570_984208308408370112_n.jpg?v=1767493515&width=720",
    title: "Developer Dark Terminal",
    style: "Minimalist",
    color: "Black",
    price: 8500000,
    description: "Góc làm việc cực ngầu với màn hình ultrawide lớn cho lập trình viên ưa thích chế độ tối, giúp tăng độ tập trung cao độ.",
    products: ["Arm màn hình P1 Single Black", "Bàn nâng hạ thông minh màu đen", "Giá đỡ laptop", "Lót chuột nỉ tối màu"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "s3",
    image: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_02s47_11zon.jpg?v=1767460861&width=720",
    title: "Ergonomic Walnut Suite",
    style: "Ergonomic",
    color: "Walnut",
    price: 14500000,
    description: "Cấu hình bàn gỗ Walnut ấm áp kết hợp ghế ngồi công thái học toàn diện bảo vệ cột sống cho người ngồi làm việc lâu.",
    products: ["Ghế Sleek Ergonomic", "Bàn nâng hạ gỗ tự nhiên Walnut", "Đèn treo màn hình chống lóa", "Kệ màn hình gỗ sồi"],
    aspectRatio: "aspect-[3/2]"
  },
  {
    id: "s4",
    image: "https://hyperwork.vn/cdn/shop/files/DS02_-_Setups_-_s1_-_1_11zon.jpg?v=1764125309&width=720",
    title: "Dual-Screen Productive Desk",
    style: "Ergonomic",
    color: "Walnut",
    price: 11200000,
    description: "Tối ưu hóa không gian hiển thị bằng 2 màn hình xoay ngang dọc đa nhiệm cực kỳ mượt mà trên mặt bàn gỗ sồi tự nhiên.",
    products: ["Arm màn hình kép P1 Dual", "Ghế công thái học HyperWork", "Kệ màn hình đôi", "Bộ dụng cụ vệ sinh deskmat"],
    aspectRatio: "aspect-[4/3]"
  },
  {
    id: "s5",
    image: "https://hyperwork.vn/cdn/shop/files/999.jpg?v=1763115139&width=720",
    title: "Cozy Keeb Custom Corner",
    style: "Cozy",
    color: "Walnut",
    price: 4200000,
    description: "Góc setup ấm cúng cho người đam mê phím cơ custom cao cấp, mang lại cảm hứng sáng tạo dịu nhẹ.",
    products: ["Bàn phím cơ HyperWork Silent", "Đèn bàn gỗ HyperWork", "Thảm di chuột nỉ", "Kệ phím acrylic"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "s6",
    image: "https://hyperwork.vn/cdn/shop/files/DP03_-_12s_11zon.jpg?v=1760163088&width=720",
    title: "Mechanical Design Station",
    style: "Creator",
    color: "Black",
    price: 5900000,
    description: "Trang bị bàn phím cơ kết nối nhanh đa thiết bị giúp designer chuyển đổi liền mạch giữa laptop và PC vẽ.",
    products: ["Bàn phím cơ HyperOne", "Đế sạc nhanh 100W", "Arm màn hình P1 Single"],
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "s7",
    image: "https://hyperwork.vn/cdn/shop/files/DSC06746_11zon.jpg?v=1769762780&width=720",
    title: "Creator Dual Workspace",
    style: "Creator",
    color: "Black",
    price: 15800000,
    description: "Cấu hình chuyên nghiệp đa màn hình đáp ứng hoàn hảo nhu cầu dựng phim, chỉnh ảnh và live stream mượt mà.",
    products: ["Arm màn hình kép P1 Dual", "Bàn nâng hạ thông minh", "Ghế Sleek Ergonomic Black"],
    aspectRatio: "aspect-[1/1]"
  },
  {
    id: "s8",
    image: "https://hyperwork.vn/cdn/shop/files/DSC00112_11zon.jpg?v=1769756662&width=720",
    title: "Minimal Laptop Stand Desk",
    style: "Minimalist",
    color: "White",
    price: 2500000,
    description: "Góc làm việc di động tinh gọn, tập trung nâng cao vị trí màn hình laptop ngang tầm mắt để bảo vệ đốt sống cổ.",
    products: ["Giá đỡ laptop nhôm nguyên khối", "Chuột yên lặng Silent Mouse", "Kệ mini để bàn"],
    aspectRatio: "aspect-[4/3]"
  },
  {
    id: "s9",
    image: "https://hyperwork.vn/cdn/shop/files/Human_Motion_T6_Pro_1_of_25__11zon.jpg?v=1769763257&width=720",
    title: "Ergonomic Focus Station",
    style: "Ergonomic",
    color: "Black",
    price: 7800000,
    description: "Đỉnh cao của sự tập trung với hệ thống đỡ màn hình chuyển động linh hoạt và ghế công thái học.",
    products: ["Ghế Sleek Ergonomic", "Arm màn hình T6 Pro Black", "Đèn treo màn hình chống lóa"],
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "s10",
    image: "https://hyperwork.vn/cdn/shop/files/Setup_PG02_-_7_11zon.jpg?v=1772006737&width=720",
    title: "Cozy Pegboard Green Room",
    style: "Cozy",
    color: "Walnut",
    price: 4900000,
    description: "Góc làm việc xanh mát kết hợp tấm pegboard kim loại treo đồ trang trí và tối ưu hóa diện tích mặt bàn.",
    products: ["Pegboard gỗ tự nhiên", "Đèn bàn decor", "Arm màn hình Single P1"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "s11",
    image: "https://hyperwork.vn/cdn/shop/files/MA03_-_4_11zon.jpg?v=1772008003&width=720",
    title: "Monochrome Matte Workspace",
    style: "Minimalist",
    color: "Black",
    price: 8200000,
    description: "Sự kết hợp hoàn hảo giữa tông đen lì sang trọng và chất liệu da của deskmat cao cấp.",
    products: ["Thảm da deskmat HyperWork", "Chuột Silent", "Bàn nâng hạ thông minh màu đen"],
    aspectRatio: "aspect-[3/2]"
  },
  {
    id: "s12",
    image: "https://hyperwork.vn/cdn/shop/files/DSC00717_11zon.jpg?v=1772008928&width=720",
    title: "Pocket Minimalist Setup",
    style: "Minimalist",
    color: "White",
    price: 3600000,
    description: "Thiết kế cực kỳ tinh gọn cho căn hộ diện tích nhỏ, tối đa hóa không gian trống cho mặt bàn.",
    products: ["Bàn phím cơ HyperWork Silent White", "Đế sạc nhanh không dây", "Dock đứng laptop"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "s13",
    image: "https://hyperwork.vn/cdn/shop/files/2025-05-06_11-09-11_B_R8_S4__11zon_54847077-3e8e-413a-8536-e0d2141b0af7.jpg?v=1772007734&width=720",
    title: "Professional Vesa Workspace",
    style: "Ergonomic",
    color: "Black",
    price: 9900000,
    description: "Không gian làm việc năng suất cao với màn hình treo lơ lửng, giải phóng toàn bộ không gian bên dưới.",
    products: ["Arm màn hình kép P1 Dual Black", "Đèn treo màn hình", "Ghế Sleek Ergonomic"],
    aspectRatio: "aspect-[4/3]"
  },
  {
    id: "s14",
    image: "https://hyperwork.vn/cdn/shop/files/635157572_2836550153359461_8391164397209442871_n.jpg?v=1772009483&width=720",
    title: "Creative Warm Oak Desk",
    style: "Creator",
    color: "Walnut",
    price: 11500000,
    description: "Sử dụng tông gỗ ấm áp phối cùng ánh sáng vàng dịu giúp giảm căng thẳng đầu óc khi làm việc sáng tạo.",
    products: ["Bàn nâng hạ gỗ tự nhiên", "Arm màn hình P1", "Đèn bàn gỗ decor"],
    aspectRatio: "aspect-[3/4]"
  },
  {
    id: "s15",
    image: "https://hyperwork.vn/cdn/shop/files/622096201_1212275034443638_7158627852507820970_n.jpg?v=1772009663&width=720",
    title: "Developer Dark Lab",
    style: "Creator",
    color: "Black",
    price: 9200000,
    description: "Không gian lập trình đêm khuya với tông màu tối huyền bí và đèn hắt nền chống mỏi mắt.",
    products: ["Arm màn hình P1 Single Black", "Bàn nâng hạ màu đen", "Bàn phím cơ Silent"],
    aspectRatio: "aspect-[1/1]"
  },
  {
    id: "s16",
    image: "https://hyperwork.vn/cdn/shop/files/627257176_1217176723953469_5190057105287826845_n.jpg?v=1772009787&width=720",
    title: "Minimal White Pegboard Setup",
    style: "Minimalist",
    color: "White",
    price: 4100000,
    description: "Góc setup trắng ngọc tinh khôi kết hợp bảng pegboard treo phụ kiện trang trí gọn gàng ngăn nắp.",
    products: ["Pegboard HyperWork White", "Khay đi dây thông minh", "Giá đỡ laptop nhôm"],
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "s17",
    image: "https://hyperwork.vn/cdn/shop/files/615384160_1202335142104294_3781823295888435848_n.jpg?v=1772012213&width=720",
    title: "Cozy Study Desk Setup",
    style: "Cozy",
    color: "Walnut",
    price: 3200000,
    description: "Góc học tập và làm việc nhẹ nhàng, phối trộn hài hòa giữa gỗ tự nhiên và cây xanh mát mắt.",
    products: ["Bàn phím không dây HyperOne", "Chuột Silent", "Đèn bàn gỗ decor"],
    aspectRatio: "aspect-[3/4]"
  }
];

export default function WorkspaceResult({ data, onRestart }: WorkspaceResultProps) {
  const [activeSetup, setActiveSetup] = useState<SetupSuggestion | null>(null);

  // Calculate recommendation score for each setup based on onboarding data
  const scoredSuggestions = useMemo(() => {
    return SETUP_SUGGESTIONS.map((setup) => {
      let score = 0;

      // 1. Style Match (Max 40 points)
      // Map user style selection to suggestion style
      // user style options: "Minimal" | "Modern" | "Dark" | "Wooden"
      let styleMapped: string = setup.style;
      if (data.style === "Minimal") styleMapped = "Minimalist";
      else if (data.style === "Wooden") styleMapped = "Cozy";
      else if (data.style === "Dark") styleMapped = "Creator";
      else if (data.style === "Modern") styleMapped = "Ergonomic";

      if (setup.style === styleMapped) {
        score += 40;
      } else {
        // partial match
        score += 15;
      }

      // 2. Color Match (Max 35 points)
      // user color options: "Walnut" | "White" | "Black"
      if (setup.color === data.color) {
        score += 35;
      } else {
        score += 10;
      }

      // 3. Budget Match (Max 25 points)
      // user budget in Millions VND (e.g. 15 = 15,000,000)
      const budgetVND = data.budget * 1000000;
      if (setup.price <= budgetVND) {
        // fits budget perfectly
        score += 25;
      } else if (setup.price <= budgetVND * 1.25) {
        // slightly over budget
        score += 15;
      } else {
        // way over budget
        score += 5;
      }

      return {
        ...setup,
        matchScore: score
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [data]);

  // Top 3 matches
  const topMatches = useMemo(() => scoredSuggestions.slice(0, 3), [scoredSuggestions]);
  // Other matches
  const remainingMatches = useMemo(() => scoredSuggestions.slice(3), [scoredSuggestions]);

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 py-20 px-6 md:px-12 font-sans select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* HEADER BLOCK (BORDERLESS) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-0">
          <div className="flex flex-col gap-3">

            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-neutral-900 leading-tight">
              Góc Setup gợi ý cho bạn
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-2xl font-light">
              Dựa trên hồ sơ của một <span className="text-neutral-900 font-semibold">{data.role}</span> làm việc <span className="text-neutral-900 font-semibold">{data.hours}h mỗi ngày</span>, phối hợp phong cách <span className="text-neutral-900 font-semibold">{data.style}</span> và sắc thái <span className="text-neutral-900 font-semibold">{data.color}</span>.
            </p>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-8 py-4 rounded-full transition-all active:scale-95 shadow-md self-start md:self-auto cursor-pointer"
          >
            <span>Làm lại khảo sát</span>
          </button>
        </div>

        {/* TOP RECOMMENDED GRID BLOCK (Pinterest grid style but focused) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">

            <h3 className="text-lg font-black text-neutral-900 uppercase tracking-wider">
              Lựa chọn phù hợp nhất
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topMatches.map((setup, idx) => (
              <motion.div
                key={setup.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end aspect-[4/5] cursor-pointer"
                onClick={() => setActiveSetup(setup)}
              >
                {/* Image */}
                <img
                  src={setup.image}
                  alt={setup.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 filter brightness-95"
                />

                {/* Match Tag on top right */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full z-10 flex items-center gap-1 shadow-sm">
                  <span className="text-[10px] font-bold text-neutral-900">{setup.matchScore}% tương thích</span>
                </div>

                {/* Ambient shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Text overlay info */}
                <div className="relative z-10 p-6 flex flex-col gap-2 text-white">
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest block">
                    {setup.style} • {setup.color}
                  </span>
                  <h4 className="font-sans font-black text-xl tracking-tight leading-tight mb-1">
                    {setup.title}
                  </h4>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                    {setup.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PINTEREST MASONRY SECTION */}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-neutral-900 uppercase tracking-wider">
              Ý tưởng gợi ý thêm cho bạn
            </h3>
          </div>

          {/* Pinterest Columns layout (No borders) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 w-full">
            {remainingMatches.map((setup) => (
              <div
                key={setup.id}
                className={`break-inside-avoid mb-8 group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end ${setup.aspectRatio} cursor-pointer`}
                onClick={() => setActiveSetup(setup)}
              >
                {/* Image */}
                <img
                  src={setup.image}
                  alt={setup.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 filter brightness-95"
                />

                {/* Match Tag on top right */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full z-10 flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-bold text-neutral-800">{setup.matchScore}% Match</span>
                </div>

                {/* Ambient shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Text overlay info */}
                <div className="relative z-10 p-6 flex flex-col gap-2 text-white">
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest block">
                    {setup.style} • {setup.color}
                  </span>
                  <h4 className="font-sans font-black text-lg sm:text-xl tracking-tight leading-tight mb-1">
                    {setup.title}
                  </h4>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-2 font-light">
                    {setup.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED LIGHTBOX MODAL (NO BORDERS) */}
      <AnimatePresence>
        {activeSetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveSetup(null)}
          >
            {/* Modal Box (Borderless) */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative border-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveSetup(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-neutral-800 transition-all cursor-pointer border-0"
              >
                <X size={20} weight="bold" />
              </button>

              {/* Left: Image Container */}
              <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:min-h-[520px] relative bg-neutral-900 shrink-0">
                <img
                  src={activeSetup.image}
                  alt={activeSetup.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Description & Products (Borderless) */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between gap-8 text-neutral-900">
                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      {activeSetup.style} • {activeSetup.color}
                    </span>
                    <h3 className="font-sans font-black text-2xl tracking-tight leading-tight">
                      {activeSetup.title}
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                    {activeSetup.description}
                  </p>

                  <div className="pt-4 mt-2">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
                      Cấu hình thiết bị gợi ý:
                    </span>
                    <div className="flex flex-col gap-2.5">
                      {activeSetup.products.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-sm text-neutral-800 font-semibold">
                          <CheckCircle size={16} weight="fill" className="text-neutral-800 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct CTA & Price Info (Borderless) */}
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Tổng chi phí ước tính</span>
                      <span className="text-xl font-display font-black text-neutral-900 mt-0.5">
                        {activeSetup.price.toLocaleString("vi-VN")} <span className="text-xs font-bold">VND</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold bg-neutral-100 px-3 py-1.5 rounded-full">
                      <ShieldCheck size={12} weight="fill" />
                      <span>Chính hãng 100%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Đã thêm trọn bộ ${activeSetup.title} vào giỏ hàng thành công!`);
                      setActiveSetup(null);
                    }}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm py-4 rounded-xl transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer border-0"
                  >
                    <CreditCard size={18} weight="fill" />
                    <span>Mua trọn bộ ngay</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
