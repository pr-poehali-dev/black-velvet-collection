import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const PRODUCTS = [
  { id: 1, name: 'Колье «Изумрудная ночь»', art: 'EM-42', price: 12900, rating: 4, reviews: 14, badge: 'Хит', category: 'Колье', material: 'Золото 585', stone: 'Изумруд' },
  { id: 2, name: 'Кольцо «Лесная фея»', art: 'EM-18', price: 8400, rating: 5, reviews: 27, badge: 'Новинка', category: 'Кольца', material: 'Серебро 925', stone: 'Изумруд' },
  { id: 3, name: 'Серьги «Капли рассвета»', art: 'RB-07', price: 6200, rating: 5, reviews: 9, badge: null, category: 'Серьги', material: 'Золото 750', stone: 'Рубин' },
  { id: 4, name: 'Браслет «Вечность»', art: 'DM-33', price: 21500, rating: 4, reviews: 6, badge: 'Хит', category: 'Браслеты', material: 'Платина 950', stone: 'Бриллиант' },
  { id: 5, name: 'Колье «Морская глубина»', art: 'SP-11', price: 15800, rating: 5, reviews: 18, badge: null, category: 'Колье', material: 'Золото 585', stone: 'Сапфир' },
  { id: 6, name: 'Кольцо «Пурпурный закат»', art: 'AM-05', price: 7300, rating: 4, reviews: 11, badge: 'Новинка', category: 'Кольца', material: 'Серебро 925', stone: 'Аметист' },
  { id: 7, name: 'Серьги «Жемчужный шёпот»', art: 'PR-22', price: 5600, rating: 5, reviews: 31, badge: 'Хит', category: 'Серьги', material: 'Родиевое покрытие', stone: 'Жемчуг' },
  { id: 8, name: 'Брошь «Золотая ветвь»', art: 'GR-14', price: 9100, rating: 4, reviews: 4, badge: null, category: 'Броши', material: 'Золото 585', stone: 'Гранат' },
  { id: 9, name: 'Браслет «Небесный свет»', art: 'TP-08', price: 11200, rating: 5, reviews: 8, badge: null, category: 'Браслеты', material: 'Серебро 925', stone: 'Топаз' },
];

const RECENTLY_VIEWED = [
  { id: 1, name: 'Колье «Изумрудная ночь»', art: 'EM-42', price: 12900, rating: 4 },
  { id: 2, name: 'Кольцо «Лесная фея»', art: 'EM-18', price: 8400, rating: 5 },
  { id: 3, name: 'Серьги «Капли рассвета»', art: 'RB-07', price: 6200, rating: 5 },
  { id: 4, name: 'Браслет «Вечность»', art: 'DM-33', price: 21500, rating: 4 },
  { id: 5, name: 'Колье «Морская глубина»', art: 'SP-11', price: 15800, rating: 5 },
];

const CATEGORIES = [
  { label: 'Все товары', count: 56 },
  { label: 'Кольца', count: 24 },
  { label: 'Серьги', count: 18 },
  { label: 'Колье', count: 12 },
  { label: 'Браслеты', count: 15 },
  { label: 'Броши', count: 6 },
];
const MATERIALS = [
  { label: 'Серебро 925', count: 35 },
  { label: 'Золото 585', count: 18 },
  { label: 'Золото 750', count: 7 },
  { label: 'Платина 950', count: 3 },
  { label: 'Родиевое покрытие', count: 12 },
];
const STONES = [
  { label: 'Изумруд', count: 28 },
  { label: 'Бриллиант', count: 12 },
  { label: 'Рубин', count: 5 },
  { label: 'Сапфир', count: 8 },
  { label: 'Жемчуг', count: 6 },
  { label: 'Аметист', count: 4 },
  { label: 'Гранат', count: 3 },
  { label: 'Топаз', count: 7 },
];
const COLORS = [
  { label: 'Зеленый', count: 28 },
  { label: 'Белый / прозрачный', count: 15 },
  { label: 'Синий', count: 8 },
  { label: 'Красный', count: 5 },
  { label: 'Розовый', count: 4 },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= count ? 'text-gold' : 'text-velvet-border'} style={{ fontSize: '12px' }}>★</span>
    ))}
  </div>
);

