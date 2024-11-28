import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from "./CategoryList";

export const CategoryPage = () => {
  const navigate = useNavigate();

  const handleEdit = (id, category) => {
    navigate(`/admin/category/${id}`, { state: category });
  };

  const handleCreate = () => {
    navigate('/admin/category/new');
  };

  return (
    <CategoryList
      onEdit={handleEdit}
      onCreateNew={handleCreate}
    />
  );
};