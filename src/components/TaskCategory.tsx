import { Typography } from '@mui/material';
import { Category } from '../types';
import { categoryTextTaskStyle } from '../styles';

type CategoryProps = {
  category: Category;
  completed: boolean
};

const TaskCategory = ({ category, completed }: CategoryProps) => {
  return (
    <Typography variant="caption" sx={categoryTextTaskStyle(category.color,completed)}>
      {category.name}
    </Typography>
  );
};

export default TaskCategory;
