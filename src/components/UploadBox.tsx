import { useCallback, useRef, useState } from 'react';
import type { ImageFile } from '../types';

interface UploadBoxProps {
  onImagesAdded: (images: ImageFile[]) => void;
  imageCount: number;
  acceptTypes?: string;
}

export function UploadBox({ onImagesAdded, imageCount, acceptTypes = 'image/jpeg,image/png,image/jpg' }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(f.type)
      );

      if (fileArray.length === 0) return;

      const remaining = 50 - imageCount;
      const toProcess = fileArray.slice(0, remaining);

      const newImages: ImageFile[] = await Promise.all(
        toProcess.map(
          (file) =>
            new Promise<ImageFile>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                  resolve({
                    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    file,
                    preview: e.target?.result as string,
                    name: file.name,
                    width: img.width,
                    height: img.height,
                  });
                };
                img.src = e.target?.result as string;
              };
              reader.readAsDataURL(file);
            })
        )
      );

      onImagesAdded(newImages);
    },
    [imageCount, onImagesAdded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isDragging
            ? 'border-red-400 bg-red-50 scale-[1.02] shadow-lg'
            : 'border-gray-300 bg-gray-50 hover:border-red-300 hover:bg-red-50/50'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptTypes}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            isDragging
              ? 'bg-red-100 text-red-500 scale-110'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800">
            {isDragging ? 'Drop your images here!' : 'Drag & Drop Images Here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or <span className="text-red-500 font-medium underline">browse files</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            JPG, JPEG, PNG • Up to 50 images • {imageCount}/50 uploaded
          </p>
        </div>
      </div>

      {imageCount >= 50 && (
        <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
          <p className="text-red-500 font-semibold">Maximum 50 images reached</p>
        </div>
      )}
    </div>
  );
}
