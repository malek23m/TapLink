import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { X, Smartphone, Loader2, CheckCircle2, Download, Apple } from 'lucide-react';
import { toast } from 'sonner';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isRtl = i18n.language === 'ar';

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Simulate pass generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      toast.success(t('wallet.ready'));
    } catch (error) {
      console.error('Error generating wallet pass:', error);
      toast.error('Failed to generate wallet pass');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-zinc-950 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl border border-gray-100 dark:border-zinc-900"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Apple className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{t('dashboard.addToWallet')}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Generate a digital business card that you can keep in your Apple Wallet for instant sharing even when offline.
              </p>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <p className="font-bold text-green-500">{t('wallet.ready')}</p>
                <button 
                  onClick={onClose}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('wallet.download')}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm dark:text-white">Digital Pass</div>
                      <div className="text-xs text-gray-500">v1.0.4</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: loading ? '100%' : '0%' }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="h-full bg-black dark:bg-white rounded-full"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('wallet.generating')}
                    </>
                  ) : (
                    t('dashboard.addToWallet')
                  )}
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-xs text-gray-400">
              Note: This feature requires an active internet connection to generate the initial pass.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
