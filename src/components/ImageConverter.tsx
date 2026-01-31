import { useState, useCallback, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

type PageSize = 'A4' | 'Letter' | 'Auto';
type Orientation = 'portrait' | 'landscape';
type Margin = 'none' | 'small' | 'large';

interface Settings {
  pageSize: PageSize;
  orientation: Orientation;
  margin: Margin;
}

function SortableImage({ 
  image, 
  onDelete,
  index
}: { 
  image: ImageFile; 
  onDelete: (id: string) => void;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-white rounded-lg shadow overflow-hidden border-2 transition-all ${
        isDragging 
          ? 'border-violet-500 shadow-xl scale-105 z-50' 
          : 'border-slate-200 hover:border-violet-300'
      }`}
    >
      {/* Page Number */}
      <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
        {index + 1}
      </div>
      
      {/* Delete Button - Always visible on mobile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(image.id);
        }}
        className="absolute top-1.5 right-1.5 z-10 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        aria-label="Delete image"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-manipulation"
      >
        <div className="aspect-[3/4] bg-slate-100">
          <img
            src={image.preview}
            alt={image.name}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
      
      {/* Filename */}
      <div className="p-2 border-t border-slate-100">
        <p className="text-xs text-slate-600 truncate">{image.name}</p>
      </div>
    </div>
  );
}

export default function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<Settings>({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 'small',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    setError(null);
    setSuccessMessage(null);

    const validFiles = Array.from(files).filter(file =>
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );

    if (validFiles.length === 0) {
      setError('Please select valid image files (JPG, JPEG, or PNG)');
      return;
    }

    const newImages: ImageFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(prev => {
      const combined = [...prev, ...newImages];
      if (combined.length > 50) {
        setError('Maximum 50 images allowed');
        return combined.slice(0, 50);
      }
      return combined;
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const deleteImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError(null);
    setSuccessMessage(null);
  }, [images]);

  const getMarginValue = (margin: Margin): number => {
    switch (margin) {
      case 'none': return 0;
      case 'small': return 10;
      case 'large': return 25;
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file as data URL'));
          }
        };
        reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
        reader.readAsDataURL(file);
      } catch (error) {
        reject(new Error(`Error processing file: ${file.name}`));
      }
    });
  };

  const loadImage = (dataUrl: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image for processing'));
        img.src = dataUrl;
      } catch (error) {
        reject(new Error('Error creating image element'));
      }
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    setError(null);
    setSuccessMessage(null);

    try {
      // Dynamic import jsPDF
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
      
      if (!jsPDF) {
        throw new Error('Failed to load PDF library');
      }

      const margin = getMarginValue(settings.margin);
      const isLandscape = settings.orientation === 'landscape';
      
      // Page dimensions in mm
      const pageDimensions: Record<string, { width: number; height: number }> = {
        A4: { width: 210, height: 297 },
        Letter: { width: 215.9, height: 279.4 },
      };

      // Load first image to determine initial page size for Auto mode
      const firstDataUrl = await fileToDataUrl(images[0].file);
      const firstImg = await loadImage(firstDataUrl);
      
      // Calculate initial PDF dimensions
      let initialWidth: number;
      let initialHeight: number;
      let pdfFormat: string | [number, number];
      let pdfOrientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait';
      
      if (settings.pageSize === 'Auto') {
        // Auto mode: fit page to image
        const maxDimension = 297; // Max dimension in mm (A4 height)
        const imgRatio = firstImg.width / firstImg.height;
        
        if (firstImg.width > firstImg.height) {
          initialWidth = maxDimension;
          initialHeight = maxDimension / imgRatio;
          pdfOrientation = 'landscape';
        } else {
          initialHeight = maxDimension;
          initialWidth = maxDimension / imgRatio;
          pdfOrientation = 'portrait';
        }
        pdfFormat = [initialWidth, initialHeight];
      } else {
        const dims = pageDimensions[settings.pageSize];
        initialWidth = isLandscape ? dims.height : dims.width;
        initialHeight = isLandscape ? dims.width : dims.height;
        pdfFormat = settings.pageSize === 'A4' ? 'a4' : 'letter';
      }

      // Create PDF document
      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'mm',
        format: pdfFormat,
      });

      // Process each image
      for (let i = 0; i < images.length; i++) {
        const imageFile = images[i];
        
        // Load image data
        const dataUrl = i === 0 ? firstDataUrl : await fileToDataUrl(imageFile.file);
        const img = i === 0 ? firstImg : await loadImage(dataUrl);
        
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgRatio = imgWidth / imgHeight;

        // Calculate page dimensions for this image
        let pageWidth: number;
        let pageHeight: number;

        if (settings.pageSize === 'Auto') {
          const maxDimension = 297;
          if (imgWidth > imgHeight) {
            pageWidth = maxDimension;
            pageHeight = maxDimension / imgRatio;
          } else {
            pageHeight = maxDimension;
            pageWidth = maxDimension / imgRatio;
          }
        } else {
          const dims = pageDimensions[settings.pageSize];
          pageWidth = isLandscape ? dims.height : dims.width;
          pageHeight = isLandscape ? dims.width : dims.height;
        }

        // Add new page for images after the first
        if (i > 0) {
          if (settings.pageSize === 'Auto') {
            const pageOrientation = imgWidth > imgHeight ? 'l' : 'p';
            pdf.addPage([pageWidth, pageHeight], pageOrientation);
          } else {
            pdf.addPage();
          }
        }

        // Calculate available space (accounting for margins)
        const availableWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (margin * 2);

        // Calculate final image dimensions to fit within available space
        let finalWidth: number;
        let finalHeight: number;

        if (imgRatio > availableWidth / availableHeight) {
          // Image is wider than available space
          finalWidth = availableWidth;
          finalHeight = availableWidth / imgRatio;
        } else {
          // Image is taller than available space
          finalHeight = availableHeight;
          finalWidth = availableHeight * imgRatio;
        }

        // Center the image on the page
        const x = margin + (availableWidth - finalWidth) / 2;
        const y = margin + (availableHeight - finalHeight) / 2;

        // Determine image format
        const imageFormat = imageFile.file.type === 'image/png' ? 'PNG' : 'JPEG';

        // Add image to PDF
        pdf.addImage(
          dataUrl,
          imageFormat,
          x,
          y,
          finalWidth,
          finalHeight,
          undefined,
          'MEDIUM'
        );

        // Update progress
        const progress = Math.round(((i + 1) / images.length) * 100);
        setConversionProgress(progress);
        
        // Small delay to allow UI to update
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Generate filename with timestamp
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
      const filename = `images-to-pdf_${timestamp}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
      setSuccessMessage(`✓ PDF downloaded! ${images.length} page${images.length > 1 ? 's' : ''} created successfully.`);

    } catch (err) {
      console.error('PDF conversion error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to create PDF: ${errorMessage}. Please try again.`);
    } finally {
      setIsConverting(false);
      setTimeout(() => setConversionProgress(0), 500);
    }
  };

  return (
    <section id="converter" className="scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            Upload Your Images
          </h2>
          <p className="text-sm text-slate-600">
            Drag and drop or click to select files
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="flex-1">{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="text-green-400 hover:text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative p-6 sm:p-10 border-2 border-dashed rounded-lg m-3 sm:m-4 cursor-pointer transition-all ${
              isDragOver
                ? 'border-violet-500 bg-violet-50'
                : 'border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            <div className="text-center">
              <div className={`mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 ${
                isDragOver ? 'bg-violet-200' : 'bg-violet-100'
              }`}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
                {isDragOver ? 'Drop images here!' : 'Drag & drop images'}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                or <span className="text-violet-600 font-medium">browse files</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded">JPG</span>
                <span className="px-2 py-1 bg-slate-100 rounded">PNG</span>
                <span className="px-2 py-1 bg-slate-100 rounded">Up to 50 files</span>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          {images.length > 0 && (
            <div className="px-3 sm:px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-800">
                    {images.length} {images.length === 1 ? 'image' : 'images'}
                  </span>
                  <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full">
                    {images.length} pages
                  </span>
                </div>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              </div>
              
              <p className="text-xs text-slate-500 mb-3">
                ↔ Drag to reorder pages
              </p>
              
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={images.map(i => i.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                    {images.map((image, index) => (
                      <SortableImage
                        key={image.id}
                        image={image}
                        onDelete={deleteImage}
                        index={index}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Settings */}
          {images.length > 0 && (
            <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">PDF Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Page Size */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Page Size
                  </label>
                  <select
                    value={settings.pageSize}
                    onChange={(e) => setSettings(s => ({ ...s, pageSize: e.target.value as PageSize }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="Auto">Auto (Fit to Image)</option>
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Orientation
                  </label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSettings(s => ({ ...s, orientation: 'portrait' }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        settings.orientation === 'portrait'
                          ? 'bg-violet-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="7" y="4" width="10" height="16" rx="1" strokeWidth={2} />
                      </svg>
                      <span className="hidden sm:inline">Portrait</span>
                    </button>
                    <button
                      onClick={() => setSettings(s => ({ ...s, orientation: 'landscape' }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        settings.orientation === 'landscape'
                          ? 'bg-violet-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="4" y="7" width="16" height="10" rx="1" strokeWidth={2} />
                      </svg>
                      <span className="hidden sm:inline">Landscape</span>
                    </button>
                  </div>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Margin
                  </label>
                  <select
                    value={settings.margin}
                    onChange={(e) => setSettings(s => ({ ...s, margin: e.target.value as Margin }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="none">No Margin</option>
                    <option value="small">Small (10mm)</option>
                    <option value="large">Large (25mm)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Convert Button - Desktop */}
          {images.length > 0 && (
            <div className="p-3 sm:p-4 border-t border-slate-200 hidden sm:block">
              <button
                onClick={convertToPDF}
                disabled={isConverting}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  isConverting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-700 active:scale-[0.99]'
                }`}
              >
                {isConverting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Converting... {conversionProgress}%
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Convert to PDF & Download
                  </span>
                )}
              </button>
              
              {/* Progress Bar */}
              {isConverting && (
                <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-violet-600 transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 text-sm">100% Private & Secure</h4>
              <p className="text-green-700 text-xs mt-0.5">
                All processing happens in your browser. Files never leave your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      {images.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 shadow-lg sm:hidden z-40">
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all ${
              isConverting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-violet-600 active:bg-violet-700'
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {conversionProgress}%
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M6 20h12a2 2 0 002-2V8l-6-6H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Convert {images.length} {images.length === 1 ? 'Image' : 'Images'}
              </span>
            )}
          </button>
        </div>
      )}
      
      {/* Spacer for mobile sticky button */}
      {images.length > 0 && <div className="h-20 sm:hidden" />}
    </section>
  );
}
