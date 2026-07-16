import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  ShareNetwork,
  CheckCircle
} from "@phosphor-icons/react";
import productsData from "../data/products.json";

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

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  images: { src: string }[];
  variants: { price: string; title: string; available: boolean }[];
}

const shopifyProducts = productsData.products as ShopifyProduct[];

// Helper to look up real shopify product data from local json
function findRealProduct(keyword: string, fallbackName: string, fallbackPrice: number, fallbackImage: string, fallbackUrl: string) {
  const found = shopifyProducts.find(p =>
    p.handle.toLowerCase().includes(keyword.toLowerCase()) ||
    p.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (found) {
    const priceStr = found.variants[0]?.price || fallbackPrice.toString();
    return {
      productName: found.title.replace(/\|.*/, "").trim(), // clean title
      price: parseInt(priceStr),
      productImage: found.images[0]?.src || fallbackImage,
      buyUrl: `https://hyperwork.vn/products/${found.handle}`
    };
  }
  return {
    productName: fallbackName,
    price: fallbackPrice,
    productImage: fallbackImage,
    buyUrl: fallbackUrl
  };
}

const SETUP_SUGGESTIONS_RAW = [
  {
    id: "s1",
    image: "https://hyperwork.vn/cdn/shop/files/Setup_Tet_2026_-_5_11zon.jpg?v=1770620641&width=720",
    title: "Minimalist White Studio",
    style: "Minimalist" as const,
    color: "White" as const,
    description: "Không gian tông trắng Bắc Âu tối giản.",
    aspectRatio: "aspect-[3/4]",
    baseScore: 55,
    hotspots: [
      {
        id: "s1-p1",
        top: 72,
        left: 50,
        keyword: "airy-oc02",
        productCategory: "Ergonomic Chair",
        fallbackName: "Ghế OC02 Airy White",
        fallbackPrice: 2590000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ghe-cong-thai-hoc-hyperwork-airy-oc02",
        impactScore: 15,
        matchReason: "Lưới thoáng khí chuẩn Ergonomic."
      },
      {
        id: "s1-p2",
        top: 38,
        left: 48,
        keyword: "t6-pro",
        productCategory: "Monitor Arm",
        fallbackName: "Arm màn hình Single T6 Pro White",
        fallbackPrice: 1290000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=300",
        fallbackUrl: "https://hyperwork.vn/products/arm-man-hinh-human-motion-t6-pro",
        impactScore: 10,
        matchReason: "Nâng màn hình ngang tầm mắt bảo vệ cổ."
      },
      {
        id: "s1-p3",
        top: 56,
        left: 45,
        keyword: "silent-key",
        productCategory: "Keyboard",
        fallbackName: "Bàn phím cơ HyperWork Silent White",
        fallbackPrice: 1490000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-phim-co-hyperwork-silent-key-edition",
        impactScore: 5,
        matchReason: "Gõ phím êm ái, giảm tiếng ồn."
      },
      {
        id: "s1-p4",
        top: 65,
        left: 32,
        keyword: "atlas",
        productCategory: "Smart Desk",
        fallbackName: "Bàn nâng hạ thông minh Atlas White",
        fallbackPrice: 5990000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-nang-ha-thong-minh-hyperwork-atlas",
        impactScore: 15,
        matchReason: "Đứng/ngồi linh hoạt tránh mỏi thắt lưng."
      }
    ]
  },
  {
    id: "s2",
    image: "https://hyperwork.vn/cdn/shop/files/593454481_1171545718516570_984208308408370112_n.jpg?v=1767493515&width=720",
    title: "Developer Dark Terminal",
    style: "Minimalist" as const,
    color: "Black" as const,
    description: "Góc làm việc ultrawide cho lập trình viên.",
    aspectRatio: "aspect-[4/5]",
    baseScore: 50,
    hotspots: [
      {
        id: "s2-p1",
        top: 76,
        left: 48,
        keyword: "sleek",
        productCategory: "Ergonomic Chair",
        fallbackName: "Ghế Sleek Ergonomic Black",
        fallbackPrice: 5500000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ghe-cong-thai-hoc-hyperwork-sleek",
        impactScore: 15,
        matchReason: "Tự động ôm sát và hỗ trợ vùng thắt lưng."
      },
      {
        id: "s2-p2",
        top: 35,
        left: 52,
        keyword: "p1",
        productCategory: "Monitor Arm",
        fallbackName: "Arm màn hình P1 Single Black",
        fallbackPrice: 1690000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=300",
        fallbackUrl: "https://hyperwork.vn/products/gia-do-man-hinh-hyperwork-p1",
        impactScore: 10,
        matchReason: "Nâng đỡ màn hình lớn, mở rộng mặt bàn."
      },
      {
        id: "s2-p3",
        top: 58,
        left: 50,
        keyword: "hyperone-gen-3",
        productCategory: "Keyboard",
        fallbackName: "Bàn phím không dây HyperOne Gen 3 Black",
        fallbackPrice: 850000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-phim-khong-day-hyperone-gen-3",
        impactScore: 5,
        matchReason: "Kết nối đa thiết bị, phím gõ êm."
      },
      {
        id: "s2-p4",
        top: 64,
        left: 28,
        keyword: "atlas",
        productCategory: "Smart Desk",
        fallbackName: "Bàn nâng hạ thông minh Atlas Black",
        fallbackPrice: 5990000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-nang-ha-thong-minh-hyperwork-atlas",
        impactScore: 15,
        matchReason: "Khung thép chịu lực, đổi độ cao nhanh."
      }
    ]
  },
  {
    id: "s3",
    image: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_02s47_11zon.jpg?v=1767460861&width=720",
    title: "Ergonomic Walnut Suite",
    style: "Ergonomic" as const,
    color: "Walnut" as const,
    description: "Cấu hình bàn gỗ Walnut và ghế công thái học.",
    aspectRatio: "aspect-[3/2]",
    baseScore: 50,
    hotspots: [
      {
        id: "s3-p1",
        top: 74,
        left: 52,
        keyword: "sleek",
        productCategory: "Ergonomic Chair",
        fallbackName: "Ghế Sleek Ergonomic Gray",
        fallbackPrice: 5500000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ghe-cong-thai-hoc-hyperwork-sleek",
        impactScore: 15,
        matchReason: "Tự tựa đầu 3D nâng đỡ cột sống cổ tối ưu."
      },
      {
        id: "s3-p2",
        top: 36,
        left: 45,
        keyword: "p1",
        productCategory: "Monitor Arm",
        fallbackName: "Arm màn hình P1 Single Silver",
        fallbackPrice: 1690000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=300",
        fallbackUrl: "https://hyperwork.vn/products/gia-do-man-hinh-hyperwork-p1",
        impactScore: 10,
        matchReason: "Nhôm đúc cao cấp, đồng bộ gỗ tự nhiên."
      },
      {
        id: "s3-p3",
        top: 62,
        left: 38,
        keyword: "atlas",
        productCategory: "Smart Desk",
        fallbackName: "Bàn nâng hạ thông minh Atlas Walnut",
        fallbackPrice: 6290000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-nang-ha-thong-minh-hyperwork-atlas",
        impactScore: 15,
        matchReason: "Mặt bàn gỗ sồi Walnut vân tự nhiên."
      },
      {
        id: "s3-p4",
        top: 52,
        left: 65,
        keyword: "ke-man-hinh",
        productCategory: "Accessories",
        fallbackName: "Kệ màn hình Monitor Stand gỗ sồi",
        fallbackPrice: 690000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ke-man-hinh-go-soi",
        impactScore: 5,
        matchReason: "Thêm khoảng trống dưới gầm cất bàn phím."
      }
    ]
  },
  {
    id: "s4",
    image: "https://hyperwork.vn/cdn/shop/files/DS02_-_Setups_-_s1_-_1_11zon.jpg?v=1764125309&width=720",
    title: "Dual-Screen Productive Desk",
    style: "Ergonomic" as const,
    color: "Walnut" as const,
    description: "Tối ưu hóa không gian hiển thị bằng 2 màn hình.",
    aspectRatio: "aspect-[4/3]",
    baseScore: 55,
    hotspots: [
      {
        id: "s4-p1",
        top: 76,
        left: 54,
        keyword: "sleek",
        productCategory: "Ergonomic Chair",
        fallbackName: "Ghế Sleek Ergonomic Gray",
        fallbackPrice: 5500000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ghe-cong-thai-hoc-hyperwork-sleek",
        impactScore: 15,
        matchReason: "Bảo vệ đĩa đệm và cột sống khi ngồi lâu."
      },
      {
        id: "s4-p2",
        top: 40,
        left: 45,
        keyword: "p1-dual",
        productCategory: "Monitor Arm",
        fallbackName: "Arm màn hình kép P1 Dual Silver",
        fallbackPrice: 2990000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=300",
        fallbackUrl: "https://hyperwork.vn/products/gia-do-man-hinh-hyperwork-p1-dual",
        impactScore: 15,
        matchReason: "Nâng đỡ 2 màn hình tăng hiệu suất đa nhiệm."
      },
      {
        id: "s4-p3",
        top: 64,
        left: 36,
        keyword: "atlas",
        productCategory: "Smart Desk",
        fallbackName: "Bàn nâng hạ thông minh Atlas Walnut",
        fallbackPrice: 6290000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-nang-ha-thong-minh-hyperwork-atlas",
        impactScore: 15,
        matchReason: "Khung thép vững chãi chịu tải cao."
      }
    ]
  },
  {
    id: "s5",
    image: "https://hyperwork.vn/cdn/shop/files/999.jpg?v=1763115139&width=720",
    title: "Cozy Keeb Custom Corner",
    style: "Cozy" as const,
    color: "Walnut" as const,
    description: "Góc setup phím cơ custom ấm cúng.",
    aspectRatio: "aspect-[4/5]",
    baseScore: 60,
    hotspots: [
      {
        id: "s5-p1",
        top: 62,
        left: 50,
        keyword: "silent-key",
        productCategory: "Keyboard",
        fallbackName: "Bàn phím cơ HyperWork Silent",
        fallbackPrice: 1490000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-phim-co-hyperwork-silent-key-edition",
        impactScore: 10,
        matchReason: "Switch Silent êm ái tập trung sâu."
      },
      {
        id: "s5-p2",
        top: 48,
        left: 42,
        keyword: "litemax",
        productCategory: "Light",
        fallbackName: "Đèn treo màn hình Litemax",
        fallbackPrice: 1190000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=300",
        fallbackUrl: "https://hyperwork.vn/products/den-treo-man-hinh-hyperwork-litemax",
        impactScore: 10,
        matchReason: "Ánh sáng chống mỏi mắt ban đêm."
      },
      {
        id: "s5-p3",
        top: 68,
        left: 50,
        keyword: "felt-desk-pad",
        productCategory: "Accessories",
        fallbackName: "Thảm lót chuột nỉ HyperWork",
        fallbackPrice: 390000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-1.jpg?v=1783495644&width=300",
        fallbackUrl: "https://hyperwork.vn/products/tham-trai-ban-lam-viec-felt-desk-pad",
        impactScore: 5,
        matchReason: "Chất liệu nỉ mịn chống trầy sước bàn."
      }
    ]
  }
];

export default function WorkspaceResult({ data, onRestart }: WorkspaceResultProps) {
  // Resolve pre-made gallery template suggestions
  const suggestions = useMemo(() => {
    return SETUP_SUGGESTIONS_RAW.map(setup => ({
      ...setup,
      hotspots: setup.hotspots.map(h => {
        const real = findRealProduct(h.keyword, h.fallbackName, h.fallbackPrice, h.fallbackImage, h.fallbackUrl);
        return {
          id: h.id,
          top: h.top,
          left: h.left,
          productName: real.productName,
          productCategory: h.productCategory,
          price: real.price,
          buyUrl: real.buyUrl,
          productImage: real.productImage,
          impactScore: h.impactScore,
          matchReason: h.matchReason
        };
      })
    }));
  }, []);

  // Dynamically generate the AI setup based on user's exact selections & problems
  const aiGeneratedSuggestion = useMemo(() => {
    // 1. Pick a matching background image from the real store setups
    let image = "https://hyperwork.vn/cdn/shop/files/DS02_-_Setups_-_s1_-_1_11zon.jpg?v=1764125309&width=720";
    if (data.color === "White" || data.style === "Minimal") {
      image = "https://hyperwork.vn/cdn/shop/files/Setup_Tet_2026_-_5_11zon.jpg?v=1770620641&width=720";
    } else if (data.color === "Black" || data.style === "Dark") {
      image = "https://hyperwork.vn/cdn/shop/files/593454481_1171545718516570_984208308408370112_n.jpg?v=1767493515&width=720";
    } else if (data.color === "Walnut" || data.style === "Wooden") {
      image = "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_02s47_11zon.jpg?v=1767460861&width=720";
    }

    // 2. Select hotspots/items dynamically based on user problems and choices
    const hotspotsRaw = [];
    let hotspotIdCounter = 1;

    // Check if they need a chair (Default to true so setup is never empty, customize match reason)
    const hasChair = data.equipment.includes("Ergonomic Chair") || data.problems.includes("Back pain") || data.problems.includes("Neck pain") || true;
    if (hasChair) {
      const keyword = (data.budget < 10 || data.color === "White") ? "airy-oc02" : "sleek";
      const matchReason = (data.problems.includes("Back pain") || data.problems.includes("Neck pain"))
        ? "Nâng đỡ thắt lưng & đốt sống cổ, giảm đau mỏi khi ngồi lâu."
        : "Kiến tạo tư thế ngồi làm việc chuẩn công thái học.";
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 72,
        left: 50,
        keyword,
        productCategory: "Ergonomic Chair",
        fallbackName: "Ghế Ergonomic HyperWork",
        fallbackPrice: 5500000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-4.jpg?v=1783495643&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ghe-cong-thai-hoc-hyperwork-sleek",
        impactScore: 15,
        matchReason
      });
    }

    // Check if they need a smart desk (Default to true if budget is healthy)
    const hasDesk = data.equipment.includes("Standing Desk") || data.problems.includes("Back pain") || data.budget >= 10 || true;
    if (hasDesk) {
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 65,
        left: 32,
        keyword: "atlas",
        productCategory: "Smart Desk",
        fallbackName: "Bàn nâng hạ thông minh Atlas",
        fallbackPrice: 5990000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Pro-Capture_One_s0185_copy_c31225e9-4c6b-45ea-a93f-a864cadb3011.jpg?v=1782875762&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-nang-ha-thong-minh-hyperwork-atlas",
        impactScore: 15,
        matchReason: "Khung thép vững chãi, thay đổi độ cao linh hoạt để đứng/ngồi làm việc."
      });
    }

    // Check if they need a monitor arm (Default to true)
    const hasArm = data.equipment.includes("Monitor") || data.problems.includes("Neck pain") || data.problems.includes("Limited desk space") || true;
    if (hasArm) {
      const keyword = data.color === "White" ? "t6-pro" : "p1";
      const matchReason = data.problems.includes("Neck pain")
        ? "Điều chỉnh màn hình ngang tầm mắt, chấm dứt đau mỏi vai gáy."
        : "Nâng đỡ màn hình lơ lửng, giải phóng 30% diện tích bàn làm việc.";
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 38,
        left: 48,
        keyword,
        productCategory: "Monitor Arm",
        fallbackName: "Arm nâng đỡ màn hình",
        fallbackPrice: 1690000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/1_85c5273e-dbf2-40e8-ae68-aaabd2723afa.jpg?v=1782961460&width=300",
        fallbackUrl: "https://hyperwork.vn/products/gia-do-man-hinh-hyperwork-p1",
        impactScore: 10,
        matchReason
      });
    }

    // Check if they need light
    if (data.problems.includes("Poor lighting") || data.problems.includes("Eye strain")) {
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 45,
        left: 40,
        keyword: "litemax",
        productCategory: "Light",
        fallbackName: "Đèn treo màn hình Litemax",
        fallbackPrice: 1190000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=300",
        fallbackUrl: "https://hyperwork.vn/products/den-treo-man-hinh-hyperwork-litemax",
        impactScore: 10,
        matchReason: "Chiếu sáng không hắt vào màn hình, bảo vệ mắt khi làm việc tối."
      });
    }

    // Check if they need keyboard (Default to true)
    const hasKeyboard = data.equipment.includes("Mechanical Keyboard") || true;
    if (hasKeyboard) {
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 56,
        left: 45,
        keyword: "silent-key",
        productCategory: "Keyboard",
        fallbackName: "Bàn phím cơ Silent",
        fallbackPrice: 1490000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/11_csopy_11zon.jpg?v=1783390458&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ban-phim-co-hyperwork-silent-key-edition",
        impactScore: 10,
        matchReason: "Gõ êm ái, đầm tay, tăng cảm hứng sáng tạo."
      });
    }

    // Check if they need deskpad
    if (data.problems.includes("Wrist pain")) {
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 68,
        left: 50,
        keyword: "felt-desk-pad",
        productCategory: "Accessories",
        fallbackName: "Thảm nỉ Felt Desk Pad",
        fallbackPrice: 390000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/PA02-1.jpg?v=1783495644&width=300",
        fallbackUrl: "https://hyperwork.vn/products/tham-trai-ban-lam-viec-felt-desk-pad",
        impactScore: 5,
        matchReason: "Tì đè tay êm ái, bảo vệ khớp tay khi gõ phím lâu."
      });
    }

    // Check if they need organizer accessories
    if (data.problems.includes("Limited desk space") || data.problems.includes("Cable clutter")) {
      hotspotsRaw.push({
        id: `ai-p-${hotspotIdCounter++}`,
        top: 50,
        left: 65,
        keyword: "ke-man-hinh",
        productCategory: "Organizer",
        fallbackName: "Kệ màn hình Monitor Stand",
        fallbackPrice: 690000,
        fallbackImage: "https://hyperwork.vn/cdn/shop/files/Tr_ngLight-Bogoc_8.jpg?v=1774005903&width=300",
        fallbackUrl: "https://hyperwork.vn/products/ke-man-hinh-go-soi",
        impactScore: 10,
        matchReason: "Tạo thêm ngăn trống để cất gọn phụ kiện và đi dây gọn gàng."
      });
    }

    // Resolve real shopify data for dynamic AI hotspots
    const hotspots = hotspotsRaw.map(h => {
      const real = findRealProduct(h.keyword, h.fallbackName, h.fallbackPrice, h.fallbackImage, h.fallbackUrl);
      return {
        id: h.id,
        top: h.top,
        left: h.left,
        productName: real.productName,
        productCategory: h.productCategory,
        price: real.price,
        buyUrl: real.buyUrl,
        productImage: real.productImage,
        impactScore: h.impactScore,
        matchReason: h.matchReason
      };
    });

    return {
      id: "ai_generated",
      image,
      title: `Bản thiết kế AI tạo riêng cho bạn`,
      style: (data.style === "Minimal" ? "Minimalist" : data.style === "Wooden" ? "Cozy" : data.style === "Dark" ? "Creator" : "Ergonomic") as any,
      color: data.color as any,
      description: `Thiết kế tùy chỉnh tối ưu dựa trên sở thích và thói quen sử dụng của bạn.`,
      aspectRatio: "aspect-[4/3]",
      baseScore: 60,
      hotspots,
      matchScore: 100
    };
  }, [data]);

  const scoredSuggestions = useMemo(() => {
    return suggestions.map((setup) => {
      let score = 0;
      let styleMapped: string = setup.style;
      if (data.style === "Minimal") styleMapped = "Minimalist";
      else if (data.style === "Wooden") styleMapped = "Cozy";
      else if (data.style === "Dark") styleMapped = "Creator";
      else if (data.style === "Modern") styleMapped = "Ergonomic";

      if (setup.style === styleMapped) score += 40;
      else score += 15;

      if (setup.color === data.color) score += 35;
      else score += 10;

      const budgetVND = data.budget * 1000000;
      const setupPrice = setup.hotspots.reduce((sum, h) => sum + h.price, 0);
      if (setupPrice <= budgetVND) score += 25;
      else if (setupPrice <= budgetVND * 1.25) score += 15;
      else score += 5;

      return {
        ...setup,
        matchScore: score
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [data, suggestions]);

  // Default is "ai_generated"
  const [activeSetupId, setActiveSetupId] = useState<string>("ai_generated");

  const activeSuggestion = useMemo(() => {
    if (activeSetupId === "ai_generated") return aiGeneratedSuggestion;
    return scoredSuggestions.find(s => s.id === activeSetupId) || aiGeneratedSuggestion;
  }, [activeSetupId, scoredSuggestions, aiGeneratedSuggestion]);

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<"concept" | "before">("concept");

  useEffect(() => {
    setSelectedProductIds(activeSuggestion.hotspots.map(h => h.id));
  }, [activeSetupId, activeSuggestion]);

  const totalCost = useMemo(() => {
    const activeHotspots = activeSuggestion.hotspots.filter(h => selectedProductIds.includes(h.id));
    return activeHotspots.reduce((sum, h) => sum + h.price, 0);
  }, [activeSuggestion, selectedProductIds]);

  const finalScore = useMemo(() => {
    const activeHotspots = activeSuggestion.hotspots.filter(h => selectedProductIds.includes(h.id));
    const addedScore = activeHotspots.reduce((sum, h) => sum + h.impactScore, 0);
    return Math.min(100, activeSuggestion.baseScore + addedScore);
  }, [activeSuggestion, selectedProductIds]);

  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const userPhotoUrl = useMemo(() => {
    if (data.photo) {
      try {
        return URL.createObjectURL(data.photo);
      } catch (e) {
        console.error("Error creating Object URL for uploaded photo", e);
      }
    }
    return "https://hyperwork.vn/cdn/shop/files/7_11zon_c0723dc0-f933-41e3-803f-f54077b85ef3.jpg?v=1770626747&width=720";
  }, [data.photo]);

  const toggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter(pid => pid !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?share=true&style=${data.style}&color=${data.color}&role=${data.role}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    });
  };

  return (
    <div className="w-full bg-white text-neutral-900 pt-28 pb-12 px-6 md:px-12 font-sans select-none relative">
      {/* Share Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={14} weight="fill" />
            <span>Đã sao chép link chia sẻ!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* HEADER BLOCK (CLEAN & SIMPLE) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="flex flex-col gap-1.5 items-start">


            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-neutral-900">
              {activeSuggestion.title}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs text-neutral-500 font-medium">
              <span>{data.role}</span>
              <span>•</span>
              <span>Style: {activeSuggestion.style}</span>
              <span>•</span>
              <span>Tone: {activeSuggestion.color}</span>
            </div>
            {activeSetupId === "ai_generated" ? (
              <></>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => {
                    setActiveSetupId("ai_generated");
                    setPreviewMode("concept");
                  }}
                  className="text-[9px] font-black text-neutral-900  hover:opacity-85 cursor-pointer uppercase tracking-wider"
                >
                  Quay lại thiết kế của bạn
                </button>
              </div>
            )}
          </div>


          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInWishlist(!isInWishlist)}
              className={`p-3 rounded-full transition-all cursor-pointer ${isInWishlist ? "bg-red-50 text-red-500" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
                }`}
            >
              <Heart size={16} weight={isInWishlist ? "fill" : "bold"} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition-all cursor-pointer"
            >
              <ShareNetwork size={16} weight="bold" />
            </button>

            <button
              onClick={onRestart}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-6 py-3 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              Làm lại
            </button>
          </div>
        </div>

        {/* MAIN INTERACTIVE PREVIEW & PRODUCTS CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Column Left: Visual Preview Container (5 cols, full bleed image) */}
          <div className="lg:col-span-5 relative rounded-[24px] overflow-hidden min-h-[440px] shadow-sm bg-neutral-50 aspect-[4/3] lg:aspect-auto">
            {/* Full-bleed Background Image */}
            <img
              src={previewMode === "concept" ? activeSuggestion.image : userPhotoUrl}
              alt="Workspace Preview"
              className="absolute inset-0 w-full h-full object-cover select-none"
            />

            {/* View Mode Switcher Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
              <div className="flex bg-white p-0.5 rounded-full">
                <button
                  onClick={() => setPreviewMode("concept")}
                  className={`text-[9px] sm:text-[10px] font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${previewMode === "concept" ? "text-neutral-650 hover:text-neutral-950" : "text-neutral-500"
                    }`}
                >
                  Bản thiết kế AI
                </button>
                <span>|</span>
                <button
                  onClick={() => setPreviewMode("before")}
                  className={`text-[9px] sm:text-[10px] font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${previewMode === "before" ? "text-neutral-650 hover:text-neutral-950" : "text-neutral-500"
                    }`}
                >
                  Hiện trạng
                </button>
              </div>

              {/* Minimalist circular Score badge */}
              <div className="flex items-center gap-1 bg-white px-3.5 py-1.5 rounded-full text-[10px] font-black text-neutral-800">
                <span>Độ phù hợp: {finalScore}</span>
              </div>
            </div>

            {/* Render Hotspots ONLY in Concept Mode (Flat dots, no ring animations, no text inside) */}
            {previewMode === "concept" && activeSuggestion.hotspots.map((hotspot) => {
              const isActive = selectedProductIds.includes(hotspot.id);
              const isHovered = hoveredHotspotId === hotspot.id;

              return (
                <div
                  key={hotspot.id}
                  className="absolute"
                  style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
                >
                  <button
                    onClick={() => toggleProduct(hotspot.id)}
                    onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                    onMouseLeave={() => setHoveredHotspotId(null)}
                    className={`relative z-10 w-3 h-3 rounded-full transition-all shadow-md active:scale-90 cursor-pointer ${isActive ? "bg-neutral-950" : "bg-white"
                      }`}
                  />

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-40 bg-neutral-950/95 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg flex flex-col gap-0.5 text-[9px]"
                      >
                        <span className="font-bold line-clamp-1">{hotspot.productName}</span>
                        <span className="text-white/60">{hotspot.price.toLocaleString("vi-VN")}đ</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Column Right: Suggested Products List (Using real shopify images and prices) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Thiết bị khuyên dùng</span>

              <div className="flex flex-col gap-3 max-h-[340px] overflow-y-auto scrollbar-none pr-1">
                {activeSuggestion.hotspots.map((product) => {
                  const isSelected = selectedProductIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className={`bg-neutral-100 p-2.5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer ${isSelected
                        ? "bg-neutral-100 opacity-100"
                        : "opacity-30 bg-neutral-100"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Product Image (Full bleed / Edge-to-edge) */}
                        <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0">
                          <img src={product.productImage} alt={product.productName} className="w-full h-full object-cover select-none" />
                        </div>

                        {/* Title & short match info */}
                        <div className="flex flex-col gap-0.5">
                          <h5 className="font-sans font-black text-xs sm:text-sm text-neutral-900 leading-tight">
                            {product.productName}
                          </h5>
                          <span className="text-[9px] text-neutral-500 font-medium">
                            {product.matchReason}
                          </span>
                        </div>
                      </div>

                      {/* Buy Action and Price */}
                      <div className="flex items-center gap-4 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <span className="font-sans font-black text-xs sm:text-sm text-neutral-900">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>

                        <a
                          href={product.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] font-bold uppercase px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-850 text-white transition-all shadow-sm cursor-pointer border-0"
                        >
                          Mua
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Budget Calculator Card */}
            <div className="bg-neutral-100 p-5 rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-display font-black text-neutral-900">
                  {totalCost.toLocaleString("vi-VN")}đ
                </span>

                {/* Budget Limit Compare */}
                <div className="mt-0.5 text-[9px] font-bold text-neutral-500">
                  {totalCost <= data.budget * 1000000 ? (
                    <span>Trong ngân sách ({data.budget}Mđ)</span>
                  ) : (
                    <span>Vượt ngân sách ({data.budget}Mđ)</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => alert("Đã thêm toàn bộ các sản phẩm đã kích hoạt vào giỏ hàng HyperWork!")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold bg-neutral-950 hover:bg-neutral-900 text-white transition-all shadow-sm cursor-pointer border-0"
              >
                <span>Mua trọn bộ đã chọn</span>
              </button>
            </div>

          </div>
        </div>

        {/* PINTEREST MASONRY SECTION */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <h3 className="font-black uppercase tracking-wider text-xs text-neutral-400">
              Ý tưởng gợi ý thêm cho bạn (Pinterest)
            </h3>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full">
            {scoredSuggestions.map((setup) => {
              const isActive = setup.id === activeSetupId;
              return (
                <div
                  key={setup.id}
                  className={`break-inside-avoid mb-6 group relative bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-end ${setup.aspectRatio} cursor-pointer ${isActive ? "ring-2 ring-neutral-950 ring-offset-2" : ""
                    }`}
                  onClick={() => {
                    setActiveSetupId(setup.id);
                    setPreviewMode("concept");
                  }}
                >
                  <img
                    src={setup.image}
                    alt={setup.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-95"
                  />

                  {/* Plain shadow gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Text overlay */}
                  <div className="relative z-10 p-5 flex flex-col gap-1 text-white">
                    <span className="text-[8px] font-bold text-white/50 uppercase tracking-wider block">
                      {setup.style}
                    </span>
                    <h4 className="font-sans font-black text-base tracking-tight leading-tight">
                      {setup.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
