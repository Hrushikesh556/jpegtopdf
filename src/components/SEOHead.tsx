import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
}

export function SEOHead({ title, description, canonical, keywords }: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    // Update meta description
    setMeta('name', 'description', description);

    // Update meta keywords
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    // Update canonical
    if (canonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      }
    }

    // Update OG tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    if (canonical) {
      setMeta('property', 'og:url', canonical);
    }

    // Update Twitter tags
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [title, description, canonical, keywords]);

  return null;
}
