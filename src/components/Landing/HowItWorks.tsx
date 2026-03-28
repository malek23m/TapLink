import React from 'react';
import { ShoppingBag, Edit3, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: ShoppingBag,
      title: t('howItWorks.steps.order.title'),
      description: t('howItWorks.steps.order.desc'),
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Edit3,
      title: t('howItWorks.steps.build.title'),
      description: t('howItWorks.steps.build.desc'),
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Smartphone,
      title: t('howItWorks.steps.tap.title'),
      description: t('howItWorks.steps.tap.desc'),
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-gray-50/50 dark:bg-zinc-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 dark:text-white">{t('howItWorks.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-10 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.color} dark:bg-opacity-20 flex items-center justify-center mb-8`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
