import Icon from '@/components/ui/icon';

const advantages = [
  {
    icon: 'Sparkles',
    color: 'text-gold',
    title: 'Только ручная работа',
    text: 'Каждое украшение создаётся вручную, без конвейера.',
  },
  {
    icon: 'Gem',
    color: 'text-emerald',
    title: 'Натуральные камни',
    text: 'Изумруды, серебро 925, золото 585 без подделок.',
  },
  {
    icon: 'Gift',
    color: 'text-gold',
    title: 'Подарочная упаковка',
    text: 'Бархатный мешочек и открытка в каждом заказе.',
  },
  {
    icon: 'ShieldCheck',
    color: 'text-emerald',
    title: 'Гарантия качества',
    text: 'Бесплатный ремонт в первый год, возврат 14 дней.',
  },
];

const Advantages = () => {
  return (
    <section className="bg-velvet-light py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((adv) => (
          <div
            key={adv.title}
            className="flex flex-col items-center text-center p-8 bg-velvet rounded-sm card-hover"
          >
            <div className={`mb-4 ${adv.color}`}>
              <Icon name={adv.icon} size={48} />
            </div>
            <h3 className="text-cream font-montserrat font-semibold text-base mb-2">
              {adv.title}
            </h3>
            <p className="text-stone font-montserrat font-light text-sm leading-relaxed">
              {adv.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;