const ProductPhoto = ({ name }: { name: string }) => {
  const colors = ['#1a1a1a', '#111', '#0f0f0f', '#161616'];
  const color = colors[name.length % colors.length];
  const initials = name.replace(/[«»"]/g, '').trim().split(' ').slice(0, 2).map(w => w[0]).join('');
  return (
    <div className="aspect-square rounded-t-lg flex items-center justify-center" style={{ background: color }}>
      <span className="font-cormorant text-gold opacity-40" style={{ fontSize: '32px', fontWeight: 300 }}>{initials}</span>
    </div>
  );
};

const FilterSection = ({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-velvet-border pb-4 mb-4">
    <button
      className="w-full flex items-center justify-between text-cream font-montserrat font-semibold text-sm uppercase tracking-wider mb-3"
      onClick={onToggle}
    >
      {title}
      <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-stone" />
    </button>
    {open && <div className="space-y-2">{children}</div>}
  </div>
);

const CheckboxItem = ({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
        checked ? 'bg-gold border-gold' : 'border-velvet-border group-hover:border-stone'
      }`}
    >
      {checked && <Icon name="Check" size={10} className="text-velvet" />}
    </div>
    <span className="text-stone font-montserrat text-xs group-hover:text-cream transition-colors flex-1">
      {label}
    </span>
    {count !== undefined && (
      <span className="text-stone font-montserrat text-xs opacity-60">({count})</span>
    )}
  </label>
);

const CatalogPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);
  const [inStock, setInStock] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [openFilters, setOpenFilters] = useState({
    category: true,
    price: true,
    material: false,
    stone: false,
    color: false,
  });
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedMaterials, setCheckedMaterials] = useState<string[]>([]);
  const [checkedStones, setCheckedStones] = useState<string[]>([]);
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [recentSlide, setRecentSlide] = useState(0);

  const toggleFilter = (key: keyof typeof openFilters) => {
    setOpenFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const resetFilters = () => {
    setCheckedCategories([]);
    setCheckedMaterials([]);
    setCheckedStones([]);
    setCheckedColors([]);
    setPriceMin(0);
    setPriceMax(100000);
    setInStock(true);
  };

  const totalPages = 5;

  return (
    <div className="min-h-screen bg-velvet">
      <Header />

      <div className="pt-[80px]">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 font-montserrat text-sm text-stone">
            <a href="/" className="hover:text-gold transition-colors">Главная</a>
            <span className="text-velvet-border">→</span>
            <span className="text-gold">Каталог</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <h1 className="font-cormorant text-cream" style={{ fontSize: '36px', fontWeight: 400 }}>
            Каталог украшений
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex gap-8 items-start">

            {/* Filters Sidebar */}
            <aside className="hidden lg:block flex-shrink-0" style={{ width: '280px' }}>
              <div className="bg-velvet-light rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-cream font-montserrat font-bold text-base uppercase tracking-wider">Фильтры</h2>
                  <button
                    onClick={resetFilters}
                    className="text-gold font-montserrat text-xs hover:text-cream transition-colors flex items-center gap-1"
                  >
                    Сбросить все <span>✕</span>
                  </button>
                </div>

                {/* Category */}
                <FilterSection title="Категория" open={openFilters.category} onToggle={() => toggleFilter('category')}>
                  {CATEGORIES.map(c => (
                    <CheckboxItem
                      key={c.label}
                      label={c.label}
                      count={c.count}
                      checked={checkedCategories.includes(c.label)}
                      onChange={() => setCheckedCategories(prev =>
                        prev.includes(c.label) ? prev.filter(x => x !== c.label) : [...prev, c.label]
                      )}
                    />
                  ))}
                </FilterSection>

                {/* Price */}
                <FilterSection title="Цена" open={openFilters.price} onToggle={() => toggleFilter('price')}>
                  <div className="relative h-5 mb-4 mt-2">
                    <div className="absolute top-2 left-0 right-0 h-1 rounded-full bg-velvet-border" />
                    <div
                      className="absolute top-2 h-1 rounded-full bg-gold"
                      style={{
                        left: `${(priceMin / 100000) * 100}%`,
                        right: `${100 - (priceMax / 100000) * 100}%`,
                      }}
                    />
                    <input
                      type="range" min={0} max={100000} step={500}
                      value={priceMin}
                      onChange={e => setPriceMin(Math.min(+e.target.value, priceMax - 500))}
                      className="absolute w-full top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <input
                      type="range" min={0} max={100000} step={500}
                      value={priceMax}
                      onChange={e => setPriceMax(Math.max(+e.target.value, priceMin + 500))}
                      className="absolute w-full top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <div className="flex-1">
                      <span className="text-stone font-montserrat text-xs block mb-1">от</span>
                      <div className="flex items-center bg-velvet border border-velvet-border rounded px-2 py-1.5">
                        <input
                          type="number"
                          value={priceMin}
                          onChange={e => setPriceMin(+e.target.value)}
                          className="bg-transparent text-cream font-montserrat text-xs w-full outline-none"
                        />
                        <span className="text-stone text-xs ml-1">₽</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-stone font-montserrat text-xs block mb-1">до</span>
                      <div className="flex items-center bg-velvet border border-velvet-border rounded px-2 py-1.5">
                        <input
                          type="number"
                          value={priceMax}
                          onChange={e => setPriceMax(+e.target.value)}
                          className="bg-transparent text-cream font-montserrat text-xs w-full outline-none"
                        />
                        <span className="text-stone text-xs ml-1">₽</span>
                      </div>
                    </div>
                  </div>
                </FilterSection>

                {/* Material */}
                <FilterSection title="Материал" open={openFilters.material} onToggle={() => toggleFilter('material')}>
                  {MATERIALS.map(m => (
                    <CheckboxItem
                      key={m.label}
                      label={m.label}
                      count={m.count}
                      checked={checkedMaterials.includes(m.label)}
                      onChange={() => setCheckedMaterials(prev =>
                        prev.includes(m.label) ? prev.filter(x => x !== m.label) : [...prev, m.label]
                      )}
                    />
                  ))}
                </FilterSection>

                {/* Stone */}
                <FilterSection title="Камень" open={openFilters.stone} onToggle={() => toggleFilter('stone')}>
                  {STONES.map(s => (
                    <CheckboxItem
                      key={s.label}
                      label={s.label}
                      count={s.count}
                      checked={checkedStones.includes(s.label)}
                      onChange={() => setCheckedStones(prev =>
                        prev.includes(s.label) ? prev.filter(x => x !== s.label) : [...prev, s.label]
                      )}
                    />
                  ))}
                </FilterSection>

                {/* Color */}
                <FilterSection title="Цвет камня" open={openFilters.color} onToggle={() => toggleFilter('color')}>
                  {COLORS.map(c => (
                    <CheckboxItem
                      key={c.label}
                      label={c.label}
                      count={c.count}
                      checked={checkedColors.includes(c.label)}
                      onChange={() => setCheckedColors(prev =>
                        prev.includes(c.label) ? prev.filter(x => x !== c.label) : [...prev, c.label]
                      )}
                    />
                  ))}
                </FilterSection>

                {/* In Stock */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setInStock(!inStock)}
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                        inStock ? 'bg-gold border-gold' : 'border-velvet-border group-hover:border-stone'
                      }`}
                    >
                      {inStock && <Icon name="Check" size={10} className="text-velvet" />}
                    </div>
                    <span className="text-stone font-montserrat text-xs group-hover:text-cream transition-colors">
                      Только в наличии
                    </span>
                  </label>
                </div>

                <button className="w-full font-montserrat font-semibold text-sm text-velvet rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]" style={{ background: '#00A86B', height: '48px' }}>
                  Применить фильтры
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Sort & Count Row */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-stone font-montserrat text-sm">Найдено <span className="text-cream">24</span> украшения</span>
                <div className="flex items-center gap-3">
                  <span className="text-stone font-montserrat text-sm">Сортировать:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="font-montserrat text-sm text-cream rounded px-3 py-2 outline-none border border-velvet-border focus:border-gold transition-colors cursor-pointer"
                    style={{ background: '#2F2E30' }}
                  >
                    <option value="popular">По популярности</option>
                    <option value="price_asc">Цена: по возрастанию</option>
                    <option value="price_desc">Цена: по убыванию</option>
                    <option value="new">Сначала новинки</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map(product => (
                  <div
                    key={product.id}
                    className="rounded-lg overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: '#2F2E30', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                  >
                    {/* Photo */}
                    <div className="relative">
                      <ProductPhoto name={product.name} />
                      {product.badge && (
                        <span
                          className="absolute top-3 left-3 font-montserrat font-bold text-velvet rounded px-2 py-0.5"
                          style={{ background: '#C6A43F', fontSize: '10px', letterSpacing: '0.05em' }}
                        >
                          {product.badge.toUpperCase()}
                        </span>
                      )}
                      <button
                        onClick={() => toggleFav(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ background: 'rgba(28,27,29,0.7)' }}
                      >
                        <Icon
                          name={favorites.includes(product.id) ? 'Heart' : 'Heart'}
                          size={16}
                          className={favorites.includes(product.id) ? 'text-red-400' : 'text-gold'}
                        />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-cream font-montserrat font-medium text-sm mb-1 leading-snug line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-stone font-montserrat text-xs mb-2">Арт. {product.art}</p>
                      <p className="font-montserrat font-bold mb-2" style={{ color: '#00A86B', fontSize: '16px' }}>
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <Stars count={product.rating} />
                        <span className="text-stone font-montserrat text-xs">({product.reviews})</span>
                      </div>
                      <button
                        className="w-full font-montserrat font-semibold text-xs text-velvet rounded transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                        style={{ background: '#00A86B', height: '40px' }}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setActivePage(p => Math.max(1, p - 1))}
                  disabled={activePage === 1}
                  className={`w-9 h-9 flex items-center justify-center rounded transition-all ${
                    activePage === 1 ? 'text-velvet-border cursor-not-allowed' : 'text-gold hover:bg-velvet-light'
                  }`}
                >
                  <Icon name="ChevronLeft" size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded font-montserrat text-sm transition-all duration-200 ${
                      activePage === page
                        ? 'border border-gold text-gold'
                        : 'text-stone hover:text-cream hover:bg-velvet-light'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
                  disabled={activePage === totalPages}
                  className={`w-9 h-9 flex items-center justify-center rounded transition-all ${
                    activePage === totalPages ? 'text-velvet-border cursor-not-allowed' : 'text-gold hover:bg-velvet-light'
                  }`}
                >
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Recently Viewed */}
          <div className="mt-20">
            <h3 className="font-cormorant text-cream mb-8" style={{ fontSize: '24px', fontWeight: 400 }}>
              Вы недавно смотрели
            </h3>
            <div className="relative">
              <button
                onClick={() => setRecentSlide(s => Math.max(0, s - 1))}
                disabled={recentSlide === 0}
                className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  recentSlide === 0
                    ? 'border-velvet-border text-velvet-border cursor-not-allowed'
                    : 'border-gold text-gold hover:bg-gold hover:text-velvet'
                }`}
              >
                <Icon name="ChevronLeft" size={16} />
              </button>

              <div className="overflow-hidden">
                <div
                  className="flex gap-4 transition-transform duration-300"
                  style={{ transform: `translateX(-${recentSlide * (220 + 16)}px)` }}
                >
                  {RECENTLY_VIEWED.map(item => (
                    <div
                      key={item.id}
                      className="rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                      style={{ width: '220px', background: '#2F2E30', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    >
                      <ProductPhoto name={item.name} />
                      <div className="p-3">
                        <p className="text-cream font-montserrat font-medium text-xs mb-1 line-clamp-2 leading-snug">{item.name}</p>
                        <p className="text-stone font-montserrat text-xs mb-1">Арт. {item.art}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-montserrat font-bold text-sm" style={{ color: '#00A86B' }}>
                            {item.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <Stars count={item.rating} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setRecentSlide(s => Math.min(RECENTLY_VIEWED.length - 4, s + 1))}
                disabled={recentSlide >= RECENTLY_VIEWED.length - 4}
                className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  recentSlide >= RECENTLY_VIEWED.length - 4
                    ? 'border-velvet-border text-velvet-border cursor-not-allowed'
                    : 'border-gold text-gold hover:bg-gold hover:text-velvet'
                }`}
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CatalogPage;
