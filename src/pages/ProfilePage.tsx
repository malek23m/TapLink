import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, limit, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Globe, 
  Mail, 
  Phone, 
  MessageCircle,
  Download,
  Share2,
  Check,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';
import { handleFirestoreError, OperationType } from '../firebase';
import { useTranslation } from 'react-i18next';

const LINK_ICONS: any = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  website: Globe,
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
};

export default function ProfilePage() {
  const { username } = useParams();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', note: '' });
  const [submittingLead, setSubmittingLead] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProfile({ id: querySnapshot.docs[0].id, ...data });
          
          // Record Tap Analytics
          try {
            await addDoc(collection(db, 'analytics'), {
              profileId: querySnapshot.docs[0].id,
              timestamp: serverTimestamp(),
              userAgent: navigator.userAgent,
              referrer: document.referrer
            });
          } catch (e) {
            // Silently fail analytics if it fails, don't break the profile view
            console.error('Analytics failed', e);
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users_by_username/${username}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleDownloadVCard = () => {
    if (!profile) return;
    
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.displayName}
EMAIL:${profile.email || ''}
TEL:${profile.phone || ''}
NOTE:${profile.bio || ''}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${profile.username}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSubmittingLead(true);
    try {
      await addDoc(collection(db, 'leads'), {
        profileId: profile.id,
        ...leadData,
        timestamp: serverTimestamp()
      });
      toast.success(t('profile.contactSuccess'));
      setShowLeadForm(false);
      setLeadData({ name: '', email: '', phone: '', note: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
      toast.error(t('profile.contactError'));
    } finally {
      setSubmittingLead(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-2xl font-bold tracking-tighter italic dark:text-white"
      >
        TAPLINK
      </motion.div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">{t('profile.notFound')}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{t('profile.notFoundDesc')}</p>
      <a href="/" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold">
        {t('profile.createOwn')}
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white pb-20 transition-colors">
      {/* Header / Cover */}
      <div className="h-48 bg-gray-100 dark:bg-zinc-900 relative overflow-hidden">
        {profile.coverURL && (
          <img src={profile.coverURL} alt="" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-md mx-auto px-6 -mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-950 bg-gray-200 dark:bg-zinc-800 mx-auto overflow-hidden shadow-xl mb-6">
            <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-1">{profile.displayName}</h1>
          <p className="text-gray-400 font-medium mb-6">@{profile.username}</p>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {profile.bio || "Digital creator & networking enthusiast."}
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <button 
              onClick={handleDownloadVCard}
              className="bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-black/10"
            >
              <Download className="w-5 h-5" />
              {t('profile.saveContact')}
            </button>
            <button 
              onClick={() => setShowLeadForm(true)}
              className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <UserPlus className="w-5 h-5" />
              {t('profile.tapBack')}
            </button>
          </div>

          {/* Links List */}
          <div className="space-y-4">
            {profile.links?.map((link: any) => {
              const Icon = LINK_ICONS[link.type] || Globe;
              return (
                <motion.a
                  key={link.id}
                  href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="w-full py-5 px-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-between group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">{link.label}</span>
                  </div>
                  <Share2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-20 pt-12 border-t border-gray-100 dark:border-zinc-900">
            <a href="/" className="inline-flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{t('profile.poweredBy')}</span>
              <span className="text-xl font-bold tracking-tighter italic">TAPLINK</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeadForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white dark:bg-zinc-950 rounded-t-[3rem] p-8 max-w-md mx-auto shadow-2xl border-t border-gray-100 dark:border-zinc-900"
            >
              <div className="w-12 h-1.5 bg-gray-100 dark:bg-zinc-900 rounded-full mx-auto mb-8" />
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{t('profile.tapBack')}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">{t('profile.shareContact')} {profile.displayName}.</p>
              
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <input 
                  required
                  type="text" 
                  placeholder={t('profile.yourName')}
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 dark:text-white"
                />
                <input 
                  required
                  type="email" 
                  placeholder={t('profile.emailAddress')}
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 dark:text-white"
                />
                <input 
                  type="tel" 
                  placeholder={t('profile.phoneNumber')}
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 dark:text-white"
                />
                <textarea 
                  placeholder={t('profile.addNote')}
                  value={leadData.note}
                  onChange={(e) => setLeadData({ ...leadData, note: e.target.value })}
                  rows={3}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none dark:text-white"
                />
                <button 
                  disabled={submittingLead}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {submittingLead ? t('profile.sharing') : t('profile.shareContact')}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
