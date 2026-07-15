import { useState, useEffect } from "react";
import { MagnifyingGlass, User, ShoppingBag, CaretDown } from "@phosphor-icons/react";

interface HeaderProps {
  onStartAdvisor: () => void;
}

export default function Header({ onStartAdvisor }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between h-[76px] transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm" 
        : "bg-transparent border-b border-transparent"
    }`}>
      {/* Brand Logo */}
      <div className="flex items-center cursor-pointer">
        <img 
          src="https://hyperwork.vn/cdn/shop/files/logo1.svg" 
          alt="HyperWork Logo" 
          className={`h-7 md:h-8 object-contain transition-all duration-300 ${
            isScrolled ? "filter brightness-0" : ""
          }`}
        />
      </div>

      {/* Navigation Links */}
      <nav className={`hidden lg:flex items-center gap-8 font-sans text-[15px] font-extrabold tracking-wide transition-colors duration-300 ${
        isScrolled ? "text-neutral-900" : "text-white"
      }`}>
        <div className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200">
          <span>Sản phẩm</span>
          <CaretDown size={14} weight="light" className={`${isScrolled ? 'text-neutral-500' : 'text-neutral-300'} mt-0.5`} />
        </div>
        <a href="#points" className="transition-colors duration-200">Tích điểm</a>
        <div className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200">
          <span>Bảo hành</span>
          <CaretDown size={14} weight="light" className={`${isScrolled ? 'text-neutral-500' : 'text-neutral-300'} mt-0.5`} />
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer transition-colors duration-200">
          <span>Hợp tác</span>
          <CaretDown size={14} weight="light" className={`${isScrolled ? 'text-neutral-500' : 'text-neutral-300'} mt-0.5`} />
        </div>
        <a href="#news" className="transition-colors duration-200">Tin tức</a>
        <button onClick={onStartAdvisor} className="transition-colors duration-200 cursor-pointer">AI</button>
      </nav>

      {/* Action Controls */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Country & Currency selector */}
        <div className={`hidden sm:flex items-center gap-1.5 cursor-pointer font-sans text-[14px] font-extrabold transition-colors duration-300 ${
          isScrolled ? "text-neutral-900" : "text-white"
        }`}>
          <div className="w-5 h-5 rounded-full bg-[#da251d] flex items-center justify-center text-[10px] text-[#ffff00] font-black shrink-0 shadow-sm leading-none pb-0.5 select-none">★</div>
          <span>VND</span>
          <CaretDown size={12} weight="light" className={`${isScrolled ? 'text-neutral-500' : 'text-neutral-300'} mt-0.5`} />
        </div>

        {/* Language selector */}
        <div className={`hidden sm:flex items-center gap-1.5 cursor-pointer font-sans text-[14px] font-extrabold transition-colors duration-300 ${
          isScrolled ? "text-neutral-900" : "text-white"
        }`}>
          <span>Tiếng Việt</span>
          <CaretDown size={12} weight="light" className={`${isScrolled ? 'text-neutral-500' : 'text-neutral-300'} mt-0.5`} />
        </div>

        {/* Icons */}
        <button className={`transition-colors duration-200 cursor-pointer p-1 ${
          isScrolled ? "text-neutral-900 hover:text-black" : "text-white hover:text-neutral-300"
        }`}>
          <MagnifyingGlass size={22} weight="light" />
        </button>
        <button className={`transition-colors duration-200 cursor-pointer p-1 ${
          isScrolled ? "text-neutral-900 hover:text-black" : "text-white hover:text-neutral-300"
        }`}>
          <User size={22} weight="light" />
        </button>
        <button className={`transition-colors duration-200 cursor-pointer p-1 relative ${
          isScrolled ? "text-neutral-900 hover:text-black" : "text-white hover:text-neutral-300"
        }`}>
          <ShoppingBag size={22} weight="light" />
          <span className="absolute -top-1 -right-1.5 bg-brand-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
