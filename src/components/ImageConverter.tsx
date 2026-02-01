import { useState, useCallback, useRef, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface Settings {
  pageSize: 'A4' | 'Letter' | 'Auto';
  orientation: 'portrait' | 'landscape';
  margin: 'none' | 'small' | 'large';
}

// Sortable Image Component with animations
function SortableImage({ image, index, onDelete }: { image: ImageFile; index: number; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-xl overflow-hidden bg-white shadow-md image-item animate-fade-in-scale ${
        isDragging ? 'shadow-2xl ring-2 ring-indigo-400 scale-105' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="aspect-square relative">
        <img
          src={image.preview}
          alt={`Page ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Page number badge */}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          {index + 1}
        </div>
        
        {/* Drag indicator */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
        
        {/* Delete button */}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(image.id); }}
          className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
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
  const [progress, setProgress] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter((f) => f.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > 50) {
      alert('Maximum 50 images allowed');
      return;
    }

    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  }, [images.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const deleteImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    setProgress(0);

    try {
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;

      const marginValues = { none: 0, small: 10, large: 25 };
      const margin = marginValues[settings.margin];

      let pdf: InstanceType<typeof jsPDF> | null = null;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Convert to data URL
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image.file);
        });

        // Get image dimensions
        const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.src = dataUrl;
        });

        const isLandscape = settings.orientation === 'landscape';
        const format = image.file.type === 'image/png' ? 'PNG' : 'JPEG';

        if (i === 0) {
          if (settings.pageSize === 'Auto') {
            const pageWidth = dimensions.width * 0.264583;
            const pageHeight = dimensions.height * 0.264583;
            pdf = new jsPDF({
              orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
              unit: 'mm',
              format: [pageWidth, pageHeight],
            });
            pdf.addImage(dataUrl, format, 0, 0, pageWidth, pageHeight);
          } else {
            pdf = new jsPDF({
              orientation: isLandscape ? 'landscape' : 'portrait',
              unit: 'mm',
              format: settings.pageSize.toLowerCase() as 'a4' | 'letter',
            });
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const availableWidth = pageWidth - margin * 2;
            const availableHeight = pageHeight - margin * 2;
            
            const scale = Math.min(availableWidth / dimensions.width, availableHeight / dimensions.height);
            const imgWidth = dimensions.width * scale;
            const imgHeight = dimensions.height * scale;
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            pdf.addImage(dataUrl, format, x, y, imgWidth, imgHeight);
          }
        } else if (pdf) {
          if (settings.pageSize === 'Auto') {
            const pageWidth = dimensions.width * 0.264583;
            const pageHeight = dimensions.height * 0.264583;
            pdf.addPage([pageWidth, pageHeight], pageWidth > pageHeight ? 'landscape' : 'portrait');
            pdf.addImage(dataUrl, format, 0, 0, pageWidth, pageHeight);
          } else {
            pdf.addPage(settings.pageSize.toLowerCase() as 'a4' | 'letter', isLandscape ? 'landscape' : 'portrait');
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const availableWidth = pageWidth - margin * 2;
            const availableHeight = pageHeight - margin * 2;
            
            const scale = Math.min(availableWidth / dimensions.width, availableHeight / dimensions.height);
            const imgWidth = dimensions.width * scale;
            const imgHeight = dimensions.height * scale;
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            pdf.addImage(dataUrl, format, x, y, imgWidth, imgHeight);
          }
        }

        setProgress(Math.round(((i + 1) / images.length) * 100));
        await new Promise((r) => setTimeout(r, 50));
      }

      if (pdf) {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        pdf.save(`converted-images-${date}.pdf`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Error creating PDF. Please try again.');
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <div id="converter" className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="gradient-primary p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl animate-bounce-soft">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">JPG to PDF Converter</h2>
          </div>
          <p className="text-white/80 text-sm sm:text-base">
            Upload images, arrange them, and download as PDF. 100% free & private.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
            onDragLeave={() => setIsDraggingOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`upload-zone relative rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDraggingOver ? 'dragging border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
            
            <div className={`transition-transform duration-300 ${isDraggingOver ? 'scale-110' : ''}`}>
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                isDraggingOver ? 'bg-indigo-500 text-white' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
              } transition-all duration-300`}>
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <p className="text-gray-700 font-semibold text-base sm:text-lg mb-1">
                {isDraggingOver ? 'Drop images here!' : 'Drag & drop images here'}
              </p>
              <p className="text-gray-400 text-sm">or click to browse</p>
              <p className="text-gray-400 text-xs mt-2">JPG, JPEG, PNG • Max 50 images</p>
            </div>
          </div>

          {/* Image Grid */}
          {images.length > 0 && (
            <div className="mt-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {images.length} {images.length === 1 ? 'image' : 'images'}
                  </span>
                  <span className="text-gray-400 text-sm hidden sm:inline">Drag to reorder</span>
                </div>
                <button
                  onClick={clearAll}
                  className="text-red-500 hover:text-red-600 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Clear all
                </button>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map((i) => i.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {images.map((image, index) => (
                      <SortableImage key={image.id} image={image} index={index} onDelete={deleteImage} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Settings Panel */}
          {images.length > 0 && (
            <div className="mt-6 p-4 sm:p-6 bg-gray-50 rounded-2xl animate-fade-in">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                PDF Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Page Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Page Size</label>
                  <div className="flex gap-2">
                    {(['A4', 'Letter', 'Auto'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSettings({ ...settings, pageSize: size })}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          settings.pageSize === size
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Orientation</label>
                  <div className="flex gap-2">
                    {(['portrait', 'landscape'] as const).map((ori) => (
                      <button
                        key={ori}
                        onClick={() => setSettings({ ...settings, orientation: ori })}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium capitalize transition-all duration-200 flex items-center justify-center gap-2 ${
                          settings.orientation === ori
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <span className={`w-4 h-5 border-2 rounded-sm ${ori === 'landscape' ? 'w-5 h-3' : ''} ${
                          settings.orientation === ori ? 'border-white' : 'border-current'
                        }`} />
                        <span className="hidden sm:inline">{ori}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Margin</label>
                  <div className="flex gap-2">
                    {(['none', 'small', 'large'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSettings({ ...settings, margin: m })}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                          settings.margin === m
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Convert Button */}
          {images.length > 0 && (
            <div className="mt-6 animate-fade-in">
              {/* Progress bar */}
              {isConverting && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Converting images...</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button
                onClick={convertToPDF}
                disabled={isConverting || images.length === 0}
                className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isConverting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'gradient-primary hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                {isConverting ? (
                  <>
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Creating PDF...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Convert & Download PDF</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in-up z-50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">PDF downloaded successfully!</span>
        </div>
      )}

      {/* Mobile Sticky Button */}
      {images.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 sm:hidden z-40">
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className="w-full py-4 rounded-2xl gradient-primary text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            {isConverting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>{progress}% Converting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF ({images.length})</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Privacy Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 animate-fade-in">
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>100% Private • Files never leave your device</span>
      </div>
    </div>
  );
}
