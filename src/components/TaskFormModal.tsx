import { Modal, Box, TextField, Button, MenuItem, IconButton, Grid } from '@mui/material';
import { TaskFormType } from '../types';
import { COLORS, ICONS } from '../utils';
import { modalStyle } from '../styles';
import { useTaskFormModal } from '../hooks/useTaskFormModal';
import { Apple, Circle } from '@mui/icons-material';
import { createElement, Fragment, useMemo } from 'react';

type TaskFormModalProps = {
  taskFormModal: TaskFormType;
};

export default function TaskFormModal({ taskFormModal }: TaskFormModalProps) {
  const {
    open,
    activeOption,
    handleToggle,
    title,
    setTitle,
    description,
    setDescription,
    categorySelected,
    handleCategory,
    selectedIcon,
    setSelectedIcon,
    selectedColor,
    setSelectedColor,
    categories,
    handleSubmit,
    handleClose,
    errorMes,
    handlerTitleChanges,
  } = useTaskFormModal(taskFormModal);

  const iconSelected = (
    <Fragment>{!selectedIcon ? <Apple /> : createElement(selectedIcon)}</Fragment>
  );
  const renderedIcons = useMemo(
    () =>
      ICONS.map((IconComponent, i) => (
        <div
          style={{ width: '25%', display: 'flex', justifyContent: 'center', padding: 5 }}
          key={i}
        >
          <IconButton
            onClick={() => setSelectedIcon(IconComponent)}
            sx={{
              color: selectedColor ? selectedColor : 'red',
              border: selectedIcon === IconComponent ? '2px solid red' : 'none',
              padding: '5px',
              backgroundColor: 'transparent',
              width: 34,
              height: 34,
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            <IconComponent />
          </IconButton>
        </div>
      )),
    [selectedIcon]
  );
  const renderedColors = useMemo(
    () =>
      COLORS.map((color) => (
        <div
          style={{ width: '25%', display: 'flex', justifyContent: 'center', padding: 5 }}
          key={color}
        >
          <IconButton
            onClick={() => setSelectedColor(color)}
            sx={{
              backgroundColor: color,
              border: selectedColor === color ? '2px solid red' : 'none',
              width: 24,
              height: 24,
            }}
          />
        </div>
      )),
    [selectedColor]
  );
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Selector de tipo */}
        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button
            variant={activeOption === 'icono' ? 'outlined' : 'text'}
            onClick={() => handleToggle('icono')}
            startIcon={iconSelected}
            disableRipple
            disableElevation
            sx={{
              borderRadius: '100px',
              paddingX: 2,
              textTransform: 'none',
              backgroundColor: activeOption === 'icono' ? '#fff0f0' : 'transparent',
              border: activeOption === 'icono' ? '2px solid #FF6B6B' : 'none',
              color: selectedColor ? selectedColor : '#FF6B6B',
            }}
          >
            <span style={{ fontWeight: 400, fontSize: '16px', color: 'black' }}>Icono</span>
          </Button>

          <Button
            variant={activeOption === 'color' ? 'outlined' : 'text'}
            onClick={() => handleToggle('color')}
            startIcon={<Circle sx={{ color: selectedColor || 'red' }} />}
            disableRipple
            sx={{
              borderRadius: '100px',
              paddingX: 2,
              textTransform: 'none',
              backgroundColor: activeOption === 'color' ? '#fff0f0' : 'transparent',
              border: activeOption === 'color' ? '2px solid #FF6B6B' : 'none',
              color: '#FF6B6B',
            }}
          >
            <span style={{ fontWeight: 400, fontSize: '16px', color: 'black' }}>Color</span>
          </Button>
        </Box>
        {/* Selector de iconos */}
        {activeOption === 'icono' && (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} my={3}>
            <Grid
              container
              spacing={2}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              alignContent={'flex-start'}
            >
              {renderedIcons}
            </Grid>
          </Box>
        )}

        {/* Selector de color */}
        {activeOption === 'color' && (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} my={3}>
            <Grid
              container
              spacing={2}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              alignContent={'flex-start'}
            >
              {renderedColors}
            </Grid>
          </Box>
        )}

        <TextField
          label="Título"
          value={title}
          onChange={handlerTitleChanges}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 40 }}
          error={errorMes.trim().length !== 0 && title.trim().length !== 0}
          helperText={errorMes}
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
          error={errorMes.trim().length !== 0 && categorySelected.trim().length !== 0}
          helperText={errorMes}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button onClick={handleClose} color="success" sx={{ borderRadius: '100px' }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            sx={{ borderRadius: '100px' }}
            disabled={!title || !categorySelected}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
