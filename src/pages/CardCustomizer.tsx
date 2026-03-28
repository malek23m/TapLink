import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShoppingCart, Check, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '../AuthContext';

const MATERIALS = [
  { id: 'pvc', name: 'Matte PVC', price: 200, colors: ['#000000', '#ffffff', '#1a365d'] },
];

export default function CardCustomizer() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedColor, setSelectedColor] = useState(MATERIALS[0].colors[0]);
  const [logo, setLogo] = useState<string | null>(null);
  const isRtl = i18n.language === 'ar';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8 lg:p-12 transition-colors duration-300" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors">
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            {t('customize.back')}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('customize.title')}</h1>
          <p className="text-gray-500 dark:text-zinc-400">{t('customize.subtitle')}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Preview Area */}
        <div className="flex flex-col items-center justify-center space-y-12">
          <div 
            className="w-full max-w-md aspect-[1.586/1] rounded-[1.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden preserve-3d"
            style={{ 
              backgroundColor: selectedColor,
              backgroundImage: selectedMaterial.id === 'wood' 
                ? 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)' 
                : selectedMaterial.id === 'metal'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)'
                : 'none'
            }}
          >
            {/* Realistic Lighting Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
            
            {/* Card Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="text-2xl font-black tracking-tighter italic" style={{ color: selectedColor === '#ffffff' ? '#000' : '#fff' }}>
                  TAPLINK
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <div className="w-5 h-5 border-2 border-white/40 rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center flex-1">
                {logo ? (
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="max-w-[140px] max-h-[140px] object-contain" 
                    style={{ filter: selectedColor === '#ffffff' ? 'none' : 'invert(1) brightness(200%)' }} 
                  />
                ) : (
                  <div className="text-white/10 text-xs font-black uppercase tracking-[0.3em] text-center">
                    {t('customize.laserEngraved')}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40" style={{ color: selectedColor === '#ffffff' ? '#000' : '#fff' }}>
                    {t('customize.nfcChip')}
                  </div>
                  <div className="text-[8px] font-medium tracking-widest opacity-30" style={{ color: selectedColor === '#ffffff' ? '#000' : '#fff' }}>
                    ID: {user?.uid.slice(0, 12).toUpperCase()}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-transparent border border-white/10" />
              </div>
            </div>
            
            {/* Brushed Metal Texture for Metal Cards */}
            {selectedMaterial.id === 'metal' && (
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
            )}
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              {t('customize.secureChip')}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <CreditCard className="w-4 h-4" />
              {t('customize.premiumFinish')}
            </div>
          </div>
        </div>

        {/* Customization Controls */}
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-10">
          <section>
            <h3 className="text-lg font-bold mb-6 dark:text-white">{t('customize.selectMaterial')}</h3>
            <div className="grid grid-cols-3 gap-4">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMaterial(m);
                    setSelectedColor(m.colors[0]);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedMaterial.id === m.id 
                      ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800' 
                      : 'border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 dark:text-white">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.price} EGP</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-6 dark:text-white">{t('customize.chooseColor')}</h3>
            <div className="flex gap-4">
              {selectedMaterial.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${
                    selectedColor === c ? 'border-black dark:border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-6 dark:text-white">{t('customize.uploadLogo')}</h3>
            <label className="block w-full p-8 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
              <div className="text-sm font-bold text-gray-400">{t('customize.uploadDesc')}</div>
              <div className="text-xs text-gray-300 mt-1">{t('customize.uploadHint')}</div>
            </label>
          </section>

          <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">{t('customize.totalPrice')}</div>
              <div className="text-3xl font-bold dark:text-white">{selectedMaterial.price} EGP</div>
            </div>
            <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {t('customize.addToCart')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
