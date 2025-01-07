import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PostForm from './PostForm';

export default function Posts({ posts, onRemove, onAdd }) {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (post) => {
    onAdd(post);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          Add New Post
        </button>
      )}
      
      {showForm && <PostForm onAdd={handleAdd} />}

      {posts.map((post, index) => (
        <div
          key={index}
          className="relative group bg-gray-50 p-4 rounded-lg animate-fade-in"
        >
          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-gray-600">{post.excerpt}</p>
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
}