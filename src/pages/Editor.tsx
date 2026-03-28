import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  GripVertical, 
  Image as ImageIcon, 
  Link as LinkIcon,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { handleFirestoreError, OperationType } from '../firebase';
import { useTranslation } from 'react-i18next';

const LINK_TYPES = [
  { id: 'github', label: 'GitHub', icon: Github },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'twitter', label: 'Twitter', icon: Twitter },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
];

export default function Editor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({
    displayName: '',
    bio: '',
    username: '',
    photoURL: '',
    coverURL: '',
    links: [],
    theme: 'minimal',
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // Initialize profile
          const initialProfile = {
            uid: user.uid,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            username: user.uid.slice(0, 8),
            bio: '',
            links: [],
            theme: 'minimal',
            createdAt: serverTimestamp(),
          };
          await setDoc(docRef, initialProfile);
          setProfile({ ...initialProfile, createdAt: new Date() });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...profile,
        updatedAt: serverTimestamp()
      });
      toast.success(t('editor.saveChanges'));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    setProfile({
      ...profile,
      links: [...profile.links, { id: Math.random().toString(36).substr(2, 9), type: 'website', label: '', url: '' }]
    });
  };

  const removeLink = (id: string) => {
    setProfile({
      ...profile,
      links: profile.links.filter((l: any) => l.id !== id)
    });
  };

  const updateLink = (id: string, field: string, value: string) => {
    setProfile({
      ...profile,
      links: profile.links.map((l: any) => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center dark:bg-black dark:text-white">Loading Editor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors dark:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold tracking-tight dark:text-white">{t('editor.title')}</h1>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">{t('dashboard.liveStatus')}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to={`/p/${profile.username}`}
            className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {t('editor.preview')}
          </Link>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? t('editor.saving') : (
              <>
                <Save className="w-4 h-4" />
                {t('editor.saveChanges')}
              </>
            )}
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Editor Panels */}
        <div className="space-y-12">
          {/* Basic Info */}
          <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 border border-gray-100 dark:border-zinc-900 shadow-sm">
            <h2 className="text-xl font-bold mb-8 dark:text-white">{t('editor.basicInfo')}</h2>
            <div className="space-y-6">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group cursor-pointer">
                  <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t('editor.displayName')}</label>
                    <input 
                      type="text" 
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t('editor.username')}</label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                      <span className="text-gray-400">tap.me/</span>
                      <input 
                        type="text" 
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="flex-1 bg-transparent focus:outline-none dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t('editor.bio')}</label>
                <textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none dark:text-white"
                  placeholder={t('editor.bioPlaceholder')}
                />
              </div>
            </div>
          </section>

          {/* Links Section */}
          <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 border border-gray-100 dark:border-zinc-900 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold dark:text-white">{t('editor.linksSocials')}</h2>
              <button 
                onClick={addLink}
                className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform"
                title={t('editor.addLink')}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {profile.links.map((link: any) => (
                <div key={link.id} className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                      <select 
                        value={link.type}
                        onChange={(e) => updateLink(link.id, 'type', e.target.value)}
                        className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none dark:text-white"
                      >
                        {LINK_TYPES.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => removeLink(link.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder={t('editor.labelPlaceholder')}
                      value={link.label}
                      onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 text-sm focus:outline-none dark:text-white"
                    />
                    <input 
                      type="text" 
                      placeholder={t('editor.urlPlaceholder')}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 text-sm focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              ))}
              {profile.links.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl">
                  <LinkIcon className="w-12 h-12 mx-auto mb-4 text-gray-200 dark:text-zinc-800" />
                  <p className="text-gray-400">{t('editor.noLinks')}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Live Preview */}
        <div className="hidden lg:block sticky top-32 h-[calc(100vh-160px)]">
          <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20" />
            <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
              {/* Preview Content */}
              <div className="h-32 bg-gray-100 dark:bg-zinc-900 relative">
                {profile.coverURL && <img src={profile.coverURL} className="w-full h-full object-cover" />}
              </div>
              <div className="px-8 -mt-12 relative z-10 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-950 bg-gray-200 dark:bg-zinc-800 mx-auto overflow-hidden shadow-lg">
                  <img src={profile.photoURL} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-4 text-xl font-bold dark:text-white">{profile.displayName || 'Your Name'}</h3>
                <p className="text-sm text-gray-500 mt-1">@{profile.username || 'username'}</p>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{profile.bio || 'Your bio will appear here...'}</p>
                
                <div className="mt-8 space-y-3">
                  {profile.links.map((link: any) => (
                    <div key={link.id} className="w-full py-3.5 px-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-sm font-bold flex items-center justify-center gap-3 dark:text-white">
                      {LINK_TYPES.find(t => t.id === link.type)?.icon && React.createElement(LINK_TYPES.find(t => t.id === link.type)!.icon, { className: "w-4 h-4" })}
                      {link.label || 'Link Label'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
