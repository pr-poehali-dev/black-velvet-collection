const collections = [
  {
    title: 'Кольца-тайны',
    subtitle: 'Изумруд, серебро, золото',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/c359e985-a408-45cb-8266-6e9355ebe258.jpg',
    href: '#catalog',
  },
  {
    title: 'Серьги-шёпоты',
    subtitle: 'Каффы, гвоздики, длинные',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2d0afa63-f866-4c67-8233-df24bc0f5d10.jpg',
    href: '#catalog',
  },
  {
    title: 'Каменные сны',
    subtitle: 'Кулоны, чокеры, подвески',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/2ed8aefd-c080-4943-b32d-0cb336831470.jpg',
    href: '#catalog',
  },
  {
    title: 'Объятия ночи',
    subtitle: 'Браслеты с регулировкой',
    image: 'https://cdn.poehali.dev/projects/482b0cbf-80a6-47f7-ad6a-e96ec4d76b4a/files/e095d6ff-ba60-4f06-a869-788a5f29aee1.jpg',
    href: '#catalog',
  },
];

const Collections = () => {
  return (
    <section id="collections" className="bg-velvet-light py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cormorant text-cream text-center mb-12" style={{ fontSize: '36px' }}>
          Выберите свою историю
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <a
              key={col.title}
              href={col.href}
              className="group relative overflow-hidden rounded-sm aspect-[3/4] block cursor-pointer"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-velvet/90 via-velvet/30 to-transparent" />
              <div
                className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-cormorant text-cream font-medium mb-1" style={{ fontSize: '24px' }}>
                  {col.title}
                </h3>
                <p className="text-stone font-montserrat font-light text-sm mb-4">{col.subtitle}</p>
                <span className="inline-block px-4 py-2 border border-gold text-gold font-montserrat text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Выбрать
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
