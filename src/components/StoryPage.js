import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoryList from '../components/StoryList';

export const StoryPage = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/story/${id}`);
  };

  const handleCreate = () => {
    navigate('/admin/story/new');
  };

  return (
      <StoryList
        onEdit={handleEdit}
        onCreateNew={handleCreate}
      />
  );
};