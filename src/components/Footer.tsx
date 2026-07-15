import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  TiktokLogo,
  CaretRight,
  At
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#151515] text-white py-16 px-6 md:px-12 border-t border-neutral-800">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        {/* Newsletter & Social Column */}
        <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
          <h3 className="text-2xl font-bold mb-6">Đăng ký nhận<br/>bản tin</h3>
          <p className="text-neutral-400 text-[15px] leading-relaxed mb-8 max-w-[280px]">
            Cập nhật tin tức, xu hướng thiết kế không gian làm việc và sản phẩm mới nhất từ HyperWork.
          </p>
          
          <div className="relative w-full max-w-[320px] mb-12">
            <input
              type="email"
              placeholder="E-mail"
              className="bg-[#1c1c1c] border border-neutral-800 text-[15px] px-4 py-3.5 rounded-xl w-full focus:outline-none focus:border-neutral-500 text-white placeholder-neutral-500 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-neutral-300 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <CaretRight size={14} weight="bold" />
            </button>
          </div>

          <div className="flex gap-5 text-neutral-100">
            <a href="#" className="hover:text-white transition-colors">
              <FacebookLogo size={24} weight="fill" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <InstagramLogo size={24} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <At size={24} weight="bold" /> {/* Threads placeholder */}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <YoutubeLogo size={24} weight="fill" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <TiktokLogo size={24} weight="fill" />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-2">
          <h4 className="font-bold text-[15px] mb-6">Hợp tác Marketing</h4>
          <ul className="flex flex-col gap-4 text-neutral-300 text-[14px]">
            <li><a href="#" className="hover:text-white transition-colors">Kết nối nhà sáng tạo</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Báo chí và truyền thông</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sự kiện và chiến dịch</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-[15px] mb-6">Hợp tác Kinh Doanh</h4>
          <ul className="flex flex-col gap-4 text-neutral-300 text-[14px]">
            <li><a href="#" className="hover:text-white transition-colors">Dự án tiêu biểu</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gói giải pháp văn phòng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hợp tác B2B</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sản phẩm "Open box"</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-[15px] mb-6">Hỗ trợ</h4>
          <ul className="flex flex-col gap-4 text-neutral-300 text-[14px]">
            <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách giao hàng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-bold text-[15px] mb-6">Khám phá</h4>
          <ul className="flex flex-col gap-4 text-neutral-300 text-[14px]">
            <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
