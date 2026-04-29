import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Header = () => {
  const [cartCount] = useState(0);
  const [favCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'О магазине', href: '#about' },
    { label: 'Доставка и оплата', href: '#delivery' },
    { label: 'Блог', href: '#blog' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-velvet" style={{ height: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <a href="/" className="font-cormorant text-2xl font-semibold text-gradient-gold whitespace-nowrap">
            Черный бархат
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-cream text-sm font-montserrat font-light tracking-wide hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button className="text-gold hover:text-cream transition-colors duration-200">
              <Icon name="Search" size={20} />
            </button>
            <button className="text-gold hover:text-cream transition-colors duration-200 relative">
              <Icon name="Heart" size={20} />
              {favCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald text-velvet text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>
            <button className="text-gold hover:text-cream transition-colors duration-200 relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald text-velvet text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="lg:hidden text-gold"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
        <div className="h-px bg-gold opacity-40" />
      </header>

      {mobileOpen && (
        <div className="fixed top-[80px] left-0 right-0 z-40 bg-velvet border-t border-velvet-border lg:hidden">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-cream text-base font-montserrat font-light py-2 border-b border-velvet-border hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
