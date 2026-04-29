import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

const PRODUCTS = [
  {
    id: 1,
    name: 'Кольцо «Изумрудный туман»',
    sku: 'CB-R-001',
    price: 12500,
    rating: 5,
    stone: 'Изумруд',
    metal: 'Золото',
    size: '17',
    category: 'hits',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/c359e985-a408-45cb-8266-6e9355ebe258.jpg',
  },
  {
    id: 2,
    name: 'Серьги «Ночной шёпот»',
    sku: 'CB-E-002',
    price: 8900,
    rating: 5,
    stone: 'Изумруд',
    metal: 'Серебро',
    size: 'Нет',
    category: 'hits',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2d0afa63-f866-4c67-8233-df24bc0f5d10.jpg',
  },
  {
    id: 3,
    name: 'Колье «Каменный сон»',
    sku: 'CB-N-003',
    price: 19800,
    rating: 4,
    stone: 'Бриллиант',
    metal: 'Золото',
    size: 'Нет',
    category: 'hits',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2ed8aefd-c080-4943-b32d-0cb336831470.jpg',
  },
  {
    id: 4,
    name: 'Браслет «Объятие ночи»',
    sku: 'CB-B-004',
    price: 7200,
    rating: 5,
    stone: 'Изумруд',
    metal: 'Серебро',
    size: 'S-L',
    category: 'hits',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/e095d6ff-ba60-4f06-a869-788a5f29aee1.jpg',
  },
  {
    id: 5,
    name: 'Кольцо «Тайна бархата»',
    sku: 'CB-R-005',
    price: 15600,
    rating: 4,
    stone: 'Рубин',
    metal: 'Золото',
    size: '18',
    category: 'new',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/c359e985-a408-45cb-8266-6e9355ebe258.jpg',
  },
  {
    id: 6,
    name: 'Серьги «Золотая дымка»',
    sku: 'CB-E-006',
    price: 6500,
    rating: 5,
    stone: 'Сапфир',
    metal: 'Золото',
    size: 'Нет',
    category: 'new',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2d0afa63-f866-4c67-8233-df24bc0f5d10.jpg',
  },
  {
    id: 7,
    name: 'Колье «Лунный свет»',
    sku: 'CB-N-007',
    price: 22300,
    rating: 5,
    stone: 'Жемчуг',
    metal: 'Серебро',
    size: 'Нет',
    category: 'new',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2ed8aefd-c080-4943-b32d-0cb336831470.jpg',
  },
  {
    id: 8,
    name: 'Браслет «Серебряный туман»',
    sku: 'CB-B-008',
    price: 5400,
    rating: 4,
    stone: 'Аметист',
    metal: 'Серебро',
    size: 'S-M',
    category: 'new',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/e095d6ff-ba60-4f06-a869-788a5f29aee1.jpg',
  },
];

const STONES = ['Все', 'Изумруд', 'Бриллиант', 'Рубин', 'Сапфир', 'Жемчуг', 'Аметист'];
const METALS = ['Все', 'Золото', 'Серебро'];
const SIZES = ['Все', '16', '17', '18', '19', 'S-M', 'S-L', 'Нет'];
const MIN_PRICE = 0;
const MAX_PRICE = 30000;

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= count ? 'text-gold' : 'text-velvet-border'} style={{ fontSize: '13px' }}>★</span>
    ))}
  </div>
);

const ProductGrid = () => {
  const [activeTab, setActiveTab] = useState<'hits' | 'new'>('hits');
  const [stone, setStone] = useState('Все');
  const [metal, setMetal] = useState('Все');
  const [size, setSize] = useState('Все');
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (p.category !== activeTab) return false;
      if (stone !== 'Все' && p.stone !== stone) return false;
      if (metal !== 'Все' && p.metal !== metal) return false;
      if (size !== 'Все' && p.size !== size) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [activeTab, stone, metal, size, priceRange]);

  const formatPrice = (v: number) => v.toLocaleString('ru-RU') + ' ₽';

  const FilterChip = ({
    options,
    value,
    onChange,
  }: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 text-xs font-montserrat rounded-sm border transition-all duration-200 ${
            value === opt
              ? 'bg-gold text-velvet border-gold'
              : 'bg-transparent text-stone border-velvet-border hover:border-gold hover:text-cream'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <section id="catalog" className="bg-velvet py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cormorant text-cream text-center mb-4" style={{ fontSize: '36px' }}>
          Сейчас в тренде
        </h2>

        <div className="flex justify-center mb-10">
          <div className="flex gap-8 border-b border-velvet-border">
            {(['hits', 'new'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-montserrat text-sm font-medium tracking-wide transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-gold border-b-2 border-gold -mb-px'
                    : 'text-stone hover:text-cream'
                }`}
              >
                {tab === 'hits' ? 'Хиты продаж' : 'Новинки'}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-gold font-montserrat text-sm font-medium mb-4 hover:text-cream transition-colors lg:cursor-default"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
            <Icon name={filtersOpen ? 'ChevronUp' : 'ChevronDown'} size={14} className="lg:hidden" />
          </button>

          <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-velvet-light rounded-sm border border-velvet-border mb-6">
              <div>
                <p className="text-stone text-xs font-montserrat uppercase tracking-wider mb-3">Тип камня</p>
                <FilterChip options={STONES} value={stone} onChange={setStone} />
              </div>
              <div>
                <p className="text-stone text-xs font-montserrat uppercase tracking-wider mb-3">Металл</p>
                <FilterChip options={METALS} value={metal} onChange={setMetal} />
              </div>
              <div>
                <p className="text-stone text-xs font-montserrat uppercase tracking-wider mb-3">Размер</p>
                <FilterChip options={SIZES} value={size} onChange={setSize} />
              </div>
              <div>
                <p className="text-stone text-xs font-montserrat uppercase tracking-wider mb-3">
                  Цена: {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={500}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 500), priceRange[1]])
                    }
                    className="slider-container w-full"
                  />
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={500}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 500)])
                    }
                    className="slider-container w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone font-montserrat">
            По выбранным фильтрам товаров не найдено
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-velvet-light rounded-sm overflow-hidden card-hover cursor-pointer"
                style={{ padding: '0' }}
              >
                <div className="relative aspect-square overflow-hidden bg-velvet">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-cream font-montserrat font-medium text-sm mb-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-stone font-montserrat text-xs mb-2">{product.sku}</p>
                  <Stars count={product.rating} />
                  <p className="text-emerald font-montserrat font-semibold text-lg mt-2 mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <button className="w-full bg-emerald text-velvet font-montserrat font-medium text-sm py-2.5 rounded-sm hover:bg-emerald/90 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Icon name="ShoppingCart" size={15} />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
