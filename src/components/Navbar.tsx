import React from 'react';
import { signInWithPopup, GoogleAuthProvider, AuthError } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async () => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter italic dark:text-white">TAPLINK</Link>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('nav.howItWorks')}</Link>
            <Link to="/#shop" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('nav.shop')}</Link>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <Link 
                to="/dashboard"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                {t('nav.dashboard')}
              </Link>
            ) : (
              <Link 
                to="/auth"
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                {t('nav.getStarted')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
