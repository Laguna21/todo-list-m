import { Modal, Box, TextField, Button, MenuItem, IconButton } from '@mui/material';
import { TaskFormType } from '../types';
import { COLORS, ICONS } from '../utils';
import { modalStyle } from '../styles';
import { useTaskFormModal } from '../hooks/useTaskFormModal';
import { Apple, Circle } from '@mui/icons-material';

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
    setErrorMes,
  } = useTaskFormModal(taskFormModal);
const handlerTitleChanges = (e: React.ChangeEvent<HTMLInputElement>) =>{
   setTitle(e.target.value)
   setErrorMes('')
}
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button
            variant={activeOption === 'icono' ? 'outlined' : 'text'}
            onClick={() => handleToggle('icono')}
            startIcon={<Apple />}
            disableRipple
            disableElevation
            sx={{
              borderRadius: '100px',
              paddingX: 2,
              textTransform: 'none',
              backgroundColor: activeOption === 'icono' ? '#fff0f0' : 'transparent',
              border: activeOption === 'icono' ? '2px solid #FF6B6B' : 'none',
              color: '#FF6B6B',
            }}
          >
            <span
              style={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.15px',
                color: 'black',
              }}
            >
              Icono
            </span>
          </Button>

          <Button
            variant={activeOption === 'color' ? 'outlined' : 'text'}
            onClick={() => handleToggle('color')}
            startIcon={<Circle />}
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
            <span
              style={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.15px',
                color: 'black',
              }}
            >
              Color
            </span>
          </Button>
        </Box> */}
         {/* Selector de tipo */}
         <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button
            variant={activeOption === 'icono' ? 'outlined' : 'text'}
            onClick={() => handleToggle('icono')}
            startIcon={ <Apple />}
            disableRipple
            disableElevation
            sx={{
              borderRadius: '100px',
              paddingX: 2,
              textTransform: 'none',
              backgroundColor: activeOption === 'icono' ? '#fff0f0' : 'transparent',
              border: activeOption === 'icono' ? '2px solid #FF6B6B' : 'none',
              color: '#FF6B6B',
            }}
          >
            <span style={{ fontWeight: 400, fontSize: '16px', color: 'black' }}>Icono</span>
          </Button>

          <Button
            variant={activeOption === 'color' ? 'outlined' : 'text'}
            onClick={() => handleToggle('color')}
            startIcon={ <Circle sx={{ color: selectedColor || 'red' }} />}
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
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} my={2}>
            {ICONS.map((IconComponent, i) => (
              <IconButton
                key={i}
                onClick={() => setSelectedIcon(IconComponent)}
                sx={{
                  border: selectedIcon === IconComponent ? '2px solid red' : 'none',
                  backgroundColor: '#f5f5f5',
                  width: 48,
                  height: 48,
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
              >
                <IconComponent />
              </IconButton>
            ))}
          </Box>
        )}
        {/* Selector de color */}
        {activeOption === 'color' && (
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
                  '&:hover': { opacity: 0.8 },
                }}
              />
            ))}
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
            disabled={ !title || !categorySelected}
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
