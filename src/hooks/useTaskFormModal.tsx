import { useState } from 'react';
import { Category, TaskFormType } from '../types';

const defCategory = { id: "", name: "", color: "" };

export function useTaskFormModal(taskFormModal: TaskFormType) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(defCategory);
  const [categorySelected, setCategorySelected] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const {open=false, onClose, onCreate, categories = [] } = taskFormModal;
  const [activeOption, setActiveOption] = useState<"icono" | "color" | null>(null);

const handleToggle = (option: "icono" | "color") => {
  setActiveOption(prev => prev === option ? null : option);
};

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySelected(e.target.value);
    const cat = categories.find(c => c.name === e.target.value) || defCategory;
    setCategory(cat);
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory(defCategory);
    setCategorySelected('');
    setSelectedColor('');
    setActiveOption(null);
    onClose();
  };

  const handleSubmit = () => {
    if (!title || !category.id) return;
    const newTask = {
      completed: false,
      title,
      description,
      category_id: category.id,
      color: selectedColor,
    };
    onCreate(newTask);
    handleClose();
  };

  return {
    open,
    title,
    setTitle,
    description,
    setDescription,
    categorySelected,
    activeOption,
    handleToggle,
    handleCategory,
    selectedColor,
    setSelectedColor,
    categories,
    handleSubmit,
    handleClose,
  };
}
