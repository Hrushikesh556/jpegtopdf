import { useState, useCallback, useRef } from 'react';
import { jsPDF } from 'jspdf';
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
      className={`relative group bg-white rounded-xl shadow-md overflow-hidden border-2 border-slate-200 hover:border-violet-400 transition-all ${
        isDragging ? 'opacity-50 scale-105 shadow-xl z-50' : ''
      }`}
    >
      {/* Page Number Badge */}
      <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
        {index + 1}
      </div>
      
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-manipulation"
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-slate-100">
          <img
            src={image.preview}
            alt={image.name}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(image.id);
        }}
        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-red-600 active:scale-95 shadow-lg z-20"
        aria-label="Delete image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="p-2 bg-white">
        <p className="text-xs text-slate-600 truncate font-medium">{image.name}</p>
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

    const validFiles = Array.from(files).filter(file =>
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );

    const newImages: ImageFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(prev => [...prev, ...newImages].slice(0, 50));
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
  }, [images]);

  const getMarginValue = (margin: Margin): number => {
    switch (margin) {
      case 'none': return 0;
      case 'small': return 10;
      case 'large': return 25;
    }
  };

  const getPageDimensions = (pageSize: PageSize, orientation: Orientation): { width: number; height: number } => {
    let width: number, height: number;
    
    switch (pageSize) {
      case 'A4':
        width = 210;
        height = 297;
        break;
      case 'Letter':
        width = 215.9;
        height = 279.4;
        break;
      default:
        width = 210;
        height = 297;
    }

    if (orientation === 'landscape') {
      return { width: height, height: width };
    }
    return { width, height };
  };

  const loadImageAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 800, height: 600 }); // fallback
      img.src = dataUrl;
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    setConversionProgress(0);

    try {
      const margin = getMarginValue(settings.margin);
      const isLandscape = settings.orientation === 'landscape';
      
      // Get first image to determine initial page size for Auto mode
      const firstImageDataUrl = await loadImageAsDataUrl(images[0].file);
      const firstImageDims = await getImageDimensions(firstImageDataUrl);
      
      let initialFormat: [number, number] | string;
      
      if (settings.pageSize === 'Auto') {
        const scale = 0.264583; // px to mm
        const imgW = firstImageDims.width * scale + margin * 2;
        const imgH = firstImageDims.height * scale + margin * 2;
        initialFormat = [imgW, imgH];
      } else {
        const { width, height } = getPageDimensions(settings.pageSize, settings.orientation);
        initialFormat = [width, height];
      }
      
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: initialFormat,
      });

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Load image as data URL (required for jsPDF)
        const dataUrl = i === 0 ? firstImageDataUrl : await loadImageAsDataUrl(image.file);
        const imgDims = i === 0 ? firstImageDims : await getImageDimensions(dataUrl);
        
        const imgWidth = imgDims.width;
        const imgHeight = imgDims.height;
        const imgRatio = imgWidth / imgHeight;

        let pageW: number, pageH: number;
        
        if (settings.pageSize === 'Auto') {
          const scale = 0.264583;
          pageW = imgWidth * scale + margin * 2;
          pageH = imgHeight * scale + margin * 2;
        } else {
          const dims = getPageDimensions(settings.pageSize, settings.orientation);
          pageW = dims.width;
          pageH = dims.height;
        }

        // Add new page for images after the first
        if (i > 0) {
          pdf.addPage([pageW, pageH], isLandscape ? 'l' : 'p');
        }

        let finalWidth: number, finalHeight: number;
        let x: number, y: number;

        if (settings.pageSize === 'Auto') {
          const scale = 0.264583;
          finalWidth = imgWidth * scale;
          finalHeight = imgHeight * scale;
          x = margin;
          y = margin;
        } else {
          const availableWidth = pageW - margin * 2;
          const availableHeight = pageH - margin * 2;
          const pageRatio = availableWidth / availableHeight;

          if (imgRatio > pageRatio) {
            finalWidth = availableWidth;
            finalHeight = availableWidth / imgRatio;
          } else {
            finalHeight = availableHeight;
            finalWidth = availableHeight * imgRatio;
          }

          x = (pageW - finalWidth) / 2;
          y = (pageH - finalHeight) / 2;
        }

        // Determine image format
        const format = image.file.type === 'image/png' ? 'PNG' : 'JPEG';
        
        // Add image to PDF
        pdf.addImage(dataUrl, format, x, y, finalWidth, finalHeight);
        
        setConversionProgress(Math.round(((i + 1) / images.length) * 100));
      }

      // Save the PDF
      pdf.save('converted-images.pdf');
      
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('Error converting images to PDF. Please try again.');
    } finally {
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            JPG to PDF
          </span>{' '}
          Converter
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
          Convert your JPG, JPEG, and PNG images to PDF instantly. 
          <strong className="text-slate-800"> Free, secure, no signup required.</strong>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Free
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Privacy First
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Instant Convert
          </span>
        </div>
      </header>

      {/* Main Converter Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative p-8 sm:p-12 border-2 border-dashed rounded-xl m-4 sm:m-6 cursor-pointer transition-all duration-300 ${
            isDragOver
              ? 'border-violet-500 bg-violet-50 scale-[1.02]'
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
            <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 transition-all ${
              isDragOver ? 'bg-violet-200' : 'bg-gradient-to-br from-violet-100 to-indigo-100'
            }`}>
              <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${isDragOver ? 'text-violet-600' : 'text-violet-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
              Drop your images here
            </h2>
            <p className="text-slate-600 mb-4">
              or <span className="text-violet-600 font-semibold">click to browse</span>
            </p>
            <p className="text-sm text-slate-500">
              Supports JPG, JPEG, PNG • Max 50 images
            </p>
          </div>
        </div>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Clear All
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              💡 Drag images to reorder pages in your PDF
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={images.map(i => i.id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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

        {/* Settings Panel */}
        {images.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">PDF Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Page Size */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Size
                </label>
                <select
                  value={settings.pageSize}
                  onChange={(e) => setSettings(s => ({ ...s, pageSize: e.target.value as PageSize }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="Letter">Letter (8.5 × 11 in)</option>
                  <option value="Auto">Auto (Fit Image)</option>
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Orientation
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSettings(s => ({ ...s, orientation: 'portrait' }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                      settings.orientation === 'portrait'
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="3" width="12" height="18" rx="1" strokeWidth={2} />
                    </svg>
                    Portrait
                  </button>
                  <button
                    onClick={() => setSettings(s => ({ ...s, orientation: 'landscape' }))}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                      settings.orientation === 'landscape'
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="6" width="18" height="12" rx="1" strokeWidth={2} />
                    </svg>
                    Landscape
                  </button>
                </div>
              </div>

              {/* Margin */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Margin
                </label>
                <select
                  value={settings.margin}
                  onChange={(e) => setSettings(s => ({ ...s, margin: e.target.value as Margin }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                >
                  <option value="none">No Margin</option>
                  <option value="small">Small (10mm)</option>
                  <option value="large">Large (25mm)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {images.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-slate-200">
            <button
              onClick={convertToPDF}
              disabled={isConverting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                isConverting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
              } text-white shadow-md`}
            >
              {isConverting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Converting... {conversionProgress}%
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Convert to PDF & Download
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Privacy Badge */}
      <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-green-800 text-lg">🔒 Your Privacy is Protected</h3>
            <p className="text-green-700 text-sm mt-1">
              All processing happens in your browser. Your images <strong>never leave your device</strong> and are not uploaded to any server. 
              We don't store, access, or share your files.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Convert Button */}
      {images.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg sm:hidden z-40">
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all ${
              isConverting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 active:scale-[0.98]'
            } text-white shadow-md`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Converting... {conversionProgress}%
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Convert {images.length} {images.length === 1 ? 'Image' : 'Images'} to PDF
              </span>
            )}
          </button>
        </div>
      )}
      
      {/* Spacer for mobile sticky button */}
      {images.length > 0 && <div className="h-24 sm:hidden" />}
    </main>
  );
}
