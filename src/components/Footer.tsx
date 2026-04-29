const Footer = () => {
  const catalog = ['Кольца', 'Серьги', 'Колье', 'Браслеты'];
  const help = ['Доставка и оплата', 'Возврат', 'Частые вопросы', 'Политика конфиденциальности'];

  return (
    <footer id="contacts" className="bg-velvet border-t border-velvet-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-cormorant text-2xl font-semibold text-gradient-gold mb-4">
              Черный бархат
            </div>
            <p className="text-stone font-montserrat font-light text-sm leading-relaxed mb-4">
              Украшения ручной работы.<br />Сделано с любовью и изумрудом.
            </p>
            <p className="text-stone font-montserrat text-xs">© 2026 Черный бархат</p>
          </div>

          <div>
            <h4 className="text-cream font-montserrat font-semibold text-sm mb-5 uppercase tracking-wider">
              Каталог
            </h4>
            <ul className="space-y-3">
              {catalog.map((item) => (
                <li key={item}>
                  <a href="#catalog" className="text-stone font-montserrat font-light text-sm hover:text-gold transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-montserrat font-semibold text-sm mb-5 uppercase tracking-wider">
              Помощь
            </h4>
            <ul className="space-y-3">
              {help.map((item) => (
                <li key={item}>
                  <a href="#" className="text-stone font-montserrat font-light text-sm hover:text-gold transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-montserrat font-semibold text-sm mb-5 uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+79991234567" className="text-stone font-montserrat font-light text-sm hover:text-gold transition-colors">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@chernybarhat.ru" className="text-stone font-montserrat font-light text-sm hover:text-gold transition-colors">
                  info@chernybarhat.ru
                </a>
              </li>
              <li className="text-stone font-montserrat font-light text-sm">
                Москва, ул. Тверская, 12
              </li>
            </ul>

            <div className="flex gap-4">
              {[
                { label: 'TG', title: 'Telegram' },
                { label: 'IG', title: 'Instagram' },
                { label: 'VK', title: 'ВКонтакте' },
                { label: 'WA', title: 'WhatsApp' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.title}
                  className="w-9 h-9 border border-velvet-border text-gold font-montserrat font-semibold text-xs flex items-center justify-center rounded-sm hover:border-gold hover:bg-gold hover:text-velvet transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-velvet-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone font-montserrat text-xs">
            Принимаем к оплате:
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {['VISA', 'MC', 'МИР', 'SBP', 'Рассрочка'].map((method) => (
              <span
                key={method}
                className="px-3 py-1 border border-velvet-border text-stone font-montserrat text-xs rounded-sm"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
