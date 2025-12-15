import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { BrowsePage } from './pages/Browse';
import { PostAdPage } from './pages/PostAd';
import { AboutPage, SafetyPage, ContactsPage, BlogPage, TermsPage, PrivacyPage } from './pages/StaticPages';
import { AdDetailsPage } from './pages/AdDetails';
import { ProfilePage } from './pages/Profile';
import { AdminPage } from './pages/Admin';
import { ChatPage } from './pages/Chat';
import { SellerProfilePage } from './pages/SellerProfile';
import { Page } from './types';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DataProvider, useData } from './context/DataContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(Page.HOME);
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  
  const { ads } = useData();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || Page.HOME;
      setCurrentPage(hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string) => {
    window.location.hash = page;
  };

  const handleAdClick = (ad: any) => {
    setSelectedAdId(ad.id);
    navigate(Page.AD_DETAILS);
  };

  const handleSellerClick = (sellerName: string) => {
    setSelectedSeller(sellerName);
    navigate(Page.SELLER_PROFILE);
  };

  // Check if current page is an admin page to render without standard layout
  if (currentPage === Page.ADMIN) {
    return (
       <AdminPage onNavigate={navigate} />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: 
        return <HomePage onNavigate={navigate} onAdClick={handleAdClick} />;
      case Page.BROWSE: 
        return <BrowsePage onAdClick={handleAdClick} />;
      case Page.POST_AD: return <PostAdPage onNavigate={navigate} />;
      case Page.ABOUT: return <AboutPage />;
      case Page.SAFETY: return <SafetyPage />;
      case Page.CONTACTS: return <ContactsPage />;
      case Page.BLOG: return <BlogPage />;
      case Page.TERMS: return <TermsPage />;
      case Page.PRIVACY: return <PrivacyPage />;
      case Page.PROFILE: return <ProfilePage onNavigate={navigate} onAdClick={handleAdClick} />;
      case Page.CHAT: return <ChatPage />;
      case Page.SELLER_PROFILE: 
         if (!selectedSeller) return <BrowsePage onAdClick={handleAdClick} />;
         return <SellerProfilePage sellerName={selectedSeller} onAdClick={handleAdClick} onNavigate={navigate} />;
      case Page.AD_DETAILS: 
        const ad = ads.find(a => a.id === selectedAdId);
        if (!ad) return <BrowsePage onAdClick={handleAdClick} />;
        return (
          <AdDetailsPage 
            ad={ad} 
            onBack={() => navigate(Page.BROWSE)} 
            onAdClick={handleAdClick}
            onSellerClick={handleSellerClick}
          />
        );
      default: 
        return <HomePage onNavigate={navigate} onAdClick={handleAdClick} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <DataProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DataProvider>
    </NotificationProvider>
  );
};

export default App;