'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ConsentContext = createContext();

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentManager');
  }
  return context;
};

export default function ConsentManager({ children }) {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      const consentData = JSON.parse(savedConsent);
      setConsent(consentData);

      // Update Google Analytics consent
      updateGoogleAnalyticsConsent(consentData);
    } else {
      // Show banner if no consent has been given
      setShowBanner(true);
    }
  }, []);

  const updateGoogleAnalyticsConsent = (consentData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consentData.analytics ? 'granted' : 'denied',
        ad_storage: consentData.analytics ? 'granted' : 'denied',
        ad_user_data: consentData.analytics ? 'granted' : 'denied',
        ad_personalization: consentData.analytics ? 'granted' : 'denied'
      });
    }
  };

  const acceptAll = () => {
    const newConsent = {
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString()
    };

    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    updateGoogleAnalyticsConsent(newConsent);
  };

  const rejectAll = () => {
    const newConsent = {
      analytics: false,
      functional: true, // Always required
      timestamp: new Date().toISOString()
    };

    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    updateGoogleAnalyticsConsent(newConsent);
  };

  const updateConsent = (newConsent) => {
    const consentData = {
      ...newConsent,
      functional: true, // Always required
      timestamp: new Date().toISOString()
    };

    setConsent(consentData);
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    updateGoogleAnalyticsConsent(consentData);
  };

  const value = {
    consent,
    showBanner,
    acceptAll,
    rejectAll,
    updateConsent,
    setShowBanner
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
