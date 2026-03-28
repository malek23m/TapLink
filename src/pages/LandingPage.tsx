import React from 'react';
import { motion } from 'motion/react';
import { TapLinkHero } from '../components/Landing/Hero';
import { HowItWorks } from '../components/Landing/HowItWorks';
import { ProductShop } from '../components/Landing/ProductShop';
import { Navbar } from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black transition-colors">
      <Navbar />
      <main>
        <TapLinkHero />
        <HowItWorks />
        <ProductShop />
      </main>
      <footer className="py-12 border-t border-gray-100 dark:border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter italic dark:text-white">TAPLINK</div>
          <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm text-gray-400 dark:text-zinc-600">© 2026 TapLink Inc.</div>
        </div>
      </footer>
    </div>
  );
}
