import { useEffect, useRef } from 'react';

type AdSize = 'banner' | 'leaderboard' | 'rectangle' | 'large-rectangle' | 'skyscraper' | 'mobile-banner' | 'in-article' | 'multiplex';

interface AdBannerProps {
  adSlot: string;
  size?: AdSize;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidth?: boolean;
  label?: string;
}

const AD_DIMENSIONS: Record<AdSize, { width: string; height: string; minHeight: string }> = {
  'banner': { width: '100%', height: '90px', minHeight: '60px' },
  'leaderboard': { width: '100%', height: '90px', minHeight: '90px' },
  'rectangle': { width: '100%', height: '250px', minHeight: '250px' },
  'large-rectangle': { width: '100%', height: '336px', minHeight: '280px' },
  'skyscraper': { width: '100%', height: '600px', minHeight: '250px' },
  'mobile-banner': { width: '100%', height: '100px', minHeight: '50px' },
  'in-article': { width: '100%', height: '250px', minHeight: '250px' },
  'multiplex': { width: '100%', height: '400px', minHeight: '300px' },
};

export function AdBanner({
  adSlot,
  size = 'rectangle',
  className = '',
  format = 'auto',
  fullWidth = true,
  label = 'Advertisement',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Only push ad once per component mount
    if (isAdPushed.current) return;

    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle && adRef.current) {
        adsbygoogle.push({});
        isAdPushed.current = true;
      }
    } catch (err) {
      console.log('AdSense not loaded:', err);
    }
  }, []);

  const dims = AD_DIMENSIONS[size];

  return (
    <div
      className={`ad-container overflow-hidden ${className}`}
      style={{ textAlign: 'center' }}
    >
      {/* Ad Label - Required by AdSense policy */}
      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 select-none">
        {label}
      </p>

      {/* Ad Placeholder / Real Ad Container */}
      <div
        className="relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mx-auto"
        style={{
          width: fullWidth ? '100%' : dims.width,
          minHeight: dims.minHeight,
          maxWidth: '100%',
        }}
      >
        {/* Google AdSense Ad Unit */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: dims.height,
            minHeight: dims.minHeight,
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive={fullWidth ? 'true' : 'false'}
        />

        {/* Fallback placeholder when AdSense is not loaded */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center opacity-30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gray-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400">Ad Space</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Responsive Ad Component - shows different sizes based on viewport */
export function ResponsiveAd({
  adSlot,
  className = '',
  label = 'Advertisement',
}: {
  adSlot: string;
  className?: string;
  label?: string;
}) {
  return (
    <>
      {/* Mobile: Mobile Banner */}
      <div className={`block md:hidden ${className}`}>
        <AdBanner adSlot={adSlot} size="mobile-banner" format="horizontal" label={label} />
      </div>
      {/* Tablet: Leaderboard */}
      <div className={`hidden md:block lg:hidden ${className}`}>
        <AdBanner adSlot={adSlot} size="leaderboard" format="horizontal" label={label} />
      </div>
      {/* Desktop: Leaderboard */}
      <div className={`hidden lg:block ${className}`}>
        <AdBanner adSlot={adSlot} size="leaderboard" format="horizontal" label={label} />
      </div>
    </>
  );
}

/* Sidebar Ad - Rectangle format for sidebar */
export function SidebarAd({
  adSlot,
  className = '',
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <div className={`sticky top-20 ${className}`}>
      <AdBanner adSlot={adSlot} size="rectangle" format="rectangle" fullWidth={false} label="Sponsored" />
    </div>
  );
}

/* In-Article Ad - For within content sections */
export function InArticleAd({
  adSlot,
  className = '',
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <div className={`my-8 ${className}`}>
      <AdBanner adSlot={adSlot} size="in-article" format="fluid" label="Sponsored" />
    </div>
  );
}

/* Multiplex Ad - For recommendation-style ads */
export function MultiplexAd({
  adSlot,
  className = '',
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <div className={`my-8 ${className}`}>
      <AdBanner adSlot={adSlot} size="multiplex" format="auto" label="You may also like" />
    </div>
  );
}
