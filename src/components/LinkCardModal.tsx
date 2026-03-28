import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, CreditCard, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';

interface LinkCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkCardModal({ isOpen, onClose }: LinkCardModalProps) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [cardId, setCardId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isRtl = i18n.language === 'ar';

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || cardId.length < 12) return;

    setLoading(true);
    try {
      // Simulate API call to verify card ID
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user profile with card ID
      await updateDoc(doc(db, 'users', user.uid), {
        linkedCardId: cardId,
        cardLinkedAt: new Date()
      });

      setSuccess(true);
      toast.success(t('linkCard.success'));
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setCardId('');
      }, 2000);
    } catch (error) {
      console.error('Error linking card:', error);
      toast.error(t('linkCard.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <div 
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
                <CreditCard className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{t('linkCard.title')}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {t('linkCard.description')}
              </p>
            </div>

            {success ? (
              <div 
                className="text-center py-8"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="font-bold text-green-500">{t('linkCard.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleLink} className="space-y-6">
                <div>
                  <input 
                    type="text"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value.toUpperCase())}
                    placeholder={t('linkCard.placeholder')}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all dark:text-white"
                    maxLength={14}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading || cardId.length < 12}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('linkCard.linking')}
                    </>
                  ) : (
                    t('linkCard.button')
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                Linking your card allows you to share your profile instantly by tapping your card against any NFC-enabled smartphone.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
