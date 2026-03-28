import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { ArrowLeft, Calendar, Download, TrendingUp, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Analytics() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tapData, setTapData] = useState<any[]>([]);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    if (!user) return;
    const fetchAnalytics = async () => {
      try {
        const q = query(
          collection(db, 'analytics'),
          where('profileId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          date: new Date(d.data().timestamp?.toDate()).toLocaleDateString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })
        }));

        // Group by date for the chart
        const grouped = data.reduce((acc: any, curr: any) => {
          const date = curr.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(grouped).map(date => ({
          date,
          taps: grouped[date]
        })).reverse();

        setTapData(chartData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user, i18n.language]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 font-bold">{t('analytics.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8 lg:p-12 transition-colors duration-300" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors">
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            {t('analytics.back')}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">{t('analytics.title')}</h1>
          <p className="text-gray-500 dark:text-zinc-400">{t('analytics.subtitle')}</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all dark:text-white">
            <Calendar className="w-4 h-4" />
            {t('analytics.last30Days')}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-bold hover:scale-105 transition-all">
            <Download className="w-4 h-4" />
            {t('analytics.export')}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Main Chart */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              {t('analytics.trends')}
            </h2>
            <div className={isRtl ? 'text-left' : 'text-right'}>
              <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">{t('analytics.totalTaps')}</div>
              <div className="text-2xl font-bold dark:text-white">{tapData.reduce((acc, curr) => acc + curr.taps, 0)}</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tapData}>
                <defs>
                  <linearGradient id="colorTaps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isRtl ? "#fff" : "#000"} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={isRtl ? "#fff" : "#000"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  dy={10}
                  reversed={isRtl}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  orientation={isRtl ? 'right' : 'left'}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px',
                    backgroundColor: 'white',
                    textAlign: isRtl ? 'right' : 'left'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="taps" 
                  stroke={isRtl ? "#fff" : "#000"} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorTaps)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Device Breakdown */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-8 dark:text-white">
              <Smartphone className="w-5 h-5 text-gray-400" />
              {t('analytics.devices')}
            </h2>
            
            <div className="space-y-6">
              <DeviceRow label="iOS" percentage={65} color="bg-black dark:bg-white" />
              <DeviceRow label="Android" percentage={28} color="bg-gray-400" />
              <DeviceRow label="Desktop" percentage={7} color="bg-gray-200 dark:bg-zinc-700" />
            </div>
          </section>

          {/* Locations */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-8 dark:text-white">
              <Globe className="w-5 h-5 text-gray-400" />
              {t('analytics.locations')}
            </h2>
            
            <div className="space-y-4">
              <LocationRow city="Cairo" taps={145} isRtl={isRtl} t={t} />
              <LocationRow city="Alexandria" taps={82} isRtl={isRtl} t={t} />
              <LocationRow city="Giza" taps={45} isRtl={isRtl} t={t} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const DeviceRow = ({ label, percentage, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span className="dark:text-white">{label}</span>
      <span className="text-gray-500">{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-gray-50 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className={`h-full ${color}`}
      />
    </div>
  </div>
);

const LocationRow = ({ city, taps, isRtl, t }: any) => (
  <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
    <span className="font-bold text-sm dark:text-white">{city}</span>
    <span className="text-sm font-bold text-gray-400">{t('analytics.tapsCount', { count: taps })}</span>
  </div>
);
