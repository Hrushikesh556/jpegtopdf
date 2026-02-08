# 🚀 Vercel Deployment Guide — JPG to PDF Converter

## Quick Deploy (3 steps)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: JPG to PDF Converter"
git remote add origin https://github.com/YOUR_USERNAME/jpg-to-pdf-converter.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Vite — just click **"Deploy"**

### 3. Configure Domain
1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain: `jpgtopdfconverter.com`
3. Follow DNS instructions to point your domain

---

## ⚠️ Before Deploying — Important Changes

### Remove vite-plugin-singlefile (IMPORTANT)
For production Vercel deployment, edit `vite.config.ts`:

```typescript
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// REMOVE: import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],  // REMOVE viteSingleFile()
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          pdf: ['jspdf'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
        },
      },
    },
  },
});
```

Then remove the package:
```bash
npm uninstall vite-plugin-singlefile
```

### Set Up Google AdSense
Replace `ca-pub-XXXXXXXXXXXXXXXX` with your real Publisher ID in:
- `index.html` (script tag)
- `src/components/AdBanner.tsx` (data-ad-client)
- `src/components/CookieConsent.tsx`
- `public/ads.txt`

### Set Up Google Analytics (Optional)
Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Update Domain References
Search and replace `jpgtopdfconverter.com` with your actual domain in:
- `index.html` (canonical, og:url, schemas)
- `public/sitemap.xml`
- `public/robots.txt`
- All page components (canonical URLs)

---

## 📁 Files Created for Vercel

| File | Purpose |
|------|---------|
| `vercel.json` | SPA rewrites, security headers, caching |
| `public/robots.txt` | Search engine crawler instructions |
| `public/sitemap.xml` | XML sitemap for Google Search Console |
| `public/ads.txt` | AdSense publisher verification |
| `public/manifest.json` | PWA manifest |
| `public/_redirects` | Fallback SPA redirect (Netlify compatible) |

---

## 🔧 Vercel Environment Variables (Optional)

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_GA_ID` | Your Google Analytics ID |
| `VITE_ADSENSE_ID` | Your AdSense Publisher ID |

---

## ✅ Post-Deploy Checklist

- [ ] Verify all pages load correctly (/, /png-to-pdf, /jpeg-to-pdf, etc.)
- [ ] Test PDF conversion works
- [ ] Check /robots.txt is accessible
- [ ] Check /sitemap.xml is accessible
- [ ] Check /ads.txt is accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google AdSense approval
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: 95+ SEO score)
- [ ] Set up Google Analytics
- [ ] Add custom domain and SSL
- [ ] Verify cookie consent banner works

---

## 🌐 Custom Domain Setup

1. Buy domain (Namecheap, GoDaddy, Cloudflare, etc.)
2. In Vercel: Settings → Domains → Add Domain
3. Add DNS records:
   - `A` record: `76.76.21.21`
   - `CNAME` for `www`: `cname.vercel-dns.com`
4. Wait for SSL certificate (automatic)

---

## 📊 Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → Your domain
3. Verify via DNS or HTML file
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing for key pages

---

## 🚀 Performance Optimization (After Deploy)

1. Enable Vercel Analytics (free tier)
2. Enable Vercel Speed Insights
3. Set up Vercel Edge Config for feature flags
4. Monitor Core Web Vitals in Search Console
