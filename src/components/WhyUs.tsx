const MASTER_IMG = 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/1383dad7-dada-4b7b-87d8-1279a7fce836.jpg';

const WhyUs = () => {
  return (
    <section id="about" className="bg-velvet py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-cormorant text-cream mb-6 leading-tight" style={{ fontSize: '32px' }}>
            Мы создаём украшения,<br />в которые влюбляются
          </h2>
          <p className="text-stone font-montserrat font-light text-base leading-relaxed mb-6">
            Каждое украшение «Чёрного бархата» — это результат многочасового ручного труда. Мы отбираем камни лично, проверяем каждый изумруд на прозрачность и насыщенность цвета.
          </p>
          <p className="text-stone font-montserrat font-light text-base leading-relaxed mb-10">
            Никаких конвейеров — только мастера с многолетним опытом, любовь к деталям и желание создать украшение, которое станет вашей личной историей.
          </p>
          <a
            href="#contacts"
            className="inline-flex items-center px-8 py-3 border border-gold text-gold font-montserrat text-sm font-medium tracking-wider hover:bg-gold hover:text-velvet transition-all duration-300 rounded-sm"
          >
            Узнать больше о нас
          </a>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={MASTER_IMG}
              alt="Мастер за работой"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold opacity-40 rounded-sm"
            style={{ pointerEvents: 'none' }}
          />
          <div
            className="absolute -top-4 -right-4 w-32 h-32 border border-gold opacity-40 rounded-sm"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
