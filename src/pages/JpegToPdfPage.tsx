import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConverterPage } from './ConverterPage';

interface JpegToPdfPageProps {
  onNavigate: (page: string) => void;
}

export function JpegToPdfPage({ onNavigate }: JpegToPdfPageProps) {
  return (
    <div>
      <SEOHead
        title="JPEG to PDF Converter - Convert JPEG to PDF Online Free | No Signup"
        description="Convert JPEG to PDF online for free. Upload multiple JPEG photos, reorder pages, customize settings, and download your PDF instantly. 100% private, no signup needed."
        canonical="https://convertjpgtopdf.online/jpeg-to-pdf"
        keywords="jpeg to pdf, convert jpeg to pdf, jpeg to pdf converter, jpeg to pdf online, jpeg to pdf free, jpeg image to pdf, jpeg photo to pdf"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'JPEG to PDF Converter' },
        ]}
        onNavigate={onNavigate}
      />
      <ConverterPage
        title="JPEG to PDF Converter"
        description="Convert JPEG images to PDF documents instantly. Upload multiple JPEG photos, reorder, customize settings, and download — completely free and private."
        acceptTypes="image/jpeg"
      />
    </div>
  );
}
