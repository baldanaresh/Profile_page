import { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';

export default function Bio({ bio, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(bio);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <div className="animate-fade-in">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <button
            onClick={handleSave}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <FaCheck /> Save
          </button>
        </div>
      ) : (
        <div className="group relative">
          <p className="text-gray-700">{text}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-500 hover:text-gray-700"
          >
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );
}