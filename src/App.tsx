import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme, Grid, Typography, IconButton } from '@mui/material'
import TaskItem from './components/TaskItem';
import TaskFormModal from './components/TaskFormModal';

import { mainSubTitleStyle, mainTitleStyle, taskListContainerStyle } from './styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTasks } from './hooks/useTask';

const theme = createTheme();

function App() {
  
  const {
    tasksCompleted,
    tasksPending,
    onToggle,
    taskFormProps,
    setOpenModal,
  } = useTasks();
    

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <section style={{width:"100%",display:"flex",alignItems:"center",alignContent:"center",justifyContent:"center",flexDirection:"column"}}>
        
        <section style={{width:"100%",display:"flex",flexDirection:"column", alignItems:"center", maxWidth:900,backgroundColor:"rgba(249, 250, 255, 1)"}}>
        <div style={{width:"100%",alignItems:"flex-start",display:"flex"}}>
        <h1 style={mainTitleStyle}>Lista de tareas</h1>
        </div>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 2 }}
        width={"100%"}
        maxWidth={"852px"}
      >
    {/* Sección de TAREAS PENDIENTES */}
    <Grid item xs={12} width={"100%"} sx={taskListContainerStyle}>
      <Typography sx={mainSubTitleStyle} >Tareas Pendientes</Typography> 
      <Grid container direction="column" spacing={2}  width={"100%"}  alignItems="center"
        justifyContent="center" alignContent={"center"}>
        {tasksPending.map(task => (
          <Grid item width={"100%"} key={task.id}>
            <TaskItem task={task} onToggle={onToggle} />
          </Grid>
        ))}
      </Grid>
    </Grid>

    {/* Sección de TAREAS COMPLETADAS */}
    <Grid item xs={12}  width={"100%"} sx={taskListContainerStyle}>
    <Typography  sx={mainSubTitleStyle}>Tareas Completadas</Typography>
      <Grid container direction="column" spacing={2}  width={"100%"}  alignItems="center"
        justifyContent="center" alignContent={"center"}>
        {tasksCompleted.map(task => (
          <Grid item width={"100%"} key={task.id}>
            <TaskItem task={task} onToggle={onToggle} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
   
  <IconButton 
    color="success"
    onClick={() => setOpenModal(true)}
    sx={{position:"fixed",bottom:"10%",right:"19%",width:"56px",height:"56px"}}
  >
    <AddCircleIcon sx={{width:"56px",height:"56px"}} />
  </IconButton >
  </section>
  </section>
        
         <TaskFormModal taskFormModal={taskFormProps} /> 
      </ThemeProvider>
    </>
  )
}

export default App
