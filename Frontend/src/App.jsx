import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import ProfileSection from './components/ProfileSection';
import Bio from './components/Bio';
import Topics from './components/Topics';
import Posts from './components/Posts';
import ColorPicker from './components/ColorPicker';

const initialSections = ['bio', 'topics', 'posts'];

export default function App() {
  const [sections, setSections] = useState(initialSections);
  const [bio, setBio] = useState('Hello! Im a software developer passionate about creating amazing user experiences.');
  const [topics, setTopics] = useState(['React', 'JavaScript', 'UI/UX']);
  const [posts, setPosts] = useState([
    { title: 'Getting Started with React', excerpt: 'Learn the basics of React and start building awesome applications.' },
    { title: 'CSS Tips and Tricks', excerpt: 'Discover advanced CSS techniques to enhance your web designs.' },
  ]);
  const [theme, setTheme] = useState({ bg: '#ffffff', text: '#000000' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleRemovePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Profile Customization</h1>
          <ColorPicker onColorChange={setTheme} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections.map((section) => {
              let content;
              switch (section) {
                case 'bio':
                  content = (
                    <ProfileSection key={section} id={section} title="Bio">
                      <Bio bio={bio} onSave={setBio} />
                    </ProfileSection>
                  );
                  break;
                case 'topics':
                  content = (
                    <ProfileSection key={section} id={section} title="Favorite Topics">
                      <Topics topics={topics} onUpdate={setTopics} />
                    </ProfileSection>
                  );
                  break;
                case 'posts':
                  content = (
                    <ProfileSection key={section} id={section} title="Recent Posts">
                      <Posts 
                        posts={posts} 
                        onRemove={handleRemovePost}
                        onAdd={handleAddPost}
                      />
                    </ProfileSection>
                  );
                  break;
                default:
                  content = null;
              }
              return content;
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}