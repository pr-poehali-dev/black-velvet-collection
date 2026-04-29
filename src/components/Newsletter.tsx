import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-velvet py-16 px-6">
      <div className="max-w-2xl mx-auto bg-velvet-light rounded-sm px-6 py-12 text-center" style={{ borderRadius: '16px' }}>
        <h3 className="font-cormorant text-cream mb-3" style={{ fontSize: '24px' }}>
          Будьте в курсе новинок и акций
        </h3>
        <p className="text-stone font-montserrat font-light text-sm mb-8 leading-relaxed">
          Подпишитесь на рассылку — получите персональную скидку 5% на первый заказ
        </p>

        {submitted ? (
          <div className="text-gold font-montserrat font-medium text-base py-4">
            ✨ Спасибо! Скидка уже на пути к вам
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="bg-velvet border border-velvet-border text-cream font-montserrat text-sm px-4 rounded-sm outline-none focus:border-gold transition-colors placeholder:text-stone"
                style={{ width: '280px', height: '48px' }}
              />
              <button
                type="submit"
                disabled={!agreed}
                className="bg-emerald text-velvet font-montserrat font-medium text-sm px-6 rounded-sm hover:bg-emerald/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                style={{ height: '48px' }}
              >
                Подписаться →
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              <span className="text-stone font-montserrat text-xs">
                Согласен(а) с обработкой персональных данных
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
