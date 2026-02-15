# Deploying to Vercel - Complete Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - JPG to PDF Converter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jpg-to-pdf-converter.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. Vercel auto-detects Vite - just click **"Deploy"**
5. Wait for deployment to complete (~1-2 minutes)

### 3. Configure Custom Domain

1. Go to your project on Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `convertjpgtopdf.online`
4. Also add: `www.convertjpgtopdf.online` (Vercel will auto-redirect to non-www)

### 4. Update DNS (at your domain registrar)

Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

Or use Vercel Nameservers:
- ns1.vercel-dns.com
- ns2.vercel-dns.com

## Files Included for Vercel

| File | Purpose |
|------|---------|
| `vercel.json` | SPA rewrites, redirects, security headers |
| `public/404.html` | Custom 404 page with redirect logic |
| `public/robots.txt` | Search engine instructions |
| `public/sitemap.xml` | XML sitemap for SEO |
| `public/ads.txt` | AdSense verification |
| `public/manifest.json` | PWA manifest |
| `public/_redirects` | Fallback redirects |

## Vercel Configuration (vercel.json)

The `vercel.json` includes:

- **SPA Rewrite**: All routes → `/index.html` (React handles routing)
- **Redirects**: `/index.html`, `/index.php`, `/home` → `/`
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, XSS Protection

## All Routes

| URL | Page |
|-----|------|
| `/` | Home (JPG to PDF) |
| `/jpg-to-pdf` | JPG to PDF Converter |
| `/png-to-pdf` | PNG to PDF Converter |
| `/jpeg-to-pdf` | JPEG to PDF Converter |
| `/image-to-pdf` | Image to PDF Converter |
| `/blog` | Blog & Guides |
| `/faq` | FAQ Page |
| `/how-to-convert-jpg-to-pdf` | How-To Guide |
| `/about` | About Page |
| `/contact` | Contact Page |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/sitemap` | HTML Sitemap |
| `/sitemap.xml` | XML Sitemap |
| `/robots.txt` | Robots.txt |
| `/ads.txt` | AdSense ads.txt |

## Google AdSense Setup

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real AdSense Publisher ID in:

1. `index.html` - Line 10 (AdSense script)
2. `src/components/AdBanner.tsx` - data-ad-client attribute
3. `src/components/CookieConsent.tsx` - AdSense reference
4. `public/ads.txt` - Publisher ID

## Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://convertjpgtopdf.online`
3. Verify via DNS TXT record or HTML file
4. Submit sitemap: `https://convertjpgtopdf.online/sitemap.xml`

## Troubleshooting

### Routes showing 404?
- Make sure `vercel.json` is in the root directory
- Redeploy after adding `vercel.json`
- Check Vercel deployment logs for errors

### CSS not loading?
- Clear browser cache
- Check Vercel build logs

### Ads not showing?
- AdSense approval takes 1-14 days
- Make sure your site has enough content
- Check AdSense policy compliance

## Performance Optimization

The build is optimized with code splitting:
- `vendor-react.js` - React core (~189KB)
- `vendor-pdf.js` - jsPDF library (~338KB, lazy loaded)
- `vendor-dnd.js` - Drag & drop (~45KB)
- `index.js` - App code (~119KB)

## SEO Checklist

- [x] Meta titles and descriptions on all pages
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] XML Sitemap
- [x] Robots.txt
- [x] FAQ Schema markup
- [x] HowTo Schema markup
- [x] Breadcrumbs with Schema
- [x] Mobile responsive
- [x] Fast loading (<3s)
- [x] H1 tags on all pages
- [x] Internal linking

## Support

For issues, contact: contact@convertjpgtopdf.online
