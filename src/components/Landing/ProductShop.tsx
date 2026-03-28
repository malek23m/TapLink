import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const products = [
  {
    name: "Classic Matte Black",
    material: "PVC",
    price: "200 EGP",
    image: "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&q=80&w=800",
    badge: "Best Seller"
  }
];

export const ProductShop = () => {
  const { t } = useTranslation();

  return (
    <section id="shop" className="py-32 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 dark:text-white">{t('shop.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('shop.subtitle')}</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:underline dark:text-white">
            {t('shop.viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 mb-6 relative border border-gray-100 dark:border-zinc-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-white dark:bg-zinc-950 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm dark:text-white">
                    {product.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <ShoppingCart className="w-4 h-4" />
                    {t('shop.customize')}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.material}</p>
                </div>
                <div className="font-bold text-lg dark:text-white">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
