import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay to not block initial render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);

    // Enable personalized ads after consent
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({
          google_ad_client: 'ca-pub-XXXXXXXXXXXXXXXX',
          enable_page_level_ads: true,
        });
      }
    } catch {
      // AdSense not loaded
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);

    // Request non-personalized ads
    try {
      const win = window as unknown as Record<string, unknown>;
      win.adsbygoogle = win.adsbygoogle || [];
      (win as Record<string, number>).requestNonPersonalizedAds = 1;
    } catch {
      // AdSense not loaded
    }
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner p-4 md:p-5 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
            🍪 Cookie Notice
          </p>
          <p className="text-gray-300 text-xs leading-relaxed">
            We use cookies to improve your experience and show relevant ads via Google AdSense. 
            Your uploaded files are never stored — all processing happens in your browser. 
            By clicking "Accept", you consent to the use of cookies for analytics and advertising.{' '}
            <button 
              onClick={() => {
                // Navigate to privacy page - dispatch custom event
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }));
                setIsVisible(false);
              }}
              className="text-blue-400 underline hover:text-blue-300"
            >
              Learn more
            </button>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:from-red-600 hover:to-orange-600 transition shadow-lg"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
