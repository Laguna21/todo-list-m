import { useState } from 'react';
import { Category, CreateTask, TaskFormType } from '../types';
import { SvgIconComponent } from '@mui/icons-material';

const defCategory = { id: '', name: '', color: '' };

export function useTaskFormModal(taskFormModal: TaskFormType) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(defCategory);
  const [categorySelected, setCategorySelected] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const { open = false, onClose, onCreate, categories = [] } = taskFormModal;
  const [activeOption, setActiveOption] = useState<'icono' | 'color' | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<SvgIconComponent | null>(null);
  const [errorMes, setErrorMes] = useState('');

  const handleToggle = (option: 'icono' | 'color') => {
    setActiveOption((prev) => (prev === option ? null : option));
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMes('');
    setCategorySelected(e.target.value);
    const cat = categories.find((c) => c.name === e.target.value) || defCategory;
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
    if (!title.trim() || !category.id) {
      setErrorMes('Por favor, completá el título y seleccioná una categoría');
      return;
    }
    const newTask:CreateTask  = {
      completed: false,
      title,
      description,
      category_id: category.id,
    };
    onCreate(newTask);
    handleClose();
  };

  const handlerTitleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrorMes('');
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
    selectedIcon,
    setSelectedIcon,
    categories,
    handleSubmit,
    handleClose,
    errorMes,
    setErrorMes,
    handlerTitleChanges
  };
}
