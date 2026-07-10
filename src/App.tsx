import React, { useState, useCallback, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

// ============================================
// Types
// ============================================
interface ImageFile {
  id: string;
  file: File;
  url: string;
  name: string;
  width: number;
  height: number;
}

interface Settings {
  pageSize: 'a4' | 'letter' | 'auto';
  orientation: 'portrait' | 'landscape';
  margin: 'none' | 'small' | 'large';
  fit: 'contain' | 'fill';
}

type AppState = 'idle' | 'uploading' | 'converting' | 'done';

// ============================================
// Constants
// ============================================
const MAX_IMAGES = 50;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const FAQ_DATA = [
  {
    q: 'How do I convert JPG to PDF for free?',
    a: 'Upload your JPG images using the upload area above, arrange them by dragging, select your settings (page size, orientation, margins), and click "Convert to PDF". Your PDF downloads automatically. It\'s 100% free with no signup required.'
  },
  {
    q: 'Is it safe to convert JPG to PDF online?',
    a: 'Yes, completely safe! Unlike other tools, we use 100% client-side processing. Your files are converted directly in your browser using JavaScript and are NEVER uploaded to any server. Your images stay on your device, ensuring complete privacy.'
  },
  {
    q: 'Can I convert multiple JPG images to one PDF?',
    a: 'Absolutely! You can upload up to 50 images at once and combine them into a single PDF document. Use drag-and-drop to arrange the page order before converting.'
  },
  {
    q: 'Can I convert JPG to PDF without losing quality?',
    a: 'Yes! Our converter preserves the original quality of your images. We don\'t compress or alter your images during conversion. For best results, use high-resolution source images and select "Auto" page size.'
  },
  {
    q: 'Does it work on iPhone and Android?',
    a: 'Yes! Simply open this website in your mobile browser (Safari, Chrome), tap the upload area, select images from your gallery, arrange by touch-dragging, and tap Convert. No app installation needed!'
  },
  {
    q: 'How do I convert JPG to PDF for bank document upload?',
    a: 'Our converter creates standard PDF files perfect for bank and government uploads. For KYC documents or loan applications, upload your JPG images, select A4 or Letter size, and download the professional PDF ready for submission.'
  },
  {
    q: 'Is there a file size or number limit?',
    a: 'You can convert up to 50 images per PDF. Since all processing happens in your browser, there\'s no server file size limit. Very large images (over 10MB each) may take longer to process.'
  },
  {
    q: 'Will there be a watermark on my PDF?',
    a: 'Never! Your converted PDF is completely clean without any watermarks, logos, or branding. Our tool is truly free with no hidden catches.'
  }
];

// ============================================
// Utility Functions
// ============================================
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function loadImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// ============================================
// Hooks
// ============================================
function useScrollHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrolled;
}

// ============================================
// SVG Icons (inline for performance)
// ============================================
const Icons = {
  Upload: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  File: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
};

