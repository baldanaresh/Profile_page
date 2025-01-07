import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

export default function Topics({ topics, onUpdate }) {
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (newTopic.trim()) {
      onUpdate([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    onUpdate(newTopics);
  };

  return (
    <div>
      <form onSubmit={handleAddTopic} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a new topic..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 animate-fade-in"
          >
            <span>{topic}</span>
            <button
              onClick={() => handleRemoveTopic(index)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}