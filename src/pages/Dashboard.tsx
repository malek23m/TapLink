import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, orderBy, getCountFromServer } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut, 
  Plus, 
  ExternalLink,
  Users,
  MousePointer2,
  TrendingUp,
  QrCode,
  Share2,
  Smartphone
} from 'lucide-react';
import { auth, handleFirestoreError, OperationType } from '../firebase';
import { signOut } from 'firebase/auth';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import LinkCardModal from '../components/LinkCardModal';
import WalletModal from '../components/WalletModal';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ taps: 0, leads: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [showLinkCard, setShowLinkCard] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch Profile
        const profileDoc = await getDoc(doc(db, 'users', user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        }

        // Fetch Leads
        const leadsQuery = query(
          collection(db, 'leads'), 
          where('profileId', '==', user.uid),
          orderBy('timestamp', 'desc'),
          limit(5)
        );
        const leadsSnap = await getDocs(leadsQuery);
        setRecentLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch Total Leads Count
        const leadsCountSnap = await getCountFromServer(query(collection(db, 'leads'), where('profileId', '==', user.uid)));
        
        // Fetch Total Taps Count
        const tapsCountSnap = await getCountFromServer(query(collection(db, 'analytics'), where('profileId', '==', user.uid)));

        setStats({ 
          taps: tapsCountSnap.data().count, 
          leads: leadsCountSnap.data().count 
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'dashboard_data');
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="text-2xl font-bold tracking-tighter italic dark:text-white">TAPLINK</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} label={t('dashboard.dashboard')} active />
          <SidebarLink to="/editor" icon={User} label={t('dashboard.editProfile')} />
          <SidebarLink to="/analytics" icon={BarChart3} label={t('dashboard.analytics')} />
          <SidebarLink to="/customize" icon={CreditCard} label={t('dashboard.myCards')} />
          <SidebarLink to="/settings" icon={Settings} label={t('dashboard.settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-zinc-900">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            {t('dashboard.signOut')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('dashboard.welcome')} {user?.displayName?.split(' ')[0]}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('dashboard.statsDesc')}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowQR(true)}
              className="p-2 hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 rounded-full transition-all text-gray-600 dark:text-gray-400"
              title={t('dashboard.showQR')}
            >
              <QrCode className="w-5 h-5" />
            </button>
            <Link 
              to={`/p/${profile?.username || user?.uid}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-white dark:hover:bg-zinc-900 transition-colors dark:text-white"
            >
              {t('dashboard.viewProfile')}
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link 
              to="/editor"
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              {t('dashboard.editProfile')}
            </Link>
          </div>
        </header>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQR(false)} />
            <div className="bg-white dark:bg-zinc-950 rounded-[2.5rem] p-10 max-w-sm w-full relative z-10 text-center shadow-2xl border border-gray-100 dark:border-zinc-900">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{t('dashboard.qrTitle')}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">{t('dashboard.qrDesc')}</p>
              
              <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl inline-block mb-8 border border-gray-100 dark:border-zinc-800">
                <QRCodeSVG 
                  value={`${window.location.origin}/p/${profile?.username || user?.uid}`}
                  size={200}
                  level="H"
                  includeMargin={false}
                  className="dark:bg-white p-2 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/p/${profile?.username || user?.uid}`);
                    toast.success(t('dashboard.linkCopied'));
                  }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  {t('dashboard.copyLink')}
                </button>
                <button 
                  onClick={() => setShowQR(false)}
                  className="w-full py-4 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {t('dashboard.close')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard 
            label={t('dashboard.totalTaps')} 
            value={stats.taps} 
            trend="+12% from last week" 
            icon={MousePointer2}
            color="text-blue-600 bg-blue-50 dark:bg-blue-900/20"
          />
          <StatCard 
            label={t('dashboard.newLeads')} 
            value={stats.leads} 
            trend="+5 today" 
            icon={Users}
            color="text-purple-600 bg-purple-50 dark:bg-purple-900/20"
          />
          <StatCard 
            label={t('dashboard.profileViews')} 
            value="1,240" 
            trend="+24% this month" 
            icon={TrendingUp}
            color="text-orange-600 bg-orange-50 dark:bg-orange-900/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-900 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold dark:text-white">{t('dashboard.recentLeads')}</h2>
              <button className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">{t('dashboard.viewAll')}</button>
            </div>
            
            {recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                        {lead.name[0]}
                      </div>
                      <div>
                        <div className="font-bold dark:text-white">{lead.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(lead.timestamp?.toDate()).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>{t('dashboard.noLeads')}</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-8">
            <div className="bg-black dark:bg-zinc-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">{t('dashboard.orderCard')}</h3>
                <p className="text-gray-400 text-sm mb-6">{t('dashboard.orderDesc')}</p>
                <Link 
                  to="/customize"
                  className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-all"
                >
                  {t('dashboard.shopNow')}
                </Link>
              </div>
              <CreditCard className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
            </div>

            <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-900 p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 dark:text-white">{t('dashboard.activeProfile')}</h3>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                  <img src={user?.photoURL || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm dark:text-white">{profile?.displayName || user?.displayName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">tap.me/{profile?.username || 'user'}</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setShowLinkCard(true)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all font-bold text-sm dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    {t('dashboard.linkCard')}
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowWallet(true)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all font-bold text-sm dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    {t('dashboard.addToWallet')}
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <LinkCardModal isOpen={showLinkCard} onClose={() => setShowLinkCard(false)} />
        <WalletModal isOpen={showWallet} onClose={() => setShowWallet(false)} />
      </main>

    </div>
  );
}

const SidebarLink = ({ to, icon: Icon, label, active = false }: any) => (
  <Link 
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      active 
        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10' 
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </Link>
);

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-gray-100 dark:border-zinc-900 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="text-3xl font-bold mb-1 dark:text-white">{value}</div>
    <div className="text-sm font-medium text-gray-400">{label}</div>
    <div className="mt-4 text-xs font-bold text-green-500">{trend}</div>
  </div>
);
