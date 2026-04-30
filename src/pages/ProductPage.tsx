import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const PHOTOS = [1, 2, 3, 4, 5];

const SPECS = [
  { param: 'Металл', value: 'Серебро 925 пробы' },
  { param: 'Покрытие', value: 'Родиевое (черный родий)' },
  { param: 'Камень', value: 'Изумруд, натуральный' },
  { param: 'Вес камня', value: '2.5 карата' },
  { param: 'Огранка', value: 'Изумрудная' },
  { param: 'Размер камня', value: '8×6 мм' },
  { param: 'Длина цепочки', value: '45 см + регулятор 5 см' },
  { param: 'Тип застёжки', value: 'Лобстер' },
  { param: 'Вес изделия', value: '4.2 г' },
  { param: 'Страна производства', value: 'Россия' },
  { param: 'Гарантия', value: '1 год' },
];

const REVIEWS = [
  { id: 1, name: 'Анна К.', city: 'Москва', rating: 5, date: '15 марта 2026', text: 'Заказала колье в подарок подруге. Она была в восторге! Упаковка невероятная, качество — огонь. Обязательно вернусь за серьгами для себя.' },
  { id: 2, name: 'Мария Л.', city: 'Санкт-Петербург', rating: 5, date: '2 февраля 2026', text: 'Украшение выглядит даже лучше, чем на фото. Изумруд переливается, цепочка тонкая и изящная. Доставили в бархатной коробочке — всё продумано до мелочей.' },
  { id: 3, name: 'Елена Р.', city: 'Казань', rating: 4, date: '18 января 2026', text: 'Очень красивое колье, носить приятно. Единственное — хотела бы чуть длиннее цепочку, но в целом довольна. Сервис на высоте.' },
];

const CROSS_SELL = [
  { id: 10, name: 'Серьги «Изумрудные капли»', price: 8900, art: 'EM-43' },
  { id: 11, name: 'Браслет «Зелёный огонь»', price: 11400, art: 'EM-21' },
  { id: 12, name: 'Кольцо «Таинственный лес»', price: 7600, art: 'EM-15' },
  { id: 13, name: 'Брошь «Лесная фея»', price: 9200, art: 'EM-09' },
];

const SIMILAR = [
  { id: 20, name: 'Колье «Сапфировая ночь»', art: 'SP-11', price: 15800, rating: 5, reviews: 18 },
  { id: 21, name: 'Колье «Рубиновый закат»', art: 'RB-22', price: 14200, rating: 4, reviews: 9 },
  { id: 22, name: 'Колье «Звёздная пыль»', art: 'DM-07', price: 22500, rating: 5, reviews: 31 },
  { id: 23, name: 'Колье «Жемчужный туман»', art: 'PR-14', price: 9800, rating: 4, reviews: 12 },
];

const RECENTLY = [
  { id: 1, name: 'Колье «Изумрудная ночь»', art: 'EM-42', price: 12900, rating: 4 },
  { id: 2, name: 'Кольцо «Лесная фея»', art: 'EM-18', price: 8400, rating: 5 },
  { id: 3, name: 'Серьги «Капли рассвета»', art: 'RB-07', price: 6200, rating: 5 },
  { id: 4, name: 'Браслет «Вечность»', art: 'DM-33', price: 21500, rating: 4 },
];

const Stars = ({ count, size = 14 }: { count: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ fontSize: size, color: i <= count ? '#C6A43F' : '#3D3B3E' }}>★</span>
    ))}
  </div>
);

const PhotoPlaceholder = ({ label, small }: { label: string; small?: boolean }) => (
  <div
    className="w-full aspect-square flex items-center justify-center rounded-lg"
    style={{ background: '#111', minHeight: small ? undefined : 0 }}
  >
    <span className="font-cormorant text-gold opacity-30" style={{ fontSize: small ? 16 : 48, fontWeight: 300 }}>
      {label}
    </span>
  </div>
);

