import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { auth, handleFirestoreError, OperationType } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, Chrome, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === 'auth/popup-closed-by-user') {
        toast.error(t('auth.popupClosed'));
      } else {
        toast.error(t('auth.loginFailed'));
        console.error('Login failed', error);
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(t('auth.welcomeBack'));
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success(t('auth.accountCreated'));
      }
      navigate('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      console.error('Auth error', authError);
      
      switch (authError.code) {
        case 'auth/user-not-found':
          toast.error(t('auth.errors.userNotFound'));
          break;
        case 'auth/wrong-password':
          toast.error(t('auth.errors.wrongPassword'));
          break;
        case 'auth/email-already-in-use':
          toast.error(t('auth.errors.emailInUse'));
          break;
        case 'auth/weak-password':
          toast.error(t('auth.errors.weakPassword'));
          break;
        case 'auth/invalid-email':
          toast.error(t('auth.errors.invalidEmail'));
          break;
        case 'auth/operation-not-allowed':
          toast.error(t('auth.errors.operationNotAllowed'));
          break;
        default:
          toast.error(t('auth.errors.default'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6 transition-colors">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-bold tracking-tighter italic mb-8 inline-block dark:text-white">TAPLINK</Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">
            {isLogin ? t('auth.signIn') : t('auth.signUp')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-200 dark:border-zinc-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all dark:text-white"
          >
            <Chrome className="w-5 h-5" />
            {t('auth.google')}
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="bg-white dark:bg-black px-4 text-gray-400">{t('auth.orContinue')}</span>
          </div>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{t('auth.password')}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none dark:text-white"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? t('auth.processing') : isLogin ? t('auth.signIn') : t('auth.signUp')}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
