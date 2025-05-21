import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme, Grid, Typography, Button, IconButton } from '@mui/material'
import TaskItem from './components/TaskItem';
import TaskFormModal from './components/TaskFormModal';
import { useEffect, useRef, useState } from 'react';
import { Category, CreateTask, Task, TaskBase } from './types';
import { createTask, getTasks, updateTask } from './api/tasksApi';
import { getCategories } from './api/categoriesApi';
import { mainSubTitleStyle, mainTitleStyle, taskListContainerStyle } from './styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const theme = createTheme();

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const [tasksPending, setTasksPending] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const firstLoad = useRef(false);

  useEffect(()=>{
    if (firstLoad.current) return
    firstLoad.current = true
    fetchData()
  },[])
  
  const fetchData = async () => {
    try {
      const dbTasks = await getTasks();
      const dbCategories = await getCategories();
      setCategories(dbCategories); 
      
      const fullList = createTaskList(dbTasks,dbCategories)
      const pTasks = filterTaskList(fullList,false)
      const cTasks = filterTaskList(fullList,true)
      setTasksPending([...pTasks])
      setTasksCompleted([...cTasks]) 

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterTaskList = (list:TaskBase[],flag:boolean) => list.filter((it)=>it.completed === flag)
  const createTaskList = (tasklist:Task[],catList:Category[]) => {
    const newList = tasklist.map(t => {
      const category = catList.find(c => c.id === t.category_id)
      const newTask = {...t,category}
      return newTask
    })
    return newList
  }

 
    

    const handleCreate = async (newTask:CreateTask) => {
     try {
      const res = await createTask(newTask)
      console.log("Creation completed",res);
      fetchData()
     } catch (error:any) {
      console.warn("error creating task" + error.message)
     }
    
     
    }
    
    const taskFormProps = {
      open: openModal,
      onClose: () => {setOpenModal(!open)},
      onCreate: handleCreate,
      categories: categories
    }

    const onToggle = (item:Task) => {
      const {id,
        title,
        description,
        category_id} = item
      const updatedItem:TaskBase = { id,
        title,
        description,
        completed: !item.completed,
        category_id };
        updateTaskItem(updatedItem)
/* 
      if (item.completed) {
        setTasksCompleted(prev => prev.filter(it => it.id !== item.id));
        setTasksPending(prev => [updatedItem, ...prev]);
      } else {
        setTasksPending(prev => prev.filter(it => it.id !== item.id));
        setTasksCompleted(prev => [updatedItem, ...prev]);
      }
       */

    }
    
    /*  const removeTaskFromList = (id:string|number,completed?:boolean|null) => {
      if(completed) setTasksCompleted(prev => prev.filter(it => it.id !== id))
      if(!completed) setTasksPending(prev => prev.filter(it => it.id !== id))
    } */
    
    const updateTaskItem = async (newTask:TaskBase) => {
      try {
        const res = await updateTask(newTask)
        console.log("Creation completed",res);
        fetchData()
       } catch (error:any) {
        console.warn("error creating task" + error.message)
       }
    }

    

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
