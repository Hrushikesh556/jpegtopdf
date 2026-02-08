import jsPDF from 'jspdf';
import type { ImageFile, PdfSettings } from '../types';

const PAGE_SIZES = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
};

function loadImageAsDataUrl(imageFile: ImageFile): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a canvas to ensure the image data is clean
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        // Always output as JPEG for reliability with jsPDF
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imageFile.name}`));
    img.src = imageFile.preview;
  });
}

export async function generatePdf(
  images: ImageFile[],
  settings: PdfSettings,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const { pageSize, orientation, margin, imageFit } = settings;
  const isAuto = pageSize === 'auto';

  let pdf: jsPDF | null = null;

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // Load image through canvas for clean data
    const dataUrl = await loadImageAsDataUrl(image);

    const imgWidth = image.width;
    const imgHeight = image.height;

    if (i === 0) {
      // Create PDF with first page
      if (isAuto) {
        let w = imgWidth * 0.264583; // px to mm at 96dpi
        let h = imgHeight * 0.264583;

        // Cap to reasonable size
        if (w > 500) { h = h * (500 / w); w = 500; }
        if (h > 500) { w = w * (500 / h); h = 500; }
        if (w < 50) { h = h * (50 / w); w = 50; }

        pdf = new jsPDF({
          orientation: w > h ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [w + margin * 2, h + margin * 2],
        });
      } else {
        const size = PAGE_SIZES[pageSize as 'a4' | 'letter'] || PAGE_SIZES.a4;
        pdf = new jsPDF({
          orientation,
          unit: 'mm',
          format: [size.width, size.height],
        });
      }
    } else {
      // Add subsequent pages
      if (isAuto) {
        let w = imgWidth * 0.264583;
        let h = imgHeight * 0.264583;
        if (w > 500) { h = h * (500 / w); w = 500; }
        if (h > 500) { w = w * (500 / h); h = 500; }
        if (w < 50) { h = h * (50 / w); w = 50; }
        pdf!.addPage([w + margin * 2, h + margin * 2], w > h ? 'landscape' : 'portrait');
      } else {
        const size = PAGE_SIZES[pageSize as 'a4' | 'letter'] || PAGE_SIZES.a4;
        pdf!.addPage([size.width, size.height], orientation);
      }
    }

    const pageWidth = pdf!.internal.pageSize.getWidth();
    const pageHeight = pdf!.internal.pageSize.getHeight();

    const availWidth = pageWidth - margin * 2;
    const availHeight = pageHeight - margin * 2;

    const imgRatio = imgWidth / imgHeight;
    const pageRatio = availWidth / availHeight;

    let drawWidth: number;
    let drawHeight: number;

    if (imageFit === 'contain') {
      if (imgRatio > pageRatio) {
        drawWidth = availWidth;
        drawHeight = availWidth / imgRatio;
      } else {
        drawHeight = availHeight;
        drawWidth = availHeight * imgRatio;
      }
    } else {
      // fill
      if (imgRatio > pageRatio) {
        drawHeight = availHeight;
        drawWidth = availHeight * imgRatio;
      } else {
        drawWidth = availWidth;
        drawHeight = availWidth / imgRatio;
      }
    }

    const x = margin + (availWidth - drawWidth) / 2;
    const y = margin + (availHeight - drawHeight) / 2;

    // Use JPEG format since we converted through canvas
    pdf!.addImage(dataUrl, 'JPEG', x, y, drawWidth, drawHeight, undefined, 'FAST');

    if (onProgress) onProgress(i + 1, images.length);

    // Yield to UI thread
    await new Promise((r) => setTimeout(r, 10));
  }

  if (!pdf) {
    throw new Error('No images to convert');
  }

  // Save directly using jsPDF's built-in save method
  pdf.save('converted-images.pdf');
}
