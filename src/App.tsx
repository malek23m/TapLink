/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Editor from './pages/Editor';
import CardCustomizer from './pages/CardCustomizer';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen w-screen flex items-center justify-center dark:bg-black dark:text-white">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/p/:username" element={<ProfilePage />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
                <Route path="/customize" element={<PrivateRoute><CardCustomizer /></PrivateRoute>} />
                <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              </Routes>
              <Toaster position="top-center" />
            </Router>
          </AppLayout>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}



