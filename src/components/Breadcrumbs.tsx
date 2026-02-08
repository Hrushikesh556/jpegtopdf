interface BreadcrumbItem {
  label: string;
  page?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: string) => void;
}

const PAGE_PATHS: Record<string, string> = {
  'home': '/',
  'png-to-pdf': '/png-to-pdf',
  'jpeg-to-pdf': '/jpeg-to-pdf',
  'image-to-pdf': '/image-to-pdf',
  'how-to-guide': '/how-to-convert-jpg-to-pdf',
  'faq': '/faq',
  'blog': '/blog',
  'about': '/about',
  'contact': '/contact',
  'privacy': '/privacy-policy',
  'terms': '/terms-of-service',
  'sitemap': '/sitemap',
};

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-1"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <svg className="w-3.5 h-3.5 text-gray-400 mx-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.page && index < items.length - 1 ? (
              <a
                href={PAGE_PATHS[item.page] || '/'}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.page!);
                }}
                className="hover:text-red-600 transition"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span className="text-gray-800 font-medium" itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
