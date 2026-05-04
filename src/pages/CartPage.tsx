import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Колье «Изумрудная ночь»',
    art: 'EM-42',
    size: '45 см',
    price: 12900,
    qty: 1,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/bbe388e3-8152-498c-9585-9a9c0d907923.jpg',
  },
  {
    id: 2,
    name: 'Серьги «Лесная фея»',
    art: 'LF-07',
    size: null,
    price: 8500,
    qty: 1,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/fedb8f75-be55-4820-99e2-9c3ad043b128.jpg',
  },
];

const CROSS_SELL = [
  {
    id: 3,
    name: 'Кольцо «Пурпурный закат»',
    price: 7300,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/c12cbb64-0300-4bac-94dd-5de1174efcdc.jpg',
  },
  {
    id: 4,
    name: 'Браслет «Жемчужный шёпот»',
    price: 5600,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/90f9f36b-b657-4bc7-9132-9f53a1b0b395.jpg',
  },
  {
    id: 5,
    name: 'Колье «Морская глубина»',
    price: 15800,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/bbe388e3-8152-498c-9585-9a9c0d907923.jpg',
  },
  {
    id: 6,
    name: 'Серьги «Капли рассвета»',
    price: 6200,
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/fedb8f75-be55-4820-99e2-9c3ad043b128.jpg',
  },
];

