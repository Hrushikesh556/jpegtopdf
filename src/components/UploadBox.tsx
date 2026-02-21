import { useCallback, useRef, useState } from 'react';
import type { ImageFile } from '../types';

interface UploadBoxProps {
  onFilesAdded: (files: ImageFile[]) => void;
  maxFiles?: number;
  currentCount?: number;
}

// Read file as base64 data URL
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Get image dimensions from data URL
function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

export function UploadBox({ onFilesAdded, maxFiles = 50, currentCount = 0 }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setProcessingStatus('Reading files...');

    try {
      const remainingSlots = maxFiles - currentCount;
      if (remainingSlots <= 0) {
        alert(`Maximum ${maxFiles} images allowed. Please remove some images first.`);
        setIsProcessing(false);
        return;
      }

      const fileArray = Array.from(files);
      const validFiles = fileArray
        .filter(file => {
          const isImage = file.type === 'image/jpeg' || 
                          file.type === 'image/jpg' || 
                          file.type === 'image/png';
          if (!isImage) {
            console.warn(`Skipping non-image file: ${file.name} (${file.type})`);
          }
          return isImage;
        })
        .slice(0, remainingSlots);

      if (validFiles.length === 0) {
        alert('Please select valid image files (JPG, JPEG, or PNG)');
        setIsProcessing(false);
        return;
      }

      const imageFiles: ImageFile[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setProcessingStatus(`Processing ${i + 1} of ${validFiles.length}...`);
        
        try {
          // Read file as base64 data URL
          const dataUrl = await readFileAsDataUrl(file);
          
          // Get image dimensions
          const dimensions = await getImageDimensions(dataUrl);
          
          imageFiles.push({
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            file,
            preview: dataUrl, // Use data URL for preview too
            dataUrl: dataUrl, // Store data URL for PDF generation
            name: file.name,
            width: dimensions.width,
            height: dimensions.height,
          });
        } catch (err) {
          console.error(`Error processing file ${file.name}:`, err);
        }
      }

      if (imageFiles.length > 0) {
        onFilesAdded(imageFiles);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  }, [onFilesAdded, maxFiles, currentCount]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    processFiles(files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    processFiles(files);
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);

  const handleClick = useCallback(() => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  }, [isProcessing]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isProcessing) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }, [isProcessing]);

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      role="button"
      tabIndex={0}
      aria-label="Upload images"
      className={`
        border-3 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer
        ${isDragging 
          ? 'border-blue-500 bg-blue-100 scale-[1.02]' 
          : 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
        }
        ${isProcessing ? 'opacity-70 cursor-wait' : ''}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />
      
      <div className="pointer-events-none">
        <div className="text-6xl mb-4">
          {isProcessing ? '⏳' : isDragging ? '📥' : '📁'}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          {isProcessing 
            ? processingStatus || 'Processing images...'
            : isDragging 
              ? 'Drop images here!' 
              : 'Drop images here or click to upload'
          }
        </h2>
        
        <p className="text-gray-600 mb-4">
          Supports JPG, JPEG, PNG • Up to {maxFiles} images
        </p>
        
        <div className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${
          isProcessing 
            ? 'bg-gray-400 text-white' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
          {isProcessing ? 'Processing...' : 'Select Images'}
        </div>
        
        {currentCount > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            {currentCount} of {maxFiles} images added
          </p>
        )}
      </div>
    </div>
  );
}
