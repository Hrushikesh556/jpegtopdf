import type { PdfSettings, PageSize, Orientation, MarginSize, ImageFit } from '../types';

interface SettingsPanelProps {
  settings: PdfSettings;
  onSettingsChange: (settings: PdfSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const update = (key: keyof PdfSettings, value: PageSize | Orientation | MarginSize | ImageFit) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        PDF Settings
      </h3>

      <div className="space-y-4">
        {/* Page Size */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Page Size</label>
          <div className="grid grid-cols-3 gap-1.5">
            {([
              { value: 'a4', label: 'A4' },
              { value: 'letter', label: 'Letter' },
              { value: 'auto', label: 'Auto' },
            ] as { value: PageSize; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('pageSize', opt.value)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition border ${
                  settings.pageSize === opt.value
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Orientation</label>
          <div className="grid grid-cols-2 gap-1.5">
            {([
              { value: 'portrait', label: '📄 Portrait' },
              { value: 'landscape', label: '📃 Landscape' },
            ] as { value: Orientation; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('orientation', opt.value)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition border ${
                  settings.orientation === opt.value
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Margin */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Margin</label>
          <div className="grid grid-cols-3 gap-1.5">
            {([
              { value: 0, label: 'None' },
              { value: 10, label: 'Small' },
              { value: 20, label: 'Large' },
            ] as { value: MarginSize; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('margin', opt.value)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition border ${
                  settings.margin === opt.value
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Fit */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Image Fit</label>
          <div className="grid grid-cols-2 gap-1.5">
            {([
              { value: 'contain', label: 'Contain' },
              { value: 'fill', label: 'Fill' },
            ] as { value: ImageFit; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('imageFit', opt.value)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition border ${
                  settings.imageFit === opt.value
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Badge */}
      <div className="mt-5 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-2">
          <span className="text-green-600 text-lg mt-[-2px]">🔒</span>
          <div>
            <p className="text-xs font-semibold text-green-800">100% Private</p>
            <p className="text-xs text-green-600 mt-0.5">
              All processing happens in your browser. Files never leave your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