const DELIVERY = 350;

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [crossSlide, setCrossSlide] = useState(0);

  const updateQty = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'BАРХАТ10') {
      setDiscount(Math.round(subtotal * 0.1));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - discount + (items.length > 0 ? DELIVERY : 0);

  const maxSlide = Math.max(0, CROSS_SELL.length - 3);

  return (
    <div className="min-h-screen bg-velvet">
      <Header />

      <div className="pt-[80px]">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 font-montserrat text-sm" style={{ color: '#9A9690' }}>
            <a href="/" className="hover:text-gold transition-colors">Главная</a>
            <span style={{ color: '#3D3B3E' }}>→</span>
            <span style={{ color: '#C6A43F' }}>Корзина</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <h1 className="font-cormorant text-cream" style={{ fontSize: '32px', fontWeight: 400 }}>
            Корзина
          </h1>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <Icon name="ShoppingCart" size={64} className="text-gold mx-auto mb-6 opacity-40" />
              <p className="font-cormorant text-cream text-2xl mb-3">Корзина пуста</p>
              <p className="font-montserrat text-sm mb-8" style={{ color: '#9A9690' }}>
                Добавьте украшения из каталога
              </p>
              <button
                onClick={() => navigate('/catalog')}
                className="font-montserrat font-semibold text-sm px-8 py-3 rounded border transition-colors hover:bg-gold hover:text-velvet"
                style={{ borderColor: '#C6A43F', color: '#C6A43F' }}
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* Left — table */}
              <div className="flex-1 min-w-0">
                {/* Table header */}
                <div className="hidden md:grid rounded-t-lg px-4 py-3 font-montserrat text-xs uppercase tracking-wider"
                  style={{ background: '#2F2E30', color: '#9A9690', gridTemplateColumns: '80px 1fr 120px 120px 120px 40px', gap: '16px', alignItems: 'center' }}>
                  <div>Фото</div>
                  <div>Товар</div>
                  <div className="text-center">Цена</div>
                  <div className="text-center">Количество</div>
                  <div className="text-center">Сумма</div>
                  <div />
                </div>

                {/* Items */}
                <div className="divide-y" style={{ borderColor: '#3D3B3E' }}>
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="py-5 px-4 flex flex-col md:grid gap-4 items-center"
                      style={{
                        background: '#2F2E30',
                        gridTemplateColumns: '80px 1fr 120px 120px 120px 40px',
                      }}
                    >
                      {/* Photo */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded cursor-pointer flex-shrink-0"
                        onClick={() => navigate(`/product/${item.id}`)}
                      />

                      {/* Info */}
                      <div>
                        <p
                          className="font-montserrat font-medium text-sm cursor-pointer hover:text-gold transition-colors mb-1"
                          style={{ color: '#E6E3DD', fontSize: '16px' }}
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </p>
                        <p className="font-montserrat text-xs" style={{ color: '#9A9690' }}>Арт. {item.art}</p>
                        {item.size && (
                          <p className="font-montserrat text-xs mt-0.5" style={{ color: '#9A9690' }}>Размер: {item.size}</p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-center font-montserrat" style={{ color: '#E6E3DD', fontSize: '16px' }}>
                        {item.price.toLocaleString('ru-RU')} ₽
                      </div>

                      {/* Qty */}
                      <div className="flex items-center justify-center gap-0">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center font-montserrat text-cream hover:text-gold transition-colors rounded-l"
                          style={{ border: '1px solid #3D3B3E', background: '#1C1B1D' }}
                        >
                          −
                        </button>
                        <div
                          className="w-10 h-8 flex items-center justify-center font-montserrat text-sm font-medium"
                          style={{ border: '1px solid #3D3B3E', borderLeft: 'none', borderRight: 'none', background: '#1C1B1D', color: '#E6E3DD' }}
                        >
                          {item.qty}
                        </div>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center font-montserrat text-cream hover:text-gold transition-colors rounded-r"
                          style={{ border: '1px solid #3D3B3E', background: '#1C1B1D' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Sum */}
                      <div className="text-center font-montserrat font-semibold" style={{ color: '#E6E3DD', fontSize: '16px' }}>
                        {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                      </div>

                      {/* Delete */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="transition-colors duration-200"
                          style={{ color: '#9A9690' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#C6A43F')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#9A9690')}
                        >
                          <Icon name="Trash2" size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions under table */}
                <div className="flex items-center justify-between mt-5">
                  <a
                    href="/catalog"
                    className="font-montserrat text-sm flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ color: '#C6A43F' }}
                  >
                    <Icon name="ArrowLeft" size={14} />
                    Продолжить покупки
                  </a>
                  <button
                    onClick={clearCart}
                    className="font-montserrat text-sm hover:text-gold transition-colors"
                    style={{ color: '#9A9690' }}
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>

              {/* Right — summary */}
              <div className="w-full lg:w-80 flex-shrink-0 rounded-xl p-6" style={{ background: '#2F2E30' }}>
                <h2 className="font-montserrat font-bold mb-5" style={{ color: '#E6E3DD', fontSize: '20px' }}>
                  Итого
                </h2>

                {/* Promo */}
                <div className="mb-5">
                  <button
                    className="flex items-center justify-between w-full font-montserrat text-sm"
                    style={{ color: '#9A9690' }}
                    onClick={() => setPromoOpen(!promoOpen)}
                  >
                    <span>Есть промокод?</span>
                    <Icon name={promoOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </button>
                  {promoOpen && (
                    <div className="flex gap-2 mt-3">
                      <input
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="Введите промокод"
                        className="flex-1 font-montserrat text-sm px-3 rounded outline-none focus:border-gold transition-colors"
                        style={{ height: '40px', background: '#1C1B1D', border: '1px solid #3D3B3E', color: '#E6E3DD' }}
                      />
                      <button
                        onClick={applyPromo}
                        className="font-montserrat font-semibold text-sm px-4 rounded transition-colors hover:bg-gold hover:text-velvet"
                        style={{ height: '40px', border: '1px solid #C6A43F', color: '#C6A43F', background: 'transparent' }}
                      >
                        Применить
                      </button>
                    </div>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between font-montserrat text-sm" style={{ color: '#9A9690' }}>
                    <span>Товары ({items.length} шт.)</span>
                    <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-sm" style={{ color: '#9A9690' }}>
                    <span>Скидка</span>
                    <span>–{discount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-sm" style={{ color: '#9A9690' }}>
                    <span>Доставка</span>
                    <span>{DELIVERY.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <div className="h-px mb-4" style={{ background: '#3D3B3E' }} />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-montserrat font-bold" style={{ color: '#E6E3DD', fontSize: '16px' }}>Итого к оплате</span>
                  <span className="font-montserrat font-bold" style={{ color: '#00A86B', fontSize: '24px' }}>
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-3 mb-6">
                  <button
                    className="w-full font-montserrat font-semibold text-sm rounded-lg transition-opacity hover:opacity-90 active:scale-[0.98]"
                    style={{ background: '#C6A43F', color: '#1C1B1D', height: '52px' }}
                  >
                    Перейти к оформлению
                  </button>
                  <button
                    className="w-full font-montserrat font-semibold text-sm rounded-lg transition-colors hover:bg-emerald/10"
                    style={{ border: '1px solid #00A86B', color: '#00A86B', height: '52px', background: 'transparent' }}
                  >
                    Оформить в один клик
                  </button>
                </div>

                {/* Payment icons */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {['VISA', 'MC', 'МИР', 'SBP', 'Долями'].map(m => (
                    <span
                      key={m}
                      className="px-2 py-1 font-montserrat text-xs rounded-sm"
                      style={{ border: '1px solid #3D3B3E', color: '#9A9690' }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p className="font-montserrat text-xs mb-5" style={{ color: '#9A9690' }}>Принимаем к оплате</p>

                {/* Delivery info */}
                <div className="space-y-2 pt-4" style={{ borderTop: '1px solid #3D3B3E' }}>
                  <div className="flex items-start gap-2 font-montserrat text-xs" style={{ color: '#9A9690' }}>
                    <span>🚚</span>
                    <span>Доставка по России — от 290 ₽</span>
                  </div>
                  <div className="flex items-start gap-2 font-montserrat text-xs" style={{ color: '#9A9690' }}>
                    <span>📦</span>
                    <span>Самовывоз — бесплатно (Москва, ул. Тверская, 12)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cross-sell */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <h3 className="font-cormorant mb-8" style={{ color: '#E6E3DD', fontSize: '24px', fontWeight: 400 }}>
            Возможно, вам пригодится
          </h3>

          <div className="relative">
            {/* Arrow left */}
            <button
              onClick={() => setCrossSlide(s => Math.max(0, s - 1))}
              disabled={crossSlide === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                background: '#2F2E30',
                border: '1px solid #3D3B3E',
                color: crossSlide === 0 ? '#3D3B3E' : '#C6A43F',
              }}
            >
              <Icon name="ChevronLeft" size={18} />
            </button>

            {/* Slider */}
            <div className="overflow-hidden">
              <div
                className="flex gap-5 transition-transform duration-300"
                style={{ transform: `translateX(calc(-${crossSlide * (180 + 20)}px))` }}
              >
                {CROSS_SELL.map(product => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
                    style={{ width: '180px', background: '#2F2E30' }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ height: '120px' }}
                    />
                    <div className="p-3">
                      <p
                        className="font-montserrat text-xs mb-2 truncate"
                        style={{ color: '#E6E3DD', fontSize: '14px' }}
                      >
                        {product.name}
                      </p>
                      <p className="font-montserrat font-bold mb-3" style={{ color: '#00A86B', fontSize: '16px' }}>
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <button
                        className="w-full font-montserrat font-semibold rounded transition-opacity hover:opacity-90"
                        style={{ background: '#00A86B', color: '#1C1B1D', height: '32px', fontSize: '12px' }}
                        onClick={e => e.stopPropagation()}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow right */}
            <button
              onClick={() => setCrossSlide(s => Math.min(maxSlide, s + 1))}
              disabled={crossSlide >= maxSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                background: '#2F2E30',
                border: '1px solid #3D3B3E',
                color: crossSlide >= maxSlide ? '#3D3B3E' : '#C6A43F',
              }}
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
