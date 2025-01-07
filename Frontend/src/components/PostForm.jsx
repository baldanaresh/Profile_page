import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function PostForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && excerpt.trim()) {
      onAdd({ title: title.trim(), excerpt: excerpt.trim() });
      setTitle('');
      setExcerpt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Post excerpt..."
          rows={3}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <FaPlus /> Add Post
      </button>
    </form>
  );
}