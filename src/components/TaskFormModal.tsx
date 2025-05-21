import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  MenuItem,
  IconButton
} from '@mui/material';
import { Category, TaskFormType } from '../types';
import { COLORS } from '../utils';
import { modalStyle } from '../styles';



type TaskFormModalProps = {
    taskFormModal : TaskFormType
}

export default function TaskFormModal({ taskFormModal} : TaskFormModalProps) {
    const defCategory={id: "",name: "",color: ""}

  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(defCategory);
  const [categorySelected, setCategorySelected] = useState('');
  const [selectedColor, setSelectedColor] = useState("");


  const {open = false, onClose, onCreate, categories = []} = taskFormModal
  
  const handleSubmit = () => {
    if (!title || !category.id) return;
    const newTask = {
      completed:false,  
      title,
      description,
      category_id:category.id,
      color: selectedColor,
    };
    console.log(newTask);
    onCreate(newTask);
    handleClose();
  };

  const handleCategory = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategorySelected(e.target.value)
   const cat = categories.find(c=>c.name===e.target.value) || defCategory
    setCategory(cat)
  };
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory(defCategory);
    setSelectedColor('');
    setTab(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Tabs value={tab} onChange={(e, val) => {
            e.defaultPrevented
            setTab(val)}} centered>
          <Tab label="Icono" />
          <Tab label="Color" />
        </Tabs>

        {tab === 0 && (
          <Box display="flex" justifyContent="center" my={2}>
            <Typography variant="h4">🍓</Typography>
          </Box>
        )}

        {tab === 1 && (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} my={2}>
            {COLORS.map((color) => (
              <IconButton
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid red' : 'none',
                  width: 32,
                  height: 32,
                  '&:hover': { opacity: 0.8 }
                }}
              />
            ))}
          </Box>
        )}

        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 40 }}
          required
        />

        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          inputProps={{ maxLength: 100 }}
        />

        <TextField
          select
          label="Categoría"
          value={categorySelected}
          onChange={handleCategory}
          fullWidth
          margin="normal"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button onClick={handleClose} color="success">Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="success">Crear</Button>
        </Box>
      </Box>
    </Modal>
  );
}
