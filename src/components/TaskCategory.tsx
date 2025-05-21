import {  Typography } from "@mui/material";
import { Category } from "../types";
import { categoryTextTaskStyle } from "../styles";

type CategoryProps = {
    category : Category
}

const TaskCategory = ({ category }: CategoryProps) => {

    return (
            <Typography variant="caption" sx={categoryTextTaskStyle(category.color)}>
              {category.name}
            </Typography>
          
    );
  };

export default TaskCategory;