import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const presetColors = [
  { name: 'Light', bg: '#ffffff', text: '#000000' },
  { name: 'Dark', bg: '#1a1a1a', text: '#ffffff' },
  { name: 'Blue', bg: '#f0f7ff', text: '#1e3a8a' },
  { name: 'Green', bg: '#f0fdf4', text: '#166534' },
];

export default function ColorPicker({ onColorChange }) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#ffffff');

  const handlePresetSelect = (preset) => {
    onColorChange(preset);
  };

  const handleCustomColorChange = (color) => {
    setCustomColor(color);
    onColorChange({ bg: color, text: '#000000' });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presetColors.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handlePresetSelect(preset)}
            className="px-4 py-2 rounded-md border hover:shadow-md transition-shadow"
            style={{ backgroundColor: preset.bg, color: preset.text }}
          >
            {preset.name}
          </button>
        ))}
      </div>
      
      <div>
        <button
          onClick={() => setShowCustomPicker(!showCustomPicker)}
          className="text-blue-500 hover:text-blue-600"
        >
          {showCustomPicker ? 'Hide Custom Colors' : 'Custom Colors'}
        </button>
        
        {showCustomPicker && (
          <div className="mt-2 animate-fade-in">
            <HexColorPicker color={customColor} onChange={handleCustomColorChange} />
          </div>
        )}
      </div>
    </div>
  );
}