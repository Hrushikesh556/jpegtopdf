export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  width: number;
  height: number;
}

export type PageSize = 'a4' | 'letter' | 'auto';
export type Orientation = 'portrait' | 'landscape';
export type MarginSize = 0 | 10 | 20;
export type ImageFit = 'fill' | 'contain';

export interface PdfSettings {
  pageSize: PageSize;
  orientation: Orientation;
  margin: MarginSize;
  imageFit: ImageFit;
}
