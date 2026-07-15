interface HeroProps {
  onStartAdvisor: () => void;
}

export default function Hero({ onStartAdvisor }: HeroProps) {
  return (
    <section className="w-full bg-[#000000] cursor-pointer" onClick={onStartAdvisor}>
      <img 
        src="https://hyperwork.vn/cdn/shop/files/Untitled_Cataloag01ss48_copy_1.svg" 
        alt="HyperWork Hero Banner" 
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