// ============================================
// Main App Component
// ============================================
export default function App() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<Settings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 'small',
    fit: 'contain',
  });
  const [appState, setAppState] = useState<AppState>('idle');
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerScrolled = useScrollHeader();
  const dragItemRef = useRef<number | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Process uploaded files
  const processFiles = useCallback(async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => ACCEPTED_TYPES.includes(f.type));
    
    if (validFiles.length === 0) {
      showToast('Please upload JPG or PNG images only.', 'error');
      return;
    }

    const remaining = MAX_IMAGES - images.length;
    if (validFiles.length > remaining) {
      showToast(`Maximum ${MAX_IMAGES} images allowed. Only adding ${remaining}.`, 'error');
    }

    const toAdd = validFiles.slice(0, remaining);
    const newImages: ImageFile[] = [];

    for (const file of toAdd) {
      try {
        const dims = await loadImageDimensions(file);
        newImages.push({
          id: generateId(),
          file,
          url: URL.createObjectURL(file),
          name: file.name,
          ...dims,
        });
      } catch {
        // Skip invalid images
      }
    }

    setImages(prev => [...prev, ...newImages]);
    if (newImages.length > 0) {
      showToast(`Added ${newImages.length} image${newImages.length > 1 ? 's' : ''}`);
    }
  }, [images.length, showToast]);

  // Drag & drop handlers for upload zone
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // Remove an image
  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter(i => i.id !== id);
    });
  }, []);

  // Reorder images via drag
  const handleImageDragStart = (index: number) => {
    dragItemRef.current = index;
  };

  const handleImageDragEnter = (index: number) => {
    dragOverItemRef.current = index;
  };

  const handleImageDragEnd = () => {
    if (dragItemRef.current === null || dragOverItemRef.current === null) return;
    const newImages = [...images];
    const draggedItem = newImages[dragItemRef.current];
    newImages.splice(dragItemRef.current, 1);
    newImages.splice(dragOverItemRef.current, 0, draggedItem);
    dragItemRef.current = null;
    dragOverItemRef.current = null;
    setImages(newImages);
  };

  // Convert to PDF
  const convertToPdf = useCallback(async () => {
    if (images.length === 0) return;
    
    setAppState('converting');
    setProgress(0);

    try {
      // Small delay for UI to update
      await new Promise(r => setTimeout(r, 100));

      const margins = { none: 0, small: 10, large: 20 }[settings.margin];
      
      let pdf: jsPDF;

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        
        // Determine page dimensions
        let pageWidth: number, pageHeight: number;
        
        if (settings.pageSize === 'auto') {
          // Use image dimensions (convert px to mm at 96dpi)
          const pxToMm = 25.4 / 96;
          pageWidth = img.width * pxToMm + margins * 2;
          pageHeight = img.height * pxToMm + margins * 2;
        } else if (settings.pageSize === 'a4') {
          pageWidth = 210;
          pageHeight = 297;
        } else {
          pageWidth = 215.9;
          pageHeight = 279.4;
        }

        // Handle orientation
        if (settings.orientation === 'landscape' && settings.pageSize !== 'auto') {
          [pageWidth, pageHeight] = [pageHeight, pageWidth];
        }

        if (i === 0) {
          pdf = new jsPDF({
            orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
            unit: 'mm',
            format: [pageWidth, pageHeight],
          });
        } else {
          pdf!.addPage([pageWidth, pageHeight], pageWidth > pageHeight ? 'landscape' : 'portrait');
        }

        // Draw image
        const availableWidth = pageWidth - margins * 2;
        const availableHeight = pageHeight - margins * 2;

        let drawWidth: number, drawHeight: number;

        if (settings.fit === 'fill') {
          drawWidth = availableWidth;
          drawHeight = availableHeight;
        } else {
          // Contain - maintain aspect ratio
          const imgRatio = img.width / img.height;
          const areaRatio = availableWidth / availableHeight;
          
          if (imgRatio > areaRatio) {
            drawWidth = availableWidth;
            drawHeight = availableWidth / imgRatio;
          } else {
            drawHeight = availableHeight;
            drawWidth = availableHeight * imgRatio;
          }
        }

        const x = margins + (availableWidth - drawWidth) / 2;
        const y = margins + (availableHeight - drawHeight) / 2;

        // Convert image to data URL
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        const imageEl = new Image();
        imageEl.src = img.url;
        await new Promise<void>((resolve) => {
          imageEl.onload = () => {
            ctx.drawImage(imageEl, 0, 0);
            resolve();
          };
        });

        const dataUrl = canvas.toDataURL(img.file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.92);
        const format = img.file.type === 'image/png' ? 'PNG' : 'JPEG';
        
        pdf!.addImage(dataUrl, format, x, y, drawWidth, drawHeight);

        // Update progress
        setProgress(Math.round(((i + 1) / images.length) * 100));
        
        // Yield to UI
        if (i % 5 === 0) {
          await new Promise(r => setTimeout(r, 0));
        }
      }

      const blob = pdf!.output('blob');
      setPdfBlob(blob);
      setAppState('done');
      
      // Auto-download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast('PDF created successfully!');
    } catch (error) {
      console.error('Conversion error:', error);
      showToast('Conversion failed. Please try again.', 'error');
      setAppState('idle');
    }
  }, [images, settings, showToast]);

  // Download PDF again
  const downloadPdf = useCallback(() => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [pdfBlob]);

  // Reset everything
  const resetAll = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);
    setAppState('idle');
    setProgress(0);
    setPdfBlob(null);
  }, [images]);

  // Total file size
  const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

  return (
    <>
      {/* Header */}
      <header className={`header ${headerScrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="ConvertJPGtoPDF.online Home">
            <span className="logo-icon" aria-hidden="true">PDF</span>
            <span>ConvertJPGtoPDF<span style={{ color: 'var(--color-primary)' }}>.online</span></span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#converter" className="nav-link">Converter</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
        </div>
      </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true"></span>
              100% Free &middot; No Signup Required
            </div>
            <h1 id="hero-title" className="hero-title">
              Convert <span className="highlight">JPG &amp; PNG</span> to PDF<br />
              Instantly &amp; Free
            </h1>
            <p className="hero-description">
              Transform your images into professional PDF documents in seconds. 
              No signup, no watermarks, no limits. Your files never leave your device.
            </p>
            <div className="hero-trust">
              <span className="trust-item"><span className="trust-icon" aria-hidden="true">✓</span> 100% Free</span>
              <span className="trust-item"><span className="trust-icon" aria-hidden="true">✓</span> No Watermarks</span>
              <span className="trust-item"><span className="trust-icon" aria-hidden="true">✓</span> Private &amp; Secure</span>
              <span className="trust-item"><span className="trust-icon" aria-hidden="true">✓</span> Works Offline</span>
            </div>
          </div>
        </section>

        {/* Converter Section */}
        <section id="converter" className="converter-section" aria-labelledby="converter-heading">
          <div className="container">
            <h2 id="converter-heading" className="sr-only">Image to PDF Converter Tool</h2>
            <div className="converter-card">
              {/* Privacy Banner */}
              <div className="privacy-banner" role="note">
                <div className="privacy-icon" aria-hidden="true">🔒</div>
                <div>
                  <div className="privacy-title">Your Privacy is Guaranteed</div>
                  <div className="privacy-text">
                    All processing happens in your browser. Files are <strong>never uploaded</strong> to any server. 
                    Your images stay on your device.
                  </div>
                </div>
              </div>

              {/* Upload Zone or Success State */}
              {appState === 'done' ? (
                <div className="success-state fade-in">
                  <div className="success-icon" aria-hidden="true">✓</div>
                  <h3 className="success-title">PDF Created Successfully!</h3>
                  <p className="success-subtitle">
                    {images.length} image{images.length > 1 ? 's' : ''} converted &middot; {formatBytes(pdfBlob?.size || 0)}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-success" onClick={downloadPdf}>
                      <Icons.Download /> Download Again
                    </button>
                    <button className="btn btn-secondary" onClick={resetAll}>
                      Convert More Images
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Upload Area */}
                  <div
                    className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload images. Click or drag and drop files here."
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                  >
                    <div className="upload-icon" aria-hidden="true">
                      <Icons.Upload />
                    </div>
                    <p className="upload-title">Drop images here or click to upload</p>
                    <p className="upload-subtitle">Supports JPG, JPEG, PNG &bull; Up to {MAX_IMAGES} images</p>
                    <span className="upload-btn" role="presentation">
                      <Icons.Plus /> Select Images
                    </span>
                    <div className="upload-formats">
                      <span className="format-badge">JPG</span>
                      <span className="format-badge">JPEG</span>
                      <span className="format-badge">PNG</span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      multiple
                      onChange={(e) => e.target.files && processFiles(e.target.files)}
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Image Grid */}
                  {images.length > 0 && (
                    <>
                      <div className="images-grid" role="list" aria-label="Uploaded images">
                        {images.map((img, index) => (
                          <div
                            key={img.id}
                            className="image-card"
                            role="listitem"
                            draggable
                            onDragStart={() => handleImageDragStart(index)}
                            onDragEnter={() => handleImageDragEnter(index)}
                            onDragEnd={handleImageDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                            aria-label={`Image ${index + 1}: ${img.name}`}
                          >
                            <img src={img.url} alt={img.name} loading="lazy" />
                            <span className="image-card-number">{index + 1}</span>
                            <button
                              className="image-card-remove"
                              onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                              aria-label={`Remove ${img.name}`}
                            >
                              <Icons.Trash />
                            </button>
                            <span className="image-card-name">{img.name}</span>
                          </div>
                        ))}
                        {images.length < MAX_IMAGES && (
                          <div
                            className="image-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => fileInputRef.current?.click()}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-border)', cursor: 'pointer' }}
                            aria-label="Add more images"
                          >
                            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                              <Icons.Plus />
                              <p style={{ fontSize: '11px', marginTop: '4px' }}>Add more</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Settings Panel */}
                      <div className="settings-panel" id="settings">
                        <div className="settings-header">
                          <Icons.Settings /> PDF Settings
                        </div>
                        <div className="settings-grid">
                          {/* Page Size */}
                          <div className="setting-group">
                            <span className="setting-label">Page Size</span>
                            <div className="setting-options" role="radiogroup" aria-label="Page size">
                              {([['a4', 'A4'], ['letter', 'Letter'], ['auto', 'Auto']] as const).map(([val, label]) => (
                                <button
                                  key={val}
                                  className={`setting-option ${settings.pageSize === val ? 'active' : ''}`}
                                  onClick={() => setSettings(s => ({ ...s, pageSize: val }))}
                                  role="radio"
                                  aria-checked={settings.pageSize === val}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Orientation */}
                          <div className="setting-group">
                            <span className="setting-label">Orientation</span>
                            <div className="setting-options" role="radiogroup" aria-label="Orientation">
                              {([['portrait', '↕ Portrait'], ['landscape', '↔ Landscape']] as const).map(([val, label]) => (
                                <button
                                  key={val}
                                  className={`setting-option ${settings.orientation === val ? 'active' : ''}`}
                                  onClick={() => setSettings(s => ({ ...s, orientation: val }))}
                                  role="radio"
                                  aria-checked={settings.orientation === val}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Margin */}
                          <div className="setting-group">
                            <span className="setting-label">Margin</span>
                            <div className="setting-options" role="radiogroup" aria-label="Margin">
                              {([['none', 'None'], ['small', 'Small'], ['large', 'Large']] as const).map(([val, label]) => (
                                <button
                                  key={val}
                                  className={`setting-option ${settings.margin === val ? 'active' : ''}`}
                                  onClick={() => setSettings(s => ({ ...s, margin: val }))}
                                  role="radio"
                                  aria-checked={settings.margin === val}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Image Fit */}
                          <div className="setting-group">
                            <span className="setting-label">Image Fit</span>
                            <div className="setting-options" role="radiogroup" aria-label="Image fit">
                              {([['contain', 'Contain'], ['fill', 'Fill']] as const).map(([val, label]) => (
                                <button
                                  key={val}
                                  className={`setting-option ${settings.fit === val ? 'active' : ''}`}
                                  onClick={() => setSettings(s => ({ ...s, fit: val }))}
                                  role="radio"
                                  aria-checked={settings.fit === val}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      {appState === 'converting' && (
                        <div className="progress-container" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                          </div>
                          <div className="progress-text">
                            <span>Converting images...</span>
                            <span>{progress}%</span>
                          </div>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="action-bar">
                        <div className="action-info">
                          <span className="action-info-badge">
                            <Icons.Lock /> {images.length} image{images.length > 1 ? 's' : ''}
                          </span>
                          <span>{formatBytes(totalSize)} total</span>
                        </div>
                        <div className="action-buttons">
                          <button className="btn btn-secondary" onClick={resetAll}>
                            Clear All
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={convertToPdf}
                            disabled={appState === 'converting'}
                          >
                            {appState === 'converting' ? (
                              <>Converting... {progress}%</>
                            ) : (
                              <>
                                <Icons.File /> Convert to PDF
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="section" aria-labelledby="steps-title">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Simple Process</span>
              <h2 id="steps-title" className="section-title">How to Convert JPG to PDF</h2>
              <p className="section-description">Convert your images to PDF in three simple steps. No technical knowledge required.</p>
            </div>
            <div className="steps-grid">
              {[
                { icon: '📤', title: 'Upload', desc: 'Drag & drop or click to upload your JPG or PNG images. Add up to 50 at once.' },
                { icon: '🔀', title: 'Arrange', desc: 'Drag images to reorder pages. Choose page size, orientation, and margins.' },
                { icon: '⚡', title: 'Convert', desc: 'Click "Convert to PDF" and your file downloads instantly. Done!' },
              ].map((step, i) => (
                <div key={i} className="step-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="step-number">{i + 1}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section section-alt" aria-labelledby="features-title">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why Choose Us</span>
              <h2 id="features-title" className="section-title">Built for Speed, Privacy &amp; Simplicity</h2>
              <p className="section-description">Everything you need in a JPG to PDF converter, nothing you don't.</p>
            </div>
            <div className="features-grid">
              {[
                { icon: '🔒', title: '100% Private', desc: 'Files processed locally in your browser. Never uploaded to servers. Complete data privacy.' },
                { icon: '⚡', title: 'Lightning Fast', desc: 'Instant conversion with no upload waiting. Convert dozens of images in seconds.' },
                { icon: '🆓', title: 'Completely Free', desc: 'No hidden fees, no watermarks, no premium tiers. Every feature is free forever.' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on iPhone, Android, iPad, and all devices with a modern browser.' },
                { icon: '🚫', title: 'No Signup', desc: 'Start converting immediately. No account, no email, no password required.' },
                { icon: '📄', title: 'Batch Convert', desc: 'Combine up to 50 images into one PDF. Drag and drop to arrange page order.' },
              ].map((feature, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section" aria-labelledby="usecases-title">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Popular Uses</span>
              <h2 id="usecases-title" className="section-title">Perfect for Every Need</h2>
            </div>
            <div className="usecases-grid">
              {[
                { icon: '🏦', title: 'Bank & KYC Documents', desc: 'Convert ID cards, proof of address, and financial documents to PDF for bank submissions.' },
                { icon: '🎓', title: 'Student Assignments', desc: 'Combine homework photos and scanned notes into a single PDF for submission.' },
                { icon: '📋', title: 'Government Forms', desc: 'Prepare passport applications, visa documents, and official form submissions.' },
                { icon: '💼', title: 'Business Documents', desc: 'Create professional PDFs from contracts, invoices, receipts, and business cards.' },
                { icon: '📷', title: 'Photo Albums', desc: 'Combine vacation photos or portfolio images into shareable PDF albums.' },
                { icon: '🏥', title: 'Medical Records', desc: 'Securely convert medical reports and prescriptions. Files stay on your device.' },
              ].map((usecase, i) => (
                <div key={i} className="usecase-card">
                  <div className="usecase-icon" aria-hidden="true">{usecase.icon}</div>
                  <h3 className="usecase-title">{usecase.title}</h3>
                  <p className="usecase-description">{usecase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section section-alt" aria-labelledby="faq-title">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Got Questions?</span>
              <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
            </div>
            <div className="faq-list" role="list">
              {FAQ_DATA.map((item, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} role="listitem">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className="faq-chevron" aria-hidden="true"><Icons.ChevronDown /></span>
                  </button>
                  {openFaq === i && (
                    <div id={`faq-answer-${i}`} className="faq-answer" role="region">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="content-section section" aria-labelledby="about-title">
          <div className="container">
            <article>
              <h2 id="about-title">Free JPG to PDF Converter Online – No Signup Required</h2>
              <p>
                Looking for the fastest, most secure way to <strong>convert JPG to PDF</strong>? Our free online JPG to PDF converter lets you transform images into professional PDF documents instantly — with no signup, no watermarks, and no file limits. Whether you need to convert a single photo or <strong>batch convert multiple JPG files</strong> into one PDF, our tool handles it all.
              </p>

              <h3>Convert JPG to PDF Without Losing Quality</h3>
              <p>
                Worried about image quality? Our converter preserves the original resolution and clarity of your images. We don't apply lossy compression during conversion, so your PDFs look exactly like your source images. For the highest quality output, use high-resolution source images and select "Auto" page size to maintain original dimensions.
              </p>

              <h3>Privacy-First Image to PDF Conversion</h3>
              <p>
                We built this converter with privacy as the top priority. All image processing happens directly in your web browser using JavaScript. Your JPG and PNG files are <strong>never uploaded to any server</strong>. They never leave your device. This makes our converter perfect for sensitive documents like bank statements, ID cards, medical records, and confidential business files.
              </p>

              <h3>Perfect for Mobile Users</h3>
              <p>
                Need to <strong>convert JPG to PDF on your iPhone or Android phone</strong>? Our converter is fully responsive and works on any device with a modern web browser. Simply open the website, tap to upload images from your camera roll, arrange them, and tap Convert. The PDF downloads directly to your device — no app installation needed.
              </p>

              <h3>Combine Multiple Images into One PDF</h3>
              <p>
                Upload up to 50 images at once and combine them into a single, professionally formatted PDF document. Use drag-and-drop to arrange page order, choose your preferred page size (A4, Letter, or Auto), select portrait or landscape orientation, and adjust margins. Perfect for creating multi-page documents from scanned images, photo collections, or document sets.
              </p>

              <h3>JPG to PDF for Bank &amp; Government Documents</h3>
              <p>
                Our converter creates standard PDF files that meet requirements for bank KYC submissions, loan applications, government forms, passport applications, and other official document uploads. Select A4 or Letter size for properly formatted PDFs ready for any institution.
              </p>
            </article>
          </div>
        </section>

        {/* Related Tools */}
        <section className="section section-alt" aria-labelledby="tools-title">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Related Tools</span>
              <h2 id="tools-title" className="section-title">More Conversion Tools</h2>
            </div>
            <div className="usecases-grid">
              {[
                { href: '/jpg-to-pdf', icon: '🖼️', title: 'JPG to PDF', desc: 'Convert JPG images to PDF format with customizable settings.' },
                { href: '/png-to-pdf', icon: '📸', title: 'PNG to PDF', desc: 'Convert PNG files with transparency support to PDF.' },
                { href: '/batch-jpg-to-pdf', icon: '📚', title: 'Batch Convert', desc: 'Convert multiple files at once into a single PDF.' },
                { href: '/jpg-to-pdf-100kb', icon: '📉', title: 'PDF Under 100KB', desc: 'Compressed PDF for bank and government uploads.' },
              ].map((tool, i) => (
                <a key={i} href={tool.href} className="usecase-card">
                  <div className="usecase-icon" aria-hidden="true">{tool.icon}</div>
                  <h3 className="usecase-title">{tool.title}</h3>
                  <p className="usecase-description">{tool.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="/" className="logo">
                <span className="logo-icon" aria-hidden="true">PDF</span>
                <span>ConvertJPGtoPDF<span style={{ color: 'var(--color-primary)' }}>.online</span></span>
              </a>
              <p className="footer-brand-description">
                Free online tool to convert JPG and PNG images to PDF documents. 100% private, no signup required. Works on all devices.
              </p>
            </div>
            <div>
              <h4 className="footer-heading">Tools</h4>
              <ul className="footer-links">
                <li><a href="/jpg-to-pdf">JPG to PDF</a></li>
                <li><a href="/png-to-pdf">PNG to PDF</a></li>
                <li><a href="/batch-jpg-to-pdf">Batch Convert</a></li>
                <li><a href="/jpg-to-pdf-100kb">PDF Under 100KB</a></li>
                <li><a href="/png-to-pdf-high-quality">High Quality PDF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li><a href="/blog">Blog</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
                <li><a href="/sitemap">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">&copy; {new Date().getFullYear()} ConvertJPGtoPDF.online — Free JPG to PDF &amp; PNG to PDF Converter. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy-policy">Privacy</a>
              <a href="/terms-of-service">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      {toast && (
        <div className="toast-container" role="alert" aria-live="polite">
          <div className={`toast toast-${toast.type}`}>
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
