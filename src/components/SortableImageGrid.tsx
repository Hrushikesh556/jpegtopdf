import { useState } from 'react';
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
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ImageFile } from '../types';

interface SortableImageGridProps {
  images: ImageFile[];
  onReorder: (images: ImageFile[]) => void;
  onRemove: (id: string) => void;
}

interface SortableItemProps {
  image: ImageFile;
  index: number;
  onRemove: (id: string) => void;
}

function SortableItem({ image, index, onRemove }: SortableItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-white rounded-xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? 'border-blue-500 shadow-lg ring-2 ring-blue-300' : 'border-gray-200'
      }`}
    >
      {/* Page Number Badge */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        {index + 1}
      </div>
      
      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(image.id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10 text-lg font-bold"
        title="Remove image"
        type="button"
      >
        ×
      </button>
      
      {/* Drag Handle - covers the whole image area */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing aspect-square relative"
      >
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
        
        {/* Image */}
        <img
          src={image.preview || image.dataUrl}
          alt={image.name}
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />
        
        {/* Drag Overlay Hint */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-2 py-1 rounded transition-opacity">
            Drag to reorder
          </span>
        </div>
      </div>
      
      {/* Image Info */}
      <div className="p-2 bg-gray-50 border-t">
        <p className="text-xs text-gray-600 truncate font-medium" title={image.name}>
          {image.name}
        </p>
        {image.width && image.height && (
          <p className="text-xs text-gray-400">
            {image.width} × {image.height}
          </p>
        )}
      </div>
    </div>
  );
}

export function SortableImageGrid({ images, onReorder, onRemove }: SortableImageGridProps) {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      onReorder(arrayMove(images, oldIndex, newIndex));
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          📄 {images.length} Image{images.length !== 1 ? 's' : ''} Selected
        </h3>
        <p className="text-sm text-gray-500">
          Drag to reorder pages
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <SortableItem
                key={image.id}
                image={image}
                index={index}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
