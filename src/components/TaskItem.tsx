import { Checkbox, Card, Typography, Grid } from "@mui/material";
import { Task } from "../types";
import TaskCategory from "./TaskCategory";
import AppleIcon from '@mui/icons-material/Apple';
import { cardItemStyle, checkboxTaskStyle, descriptionItemTaskStyle, titleItemTaskStyle } from "../styles";

type TaskItemProps = {
    task : Task
}
const TaskItem = ({ task }: TaskItemProps) => {
    const { completed = false, showCheck = true, title, description, category } = task;
    //onChange={onToggle}
    return (
      <Card
        sx={cardItemStyle}
      >
        <Grid container>
        <Grid item xs={1} alignContent={"center"}>
            <Checkbox
                checked={completed}
                
                sx={checkboxTaskStyle(showCheck)}
                disableRipple
            />

        </Grid>
        <Grid item xs={8} container alignContent={"center"}>
        <Grid item xs={1} alignContent={"center"}>
        <AppleIcon color="error" />
        </Grid>
        <Grid item alignContent={"center"}>  
          <Typography sx={titleItemTaskStyle}>{title}</Typography>
          {description && (
            <Typography style={descriptionItemTaskStyle}>
              {description}
            </Typography>
          )}
          </Grid> 
            </Grid>
            <Grid item xs={3} alignContent={"center"}>
            {category && (
            <TaskCategory category={category} />  )}
            </Grid>
        </Grid>
      </Card>
    );
  };

export default TaskItem;