const ProductPage = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [selectedLength, setSelectedLength] = useState('45 см');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewAgreed, setReviewAgreed] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [crossSlide, setCrossSlide] = useState(0);
  const [similarSlide, setSimilarSlide] = useState(0);
  const [recentSlide, setRecentSlide] = useState(0);

  const tabs = [
    { key: 'description', label: 'Описание' },
    { key: 'specs', label: 'Характеристики' },
    { key: 'care', label: 'Уход' },
    { key: 'reviews', label: 'Отзывы' },
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewRating || !reviewText || !reviewAgreed) return;
    setReviewSent(true);
  };

  return (
    <div className="min-h-screen bg-velvet">
      <Header />

      <div className="pt-[80px]">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex flex-wrap items-center gap-2 font-montserrat text-sm text-stone">
            <a href="/" className="hover:text-gold transition-colors">Главная</a>
            <span className="text-velvet-border">→</span>
            <a href="/catalog" className="hover:text-gold transition-colors">Каталог</a>
            <span className="text-velvet-border">→</span>
            <a href="/catalog" className="hover:text-gold transition-colors">Колье</a>
            <span className="text-velvet-border">→</span>
            <span className="text-cream">Колье «Изумрудная ночь»</span>
          </nav>
        </div>

        {/* Main Block */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Gallery */}
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="overflow-hidden rounded-xl cursor-zoom-in">
                  <div className="transform group-hover:scale-110 transition-transform duration-500">
                    <PhotoPlaceholder label={`Фото ${activePhoto + 1}`} />
                  </div>
                </div>

                {/* Nav arrows */}
                <button
                  onClick={() => setActivePhoto(p => Math.max(0, p - 1))}
                  disabled={activePhoto === 0}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border transition-all z-10 ${
                    activePhoto === 0
                      ? 'border-velvet-border text-velvet-border cursor-not-allowed opacity-40'
                      : 'border-gold text-gold bg-velvet bg-opacity-70 hover:bg-gold hover:text-velvet'
                  }`}
                >
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <button
                  onClick={() => setActivePhoto(p => Math.min(PHOTOS.length - 1, p + 1))}
                  disabled={activePhoto === PHOTOS.length - 1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border transition-all z-10 ${
                    activePhoto === PHOTOS.length - 1
                      ? 'border-velvet-border text-velvet-border cursor-not-allowed opacity-40'
                      : 'border-gold text-gold bg-velvet bg-opacity-70 hover:bg-gold hover:text-velvet'
                  }`}
                >
                  <Icon name="ChevronRight" size={18} />
                </button>

                {/* Counter */}
                <div
                  className="absolute bottom-3 right-3 px-2 py-1 rounded font-montserrat text-cream text-xs"
                  style={{ background: 'rgba(28,27,29,0.7)' }}
                >
                  {activePhoto + 1} / {PHOTOS.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                    style={{
                      width: 80,
                      height: 80,
                      border: i === activePhoto ? '2px solid #C6A43F' : '2px solid #2F2E30',
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center" style={{ background: '#111' }}>
                      <span className="font-cormorant text-gold opacity-30" style={{ fontSize: 12 }}>
                        {i + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              {/* Name & Art */}
              <div className="mb-4">
                <h1 className="font-cormorant text-cream mb-2" style={{ fontSize: 32, fontWeight: 400 }}>
                  Колье «Изумрудная ночь»
                </h1>
                <p className="font-montserrat text-stone text-sm mb-3">Арт. EM-42</p>
                <div className="flex items-center gap-3">
                  <Stars count={4} size={16} />
                  <span className="font-montserrat text-sm text-stone">4.8 (14 отзывов)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-end gap-4 flex-wrap">
                <span className="font-montserrat font-bold" style={{ fontSize: 28, color: '#00A86B' }}>12 900 ₽</span>
                <span className="font-montserrat text-stone line-through" style={{ fontSize: 20 }}>15 900 ₽</span>
                <span className="font-montserrat text-sm" style={{ color: '#C6A43F' }}>Экономия 3 000 ₽</span>
              </div>

              {/* Description */}
              <p className="font-montserrat text-stone mb-6 leading-relaxed" style={{ fontSize: 15 }}>
                Изумруд весом 2.5 карата, огранка «изумруд». Цепочка из серебра 925 пробы с родиевым покрытием.
                Длина 45 см + регулятор 5 см.
              </p>

              {/* Length */}
              <div className="mb-6">
                <p className="font-montserrat text-stone text-sm mb-3">Размер / Длина:</p>
                <div className="flex gap-2 flex-wrap">
                  {['45 см', '50 см'].map(len => (
                    <button
                      key={len}
                      onClick={() => setSelectedLength(len)}
                      className="px-4 py-2 rounded-lg font-montserrat text-sm transition-all duration-200"
                      style={{
                        border: `1px solid ${selectedLength === len ? '#C6A43F' : '#3D3B3E'}`,
                        background: selectedLength === len ? 'rgba(198,164,63,0.12)' : 'transparent',
                        color: selectedLength === len ? '#E6E3DD' : '#9A9690',
                      }}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className="mb-6">
                <p className="font-montserrat text-stone text-sm mb-3">Количество:</p>
                <div className="flex items-center gap-0">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="flex items-center justify-center font-montserrat text-cream hover:text-gold transition-colors"
                    style={{ width: 40, height: 40, border: '1px solid #3D3B3E', borderRadius: '8px 0 0 8px' }}
                  >
                    −
                  </button>
                  <div
                    className="flex items-center justify-center font-montserrat text-cream"
                    style={{ width: 60, height: 40, background: '#2F2E30', border: '1px solid #3D3B3E', borderLeft: 'none', borderRight: 'none' }}
                  >
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="flex items-center justify-center font-montserrat text-cream hover:text-gold transition-colors"
                    style={{ width: 40, height: 40, border: '1px solid #3D3B3E', borderRadius: '0 8px 8px 0' }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full font-montserrat font-bold text-velvet rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ height: 52, background: '#00A86B', fontSize: 15 }}
                >
                  {addedToCart ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
                </button>
                <button
                  className="w-full font-montserrat font-bold rounded-lg transition-all duration-200 hover:bg-gold hover:text-velvet"
                  style={{ height: 52, border: '1px solid #C6A43F', color: '#C6A43F', background: 'transparent', fontSize: 15 }}
                >
                  Купить в 1 клик
                </button>
              </div>

              {/* Fav & Share */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setIsFav(!isFav)}
                  className="flex items-center gap-2 font-montserrat text-sm transition-colors"
                  style={{ color: isFav ? '#C6A43F' : '#9A9690' }}
                >
                  <Icon name="Heart" size={16} />
                  {isFav ? 'В избранном' : 'В избранное'}
                </button>
                <div className="flex items-center gap-3">
                  <span className="font-montserrat text-stone" style={{ fontSize: 12 }}>Поделиться:</span>
                  {[
                    { label: 'TG', title: 'Telegram' },
                    { label: 'VK', title: 'ВКонтакте' },
                    { label: 'WA', title: 'WhatsApp' },
                  ].map(s => (
                    <a
                      key={s.label}
                      href="#"
                      title={s.title}
                      className="w-8 h-8 border border-velvet-border text-gold font-montserrat font-semibold text-xs flex items-center justify-center rounded-sm hover:border-gold hover:bg-gold hover:text-velvet transition-all duration-200"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Delivery Accordion */}
              <div className="border border-velvet-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setDeliveryOpen(!deliveryOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 font-montserrat font-bold text-cream hover:bg-velvet-light transition-colors"
                  style={{ fontSize: 15 }}
                >
                  Доставка и оплата
                  <Icon name={deliveryOpen ? 'ChevronUp' : 'ChevronDown'} size={18} className="text-stone" />
                </button>
                {deliveryOpen && (
                  <div className="px-5 pb-5 space-y-3 border-t border-velvet-border" style={{ background: '#2F2E30' }}>
                    <div className="pt-4 space-y-2">
                      <p className="font-montserrat font-semibold text-cream text-sm">🚚 Доставка по России:</p>
                      <p className="font-montserrat text-stone text-xs pl-5">• Курьером по Москве — 350 ₽</p>
                      <p className="font-montserrat text-stone text-xs pl-5">• СДЭК — 450 ₽</p>
                      <p className="font-montserrat text-stone text-xs pl-5">• Почта России — 290 ₽</p>
                    </div>
                    <div>
                      <p className="font-montserrat text-stone text-xs">🎁 Самовывоз: бесплатно (Москва, ул. Тверская, 12)</p>
                    </div>
                    <div>
                      <p className="font-montserrat text-stone text-xs">💳 Оплата: картой онлайн, наличными при получении, оплата частями</p>
                    </div>
                    <div>
                      <p className="font-montserrat text-stone text-xs">🔄 Возврат: в течение 14 дней</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="border-b border-velvet-border mb-10 flex gap-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="pb-4 font-montserrat font-medium text-sm whitespace-nowrap transition-all duration-200 relative"
                style={{
                  color: activeTab === tab.key ? '#C6A43F' : '#9A9690',
                  borderBottom: activeTab === tab.key ? '2px solid #C6A43F' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <h3 className="font-cormorant text-cream mb-6" style={{ fontSize: 24, fontWeight: 400 }}>
                О колье «Изумрудная ночь»
              </h3>
              <p className="font-montserrat text-stone leading-relaxed" style={{ fontSize: 15 }}>
                Это колье — воплощение ночной эстетики и природной красоты. Изумруд весом 2.5 карата имеет насыщенный зелёный цвет и редкую «изумрудную» огранку, которая раскрывает глубину камня.
                <br /><br />
                Цепочка выполнена из серебра 925 пробы с родиевым покрытием, что придаёт металлу благородный блеск и защищает от потускнения. Удлинитель 5 см позволяет регулировать длину от 45 до 50 см.
                <br /><br />
                Каждое украшение «Черный бархат» создаётся вручную. Это означает, что вы получаете не просто аксессуар, а историю, которую будете носить с собой.
              </p>
            </div>
          )}

          {/* Specs */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full border-collapse">
                <tbody>
                  {SPECS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #3D3B3E' }}>
                      <td className="py-3 pr-6 font-montserrat text-cream text-sm" style={{ width: '40%', borderRight: '1px solid #3D3B3E' }}>
                        {row.param}
                      </td>
                      <td className="py-3 pl-6 font-montserrat text-stone text-sm">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Care */}
          {activeTab === 'care' && (
            <div className="max-w-3xl">
              <h3 className="font-cormorant text-cream mb-6" style={{ fontSize: 24, fontWeight: 400 }}>
                Как ухаживать за украшением
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  'Снимайте украшение перед сном, принятием душа, посещением бани или сауны.',
                  'Избегайте контакта с парфюмерией, кремами и бытовой химией.',
                  'Храните украшение в бархатном мешочке (идёт в подарок с каждым заказом) отдельно от других изделий.',
                  'Для чистки используйте мягкую фланелевую салфетку. Не используйте абразивные средства.',
                  'Раз в год рекомендуется профессиональная чистка у ювелира (мы проводим её бесплатно по гарантии).',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-sm"
                      style={{ background: '#C6A43F', color: '#fff' }}
                    >
                      ✨
                    </div>
                    <p className="font-montserrat text-stone text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg px-5 py-4 flex items-center gap-4" style={{ background: '#2F2E30', border: '1px solid #3D3B3E' }}>
                <span className="text-xl">🔧</span>
                <p className="font-montserrat text-stone text-sm">
                  <span className="text-cream font-semibold">Бесплатная чистка и полировка</span> — в любой из наших мастерских в течение гарантийного срока.
                </p>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-8">
                <h3 className="font-cormorant text-cream" style={{ fontSize: 24, fontWeight: 400 }}>
                  Отзывы покупателей
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-montserrat font-bold text-cream text-lg">4.8</span>
                  <Stars count={5} size={16} />
                  <span className="font-montserrat text-stone text-sm">На основе 14 отзывов</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {REVIEWS.map(r => (
                  <div key={r.id} className="rounded-lg p-5" style={{ background: '#2F2E30', border: '1px solid #3D3B3E' }}>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-cormorant font-bold text-velvet text-lg"
                        style={{ background: '#C6A43F' }}
                      >
                        {r.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                          <div>
                            <span className="font-montserrat font-semibold text-cream text-sm">{r.name}</span>
                            <span className="font-montserrat text-stone text-xs ml-2">{r.city}</span>
                          </div>
                          <span className="font-montserrat text-stone text-xs">{r.date}</span>
                        </div>
                        <Stars count={r.rating} size={13} />
                        <p className="font-montserrat text-stone text-sm mt-2 leading-relaxed">{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full font-montserrat font-semibold text-sm text-gold rounded-lg mb-12 transition-all hover:bg-gold hover:text-velvet"
                style={{ height: 44, border: '1px solid #C6A43F', background: 'transparent' }}>
                Показать ещё 5 отзывов
              </button>

              {/* Review Form */}
              <div className="rounded-xl p-6" style={{ background: '#2F2E30', border: '1px solid #3D3B3E' }}>
                <h4 className="font-montserrat font-bold text-cream mb-6" style={{ fontSize: 20 }}>Оставить отзыв</h4>
                {reviewSent ? (
                  <p className="font-montserrat text-sm" style={{ color: '#00A86B' }}>
                    Спасибо за отзыв! Он появится после проверки модератором.
                  </p>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-5">
                    <div>
                      <label className="block font-montserrat text-stone text-xs mb-2">Имя *</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        className="w-full font-montserrat text-cream text-sm px-4 py-3 rounded-lg outline-none focus:border-gold transition-colors"
                        style={{ background: '#1C1B1D', border: '1px solid #3D3B3E' }}
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat text-stone text-xs mb-2">Рейтинг *</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{ fontSize: 28, color: star <= (hoverRating || reviewRating) ? '#C6A43F' : '#3D3B3E', transition: 'color 0.15s' }}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-montserrat text-stone text-xs mb-2">Текст отзыва *</label>
                      <textarea
                        rows={4}
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        className="w-full font-montserrat text-cream text-sm px-4 py-3 rounded-lg outline-none focus:border-gold transition-colors resize-none"
                        style={{ background: '#1C1B1D', border: '1px solid #3D3B3E' }}
                        placeholder="Расскажите о своём впечатлении..."
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat text-stone text-xs mb-2">Фото (необязательно)</label>
                      <button
                        type="button"
                        className="font-montserrat text-stone text-xs px-4 py-2 rounded-lg border border-velvet-border hover:border-gold hover:text-gold transition-all"
                      >
                        + Загрузить фото
                      </button>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setReviewAgreed(!reviewAgreed)}
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all ${reviewAgreed ? 'bg-gold border-gold' : 'border-velvet-border'}`}
                      >
                        {reviewAgreed && <Icon name="Check" size={10} className="text-velvet" />}
                      </div>
                      <span className="font-montserrat text-stone text-xs">Я согласен с условиями обработки данных</span>
                    </label>
                    <button
                      type="submit"
                      className="font-montserrat font-bold text-velvet text-sm px-8 py-3 rounded-lg transition-all hover:opacity-90"
                      style={{ background: '#C6A43F', height: 48 }}
                    >
                      Отправить отзыв
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cross-sell */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <h3 className="font-cormorant text-cream mb-8" style={{ fontSize: 24, fontWeight: 400 }}>
            С этим товаром покупают
          </h3>
          <div className="relative">
            <button
              onClick={() => setCrossSlide(s => Math.max(0, s - 1))}
              disabled={crossSlide === 0}
              className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                crossSlide === 0 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
              }`}
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <div className="overflow-hidden">
              <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${crossSlide * (200 + 16)}px)` }}>
                {CROSS_SELL.map(item => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                    style={{ width: 200, background: '#2F2E30', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                    <div className="flex items-center justify-center" style={{ width: 200, height: 120, background: '#111' }}>
                      <span className="font-cormorant text-gold opacity-20" style={{ fontSize: 20 }}>●</span>
                    </div>
                    <div className="p-3">
                      <p className="font-montserrat text-cream text-xs mb-1 line-clamp-1">{item.name}</p>
                      <p className="font-montserrat font-bold text-sm mb-2" style={{ color: '#00A86B' }}>
                        {item.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <button className="w-full font-montserrat font-semibold text-xs text-velvet rounded transition-all hover:opacity-90"
                        style={{ background: '#00A86B', height: 32 }}>
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setCrossSlide(s => Math.min(CROSS_SELL.length - 3, s + 1))}
              disabled={crossSlide >= CROSS_SELL.length - 3}
              className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                crossSlide >= CROSS_SELL.length - 3 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
              }`}
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* Similar */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <h3 className="font-cormorant text-cream mb-8" style={{ fontSize: 24, fontWeight: 400 }}>
            Вам также может понравиться
          </h3>
          <div className="relative">
            <button
              onClick={() => setSimilarSlide(s => Math.max(0, s - 1))}
              disabled={similarSlide === 0}
              className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                similarSlide === 0 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
              }`}
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <div className="overflow-hidden">
              <div className="flex gap-6 transition-transform duration-300" style={{ transform: `translateX(-${similarSlide * (260 + 24)}px)` }}>
                {SIMILAR.map(item => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                    style={{ width: 260, background: '#2F2E30', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                    <div className="aspect-square flex items-center justify-center" style={{ background: '#111' }}>
                      <span className="font-cormorant text-gold opacity-20" style={{ fontSize: 32 }}>●</span>
                    </div>
                    <div className="p-4">
                      <p className="font-montserrat text-cream font-medium text-sm mb-1 line-clamp-2">{item.name}</p>
                      <p className="font-montserrat text-stone text-xs mb-2">Арт. {item.art}</p>
                      <p className="font-montserrat font-bold mb-2" style={{ color: '#00A86B', fontSize: 18 }}>
                        {item.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <Stars count={item.rating} size={12} />
                        <span className="font-montserrat text-stone text-xs">({item.reviews})</span>
                      </div>
                      <button className="w-full font-montserrat font-semibold text-xs text-velvet rounded transition-all hover:opacity-90"
                        style={{ background: '#00A86B', height: 36 }}>
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setSimilarSlide(s => Math.min(SIMILAR.length - 3, s + 1))}
              disabled={similarSlide >= SIMILAR.length - 3}
              className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                similarSlide >= SIMILAR.length - 3 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
              }`}
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <h3 className="font-cormorant text-cream mb-8" style={{ fontSize: 24, fontWeight: 400 }}>
            Вы недавно смотрели
          </h3>
          {RECENTLY.length === 0 ? (
            <p className="font-montserrat text-stone text-sm">Здесь появятся товары, которые вы просматривали.</p>
          ) : (
            <div className="relative">
              <button
                onClick={() => setRecentSlide(s => Math.max(0, s - 1))}
                disabled={recentSlide === 0}
                className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  recentSlide === 0 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
                }`}
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <div className="overflow-hidden">
                <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${recentSlide * (220 + 16)}px)` }}>
                  {RECENTLY.map(item => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                      style={{ width: 220, background: '#2F2E30', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      <div className="aspect-square flex items-center justify-center" style={{ background: '#111' }}>
                        <span className="font-cormorant text-gold opacity-20" style={{ fontSize: 28 }}>●</span>
                      </div>
                      <div className="p-3">
                        <p className="font-montserrat text-cream text-xs mb-1 line-clamp-2 leading-snug">{item.name}</p>
                        <p className="font-montserrat text-stone text-xs mb-1">Арт. {item.art}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-montserrat font-bold text-sm" style={{ color: '#00A86B' }}>
                            {item.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <Stars count={item.rating} size={11} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setRecentSlide(s => Math.min(RECENTLY.length - 4, s + 1))}
                disabled={recentSlide >= RECENTLY.length - 4}
                className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  recentSlide >= RECENTLY.length - 4 ? 'border-velvet-border text-velvet-border cursor-not-allowed' : 'border-gold text-gold hover:bg-gold hover:text-velvet'
                }`}
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
