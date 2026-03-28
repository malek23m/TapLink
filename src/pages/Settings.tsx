import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Shield, Bell, CreditCard, User } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8 lg:p-12 transition-colors duration-300" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-3xl mx-auto mb-12">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          {t('settings.back')}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('settings.title')}</h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-6">
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-50 dark:border-zinc-800">
            <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <User className="w-5 h-5" />
              {t('settings.account')}
            </h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold dark:text-white">{t('settings.email')}</div>
                <div className="text-sm text-gray-500 dark:text-zinc-400">{user?.email}</div>
              </div>
              <button className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('settings.change')}</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold dark:text-white">{t('settings.displayName')}</div>
                <div className="text-sm text-gray-500 dark:text-zinc-400">{user?.displayName}</div>
              </div>
              <button className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('settings.edit')}</button>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-50 dark:border-zinc-800">
            <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <Shield className="w-5 h-5" />
              {t('settings.security')}
            </h2>
          </div>
          <div className="p-8">
            <button className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('settings.resetPassword')}</button>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-50 dark:border-zinc-800">
            <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <Bell className="w-5 h-5" />
              {t('settings.notifications')}
            </h2>
          </div>
          <div className="p-8 flex items-center justify-between">
            <div className="font-bold text-sm dark:text-white">{t('settings.emailAlerts')}</div>
            <div className="w-12 h-6 bg-black dark:bg-white rounded-full relative">
              <div className={`absolute ${isRtl ? 'left-1' : 'right-1'} top-1 w-4 h-4 bg-white dark:bg-black rounded-full`} />
            </div>
          </div>
        </section>

        <div className="pt-12">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-4 text-sm font-bold text-red-600 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-2xl transition-all w-full justify-center"
          >
            <LogOut className="w-5 h-5" />
            {t('settings.signOut')}
          </button>
        </div>
      </main>
    </div>
  );
}
