import type { PdfSettings } from '../types';

interface SettingsPanelProps {
  settings: PdfSettings;
  onSettingsChange: (settings: PdfSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const update = (key: keyof PdfSettings, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-lg text-gray-800 mb-4">⚙️ PDF Settings</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
        <select
          value={settings.pageSize}
          onChange={(e) => update('pageSize', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="a4">A4 (210 × 297 mm)</option>
          <option value="letter">Letter (8.5 × 11 in)</option>
          <option value="auto">Auto (Fit to Image)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
        <select
          value={settings.orientation}
          onChange={(e) => update('orientation', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Margin</label>
        <select
          value={settings.margin}
          onChange={(e) => update('margin', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="none">None</option>
          <option value="small">Small (10mm)</option>
          <option value="large">Large (20mm)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Fit</label>
        <select
          value={settings.imageFit}
          onChange={(e) => update('imageFit', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="contain">Contain (Keep Aspect Ratio)</option>
          <option value="fill">Fill (Stretch to Fit)</option>
        </select>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <p className="text-green-800 text-sm flex items-center gap-2">
          <span className="text-lg">🔒</span>
          <span><strong>100% Private</strong> - Files never leave your device</span>
        </p>
      </div>
    </div>
  );
}
