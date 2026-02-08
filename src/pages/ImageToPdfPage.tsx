import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConverterPage } from './ConverterPage';

interface ImageToPdfPageProps {
  onNavigate: (page: string) => void;
}

export function ImageToPdfPage({ onNavigate }: ImageToPdfPageProps) {
  return (
    <div>
      <SEOHead
        title="Image to PDF Converter - Convert Images to PDF Online Free | No Signup"
        description="Convert images to PDF online for free. Upload JPG, JPEG, PNG images and convert them to PDF instantly. No signup, no server uploads, 100% private."
        canonical="https://jpgtopdfconverter.com/image-to-pdf"
        keywords="image to pdf, convert image to pdf, image to pdf converter, photo to pdf, picture to pdf, image to pdf online free, convert photo to pdf"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Image to PDF Converter' },
        ]}
        onNavigate={onNavigate}
      />
      <ConverterPage
        title="Image to PDF Converter"
        description="Convert any image to PDF instantly. Upload JPG, JPEG, PNG photos and pictures, reorder pages, customize settings, and download your PDF — free and private."
      />
    </div>
  );
}
