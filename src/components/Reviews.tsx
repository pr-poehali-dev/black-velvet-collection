import { useState } from 'react';
import Icon from '@/components/ui/icon';

const REVIEWS = [
  {
    id: 1,
    name: 'Анастасия М.',
    city: 'Москва',
    rating: 5,
    text: 'Заказала кольцо с изумрудом на годовщину — муж в восторге! Упаковка невероятная, камень настоящий, ощущение роскоши с первой секунды. Буду заказывать ещё.',
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Екатерина В.',
    city: 'Санкт-Петербург',
    rating: 5,
    text: 'Серьги пришли быстро, качество выше всяких похвал. Носила на важное мероприятие — получила море комплиментов. Мастерство чувствуется в каждой детали.',
    avatar: 'Е',
  },
  {
    id: 3,
    name: 'Ольга С.',
    city: 'Краснодар',
    rating: 5,
    text: 'Покупала колье в подарок маме. Она плакала от радости. Изумруды натуральные, это сразу видно. Сервис на высшем уровне, ответили на все вопросы.',
    avatar: 'О',
  },
  {
    id: 4,
    name: 'Марина Т.',
    city: 'Екатеринбург',
    rating: 4,
    text: 'Браслет восхитительный, регулируется под любое запястье. Ношу каждый день, не снимая. Золото не тускнеет, камень не выпадает. Отличное вложение.',
    avatar: 'М',
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 mb-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= count ? 'text-gold' : 'text-velvet-border'} style={{ fontSize: '14px' }}>★</span>
    ))}
  </div>
);

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const total = REVIEWS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = [
    REVIEWS[current % total],
    REVIEWS[(current + 1) % total],
    REVIEWS[(current + 2) % total],
  ];

  return (
    <section className="bg-velvet-light py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cormorant text-cream text-center mb-12" style={{ fontSize: '36px' }}>
          Голоса наших клиентов
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="bg-velvet rounded-sm p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-gold flex items-center justify-center text-velvet font-cormorant font-bold text-2xl flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-cream font-montserrat font-semibold text-base">{review.name}</p>
                    <p className="text-stone font-montserrat text-sm">{review.city}</p>
                  </div>
                </div>
                <Stars count={review.rating} />
                <p className="text-stone font-montserrat font-light text-sm leading-relaxed flex-1">
                  «{review.text}»
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 border border-gold text-gold rounded-sm flex items-center justify-center hover:bg-gold hover:text-velvet transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current ? 'bg-gold w-6' : 'bg-velvet-border'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-gold text-gold rounded-sm flex items-center justify-center hover:bg-gold hover:text-velvet transition-all duration-200"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
