import React from 'react';
import { ArrowRight, Zap, Globe, Smartphone } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, AuthError } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const TapLinkHero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in window closed. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
        console.error('Login failed', error);
      }
    }
  };

  return (
    <section className="pt-40 pb-20 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto text-center">
        <div
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 dark:text-white">
            {t('hero.title')}<br />
            <span className="italic text-gray-400 dark:text-zinc-600">{t('hero.subtitle')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/auth"
              className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center gap-2 group"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#shop"
              className="px-10 py-5 rounded-full text-lg font-bold border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors dark:text-white"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>
        </div>

        <div 
          className="mt-24 relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 shadow-2xl border border-gray-100 dark:border-zinc-800"
        >
          <img 
            src="https://picsum.photos/seed/taplink/1920/1080" 
            alt="NFC Card Tap Demo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 text-left text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold tracking-widest uppercase">{t('hero.features.instant.title')}</span>
            </div>
            <p className="text-2xl font-bold">{t('hero.features.instant.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
