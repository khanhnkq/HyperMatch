import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

const faqs = [
  {
    question: "Các hình thức thanh toán?",
    answer: "HyperWork chấp nhận thanh toán qua:\n- Chuyển khoản online banking\n- Thẻ tín dụng Visa, Master\n- QR Code banking\n- Thanh toán khi nhận hàng (COD)\n\nChúng tôi luôn có ưu đãi khi khách hàng chuyển khoản trước."
  },
  {
    question: "Bao lâu có thể nhận được hàng?",
    answer: "Nếu bạn tại Hà Nội & TP. Hồ Chí Minh. Đừng quên, HyperWork có thể giao hàng nhanh trong 2 giờ đồng hồ.\n\nCác khu vực khác, thời gian giao hàng có thể lên đến 3-7 ngày (tuỳ từng khu vực)"
  },
  {
    question: "Kiểm tra, bảo hành sản phẩm",
    answer: "Bạn có thể kiểm tra bảo hành tại hệ thống trung tâm bảo hành chính hãng."
  },
  {
    question: "Quy trình đổi trả sản phẩm",
    answer: "Sản phẩm được đổi mới trong 07 ngày nếu phát sinh lỗi. Trong trường hợp quý khách không có nhu cầu sử dụng, chúng tôi sẽ trừ 10% phí nhập lại hàng. Chi phí vận chuyển sẽ do khách hàng chịu."
  },
  {
    question: "Mua sản phẩm số lượng lớn",
    answer: "Thật tuyệt vời, hãy liên hệ với chúng tôi để nhận ưu đãi nhé. Bạn có thể liên hệ chúng tôi qua Hotline, Live Chat, Facebook, iMessenger, Telegram. Chúng tôi có bộ phận hỗ trợ khách hàng mua số lượng lớn & Khách hàng doanh nghiệp."
  },
  {
    question: "Còn bất kỳ câu hỏi nào khác?",
    answer: "Bạn có thể liên hệ với chúng tôi qua trang Liên hệ! Chúng tôi luôn sẵn lòng hỗ trợ bạn."
  }
];

const supportCards = [
  {
    title: "Vận chuyển an toàn",
    desc: "Bảo vệ tuyệt đối cho sản phẩm bạn đặt hàng",
    icon: "https://hyperwork.vn/cdn/shop/files/box-open-solid-full.svg?height=64&v=1758265891"
  },
  {
    title: "Lắp đặt chuyên nghiệp",
    desc: "Lắp đặt đúng vị trí bạn mong muốn",
    icon: "https://hyperwork.vn/cdn/shop/files/screwdriver-wrench-solid-full.svg?height=64&v=1758266000"
  },
  {
    title: "Hoàn trả mặt bằng",
    desc: "Thu gom bao bì, vệ sinh không gian lắp đặt trước khi rời đi",
    icon: "https://hyperwork.vn/cdn/shop/files/spray-can-sparkles-solid-full.svg?height=64&v=1758266096"
  },
  {
    title: "Hướng dẫn sử dụng",
    desc: "Đảm bảo làm chủ sản phẩm ngay lập tức",
    icon: "https://hyperwork.vn/cdn/shop/files/book-medical-solid-full.svg?height=64&v=1758266229"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const SupportCardsList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {supportCards.map((card, idx) => (
        <button
          key={idx}
          className="bg-neutral-50 flex flex-col items-start gap-4 p-5 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all text-left"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={card.icon} alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <h5 className="font-sans font-bold text-[15px] text-neutral-900 mb-1">{card.title}</h5>
            <p className="text-[14px] text-neutral-500 leading-relaxed">{card.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-10  font-sans">
      <div className="max-w-full mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Left Side: Intro & Support Cards (Desktop) */}
        <div className="lg:w-5/12 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-sans font-black text-3xl md:text-4xl text-neutral-900 tracking-tight">
              Có câu hỏi?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-[15px] md:text-[16px]">
              Các câu hỏi thường gặp sẽ giúp bạn giải đáp nhanh những thắc mắc phổ biến về sản phẩm/dịch vụ của chúng tôi.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="text-[14px] text-neutral-500 font-sans">
              Thời gian trả lời trung bình: <span className="text-neutral-900">1 giờ</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <SupportCardsList />
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-7/12">
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-2 sm:p-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`group border-b border-neutral-100 last:border-0 ${openIndex === idx ? 'pb-4' : ''}`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between py-4 sm:py-5 px-2 sm:px-4 text-left"
                >
                  <span className={`font-sans font-bold text-[15px] sm:text-[16px] transition-colors ${openIndex === idx ? 'text-neutral-600' : 'text-neutral-900 group-hover:text-neutral-600'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${openIndex === idx ? 'bg-neutral-200 text-neutral-900 rotate-180' : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:text-neutral-900'}`}>
                    <CaretDown weight="bold" className="w-3 h-3" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-2 sm:px-4`}
                  style={{ maxHeight: openIndex === idx ? '500px' : '0px', opacity: openIndex === idx ? 1 : 0 }}
                >
                  <div className="text-neutral-500 text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap pb-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Elements: Support Cards & Availability at bottom */}
        <div className="flex flex-col gap-8 lg:hidden">
          <SupportCardsList />
          <div className="text-[14px] text-neutral-500 font-sans">
            Thời gian trả lời trung bình: <span className="text-neutral-900">1 giờ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
