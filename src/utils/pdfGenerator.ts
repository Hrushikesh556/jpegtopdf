import { jsPDF } from 'jspdf';
import type { ImageFile, PdfSettings } from '../types';

const PAGE_SIZES = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
};

const MARGINS = {
  none: 0,
  small: 10,
  large: 20,
};

export interface PdfResult {
  blob: Blob;
  url: string;
  filename: string;
}

// Load image and return dimensions
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

// Convert image to JPEG data URL
async function toJpegDataUrl(dataUrl: string): Promise<string> {
  const img = await loadImage(dataUrl);
  
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  // White background for transparent images
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  
  return canvas.toDataURL('image/jpeg', 0.92);
}

export async function generatePdf(
  images: ImageFile[],
  settings: PdfSettings,
  onProgress?: (progress: number) => void
): Promise<PdfResult> {
  if (images.length === 0) {
    throw new Error('No images to convert');
  }

  const margin = MARGINS[settings.margin];
  let pdf: jsPDF | null = null;
  let successCount = 0;

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    
    // Update progress at start
    if (onProgress) {
      onProgress(Math.round((i / images.length) * 90));
    }

    try {
      const dataUrl = image.dataUrl;
      
      if (!dataUrl || !dataUrl.startsWith('data:')) {
        console.error(`Invalid data URL for image: ${image.name}`);
        continue;
      }

      // Load image to get dimensions
      const img = await loadImage(dataUrl);
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      
      // Convert to JPEG
      const jpegDataUrl = await toJpegDataUrl(dataUrl);

      const imgAspect = imgWidth / imgHeight;

      let pageWidth: number;
      let pageHeight: number;

      if (settings.pageSize === 'auto') {
        const pxToMm = 25.4 / 96;
        pageWidth = imgWidth * pxToMm + margin * 2;
        pageHeight = imgHeight * pxToMm + margin * 2;
      } else {
        const size = PAGE_SIZES[settings.pageSize];
        if (settings.orientation === 'landscape') {
          pageWidth = size.height;
          pageHeight = size.width;
        } else {
          pageWidth = size.width;
          pageHeight = size.height;
        }
      }

      const pageOrientation = pageWidth > pageHeight ? 'landscape' : 'portrait';

      if (i === 0) {
        pdf = new jsPDF({
          orientation: pageOrientation,
          unit: 'mm',
          format: settings.pageSize === 'auto' ? [pageWidth, pageHeight] : settings.pageSize,
        });
      } else if (pdf) {
        pdf.addPage(
          settings.pageSize === 'auto' ? [pageWidth, pageHeight] : settings.pageSize,
          pageOrientation
        );
      }

      if (!pdf) {
        throw new Error('Failed to create PDF');
      }

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;
      const availableAspect = availableWidth / availableHeight;

      let drawWidth: number;
      let drawHeight: number;

      if (settings.imageFit === 'contain') {
        if (imgAspect > availableAspect) {
          drawWidth = availableWidth;
          drawHeight = availableWidth / imgAspect;
        } else {
          drawHeight = availableHeight;
          drawWidth = availableHeight * imgAspect;
        }
      } else {
        drawWidth = availableWidth;
        drawHeight = availableHeight;
      }

      const x = margin + (availableWidth - drawWidth) / 2;
      const y = margin + (availableHeight - drawHeight) / 2;

      pdf.addImage(jpegDataUrl, 'JPEG', x, y, drawWidth, drawHeight, undefined, 'FAST');
      successCount++;
      
    } catch (error) {
      console.error(`Error processing image ${i + 1} (${image.name}):`, error);
    }
  }

  if (onProgress) {
    onProgress(95);
  }

  if (!pdf || successCount === 0) {
    throw new Error('Failed to generate PDF - no images were processed successfully');
  }

  // Generate blob
  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  const filename = `images-to-pdf-${Date.now()}.pdf`;

  if (onProgress) {
    onProgress(100);
  }

  return { blob, url, filename };
}

// Download function
export function downloadPdf(result: PdfResult): void {
  const link = document.createElement('a');
  link.href = result.url;
  link.download = result.filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Cleanup function
export function cleanupPdfUrl(url: string): void {
  URL.revokeObjectURL(url);
}
