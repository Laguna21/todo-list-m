import { Checkbox, Card, Typography} from "@mui/material";
import { Task } from "../types";
import TaskCategory from "./TaskCategory";
import AppleIcon from '@mui/icons-material/Apple';
import { cardItemStyle, checkboxTaskStyle, descriptionItemTaskStyle, textDots, titleItemTaskStyle } from "../styles";

type TaskItemProps = {
    task : Task,
    onToggle:(itemTask:Task)=>void
}
const TaskItem = ({ task,onToggle }: TaskItemProps) => {
    const { completed = false, showCheck = true, title, description, category } = task;
    return (
      <Card
        sx={cardItemStyle}
      >
        <section style={{width:"100%",display:"flex",alignItems:"center",alignContent:"center",justifyContent:"space-between"}}>
        <article style={{display:"flex",alignItems:"center",alignContent:"center",justifyContent:"flex-start"}}>
            <Checkbox
                checked={completed}
                sx={checkboxTaskStyle(showCheck)}
                onChange={()=>onToggle(task)}
            />
            {/* disableRipple */}
          <AppleIcon sx={{marginRight:"10px"}} color="error" />
          <article style={{display:"flex",flexDirection:"column",flexWrap:"wrap",justifyContent:"flex-start"}}>
          <Typography sx={[titleItemTaskStyle,textDots]}>{title}</Typography>
          {description && (
            <Typography sx={[descriptionItemTaskStyle,textDots]}>
              {description}
            </Typography>
          )}
          </article>
        </article>

        <article style={{display:"flex",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
            {category && (
            <TaskCategory category={category} />  )}
            </article>
            </section>
      </Card>
    );
  };

export default TaskItem;