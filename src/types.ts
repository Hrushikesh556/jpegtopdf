export interface ImageFile {
  id: string;
  file: File;
  preview: string;  // Blob URL for preview display
  dataUrl: string;  // Base64 data URL for PDF generation
  name: string;
  width?: number;
  height?: number;
}

export interface PdfSettings {
  pageSize: 'a4' | 'letter' | 'auto';
  orientation: 'portrait' | 'landscape';
  margin: 'none' | 'small' | 'large';
  imageFit: 'contain' | 'fill';
}

export type PageType = 
  | 'home' 
  | 'jpg-to-pdf' 
  | 'png-to-pdf' 
  | 'jpeg-to-pdf'
  | 'image-to-pdf'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'how-to'
  | 'sitemap'
  | '404';
