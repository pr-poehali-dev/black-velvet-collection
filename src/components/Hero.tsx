const HERO_BG = 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/d5e9b9e6-d06e-4990-a345-b0dc7d6a5fc5.jpg';

const Hero = () => {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-velvet/60 via-velvet/40 to-velvet/80" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-gold text-sm font-montserrat font-light tracking-[0.2em] uppercase mb-6 animate-fade-in">
          ✨ Ограниченная коллекция «Изумрудная ночь»
        </p>

        <h1
          className="font-cormorant text-cream mb-6 animate-fade-in leading-tight"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', animationDelay: '0.2s' }}
        >
          Украшения, рождённые<br />в темноте бархата
        </h1>

        <p
          className="text-stone font-montserrat font-light mb-10 animate-fade-in"
          style={{ fontSize: '18px', animationDelay: '0.4s' }}
        >
          Ручная работа. Натуральные изумруды.<br />
          Эстетика, которая остаётся с вами навсегда
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#catalog"
            className="px-8 py-4 font-montserrat font-medium text-sm tracking-wider bg-gold text-velvet hover:bg-gold/90 transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
          >
            Смотреть коллекцию
          </a>
          <a
            href="#collections"
            className="px-8 py-4 font-montserrat font-medium text-sm tracking-wider bg-emerald text-velvet hover:bg-emerald/90 transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
          >
            Каталог
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto" />
      </div>
    </section>
  );
};

export default Hero;
