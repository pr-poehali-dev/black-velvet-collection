import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import ProductGrid from '@/components/ProductGrid';
import Collections from '@/components/Collections';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-velvet">
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <Hero />
        <Advantages />
        <ProductGrid />
        <Collections />
        <WhyUs />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
