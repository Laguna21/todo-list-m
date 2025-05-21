import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme, Grid } from '@mui/material'
import TaskItem from './components/TaskItem';
import TaskFormModal from './components/TaskFormModal';
import { useEffect, useRef, useState } from 'react';
import { Category, CreateTask, Task, TaskBase } from './types';
import { createTask, getTasks } from './api/tasksApi';
import { getCategories } from './api/categoriesApi';

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
      //const {id,icon,showCheck,checked,title,description,category,onToggle} = Task

     /* const newItem = {
        id,icon,showCheck,checked,title,description,category,onToggle
      }
     setTasks((prev:anyt)=>[...prev,Task])
      */
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
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Grid
    container
    spacing={2}
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    sx={{ padding: 2 }}
  >
    {/* Sección de TAREAS PENDIENTES */}
    <Grid item xs={12}>
      <h2>Tareas Pendientes</h2>
      <Grid container spacing={2}>
        {tasksPending.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem task={task} />
          </Grid>
        ))}
      </Grid>
    </Grid>

    {/* Sección de TAREAS COMPLETADAS */}
    <Grid item xs={12}>
      <h2>Tareas Completadas</h2>
      <Grid container spacing={2}>
        {tasksCompleted.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem task={task} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
         <TaskFormModal taskFormModal={taskFormProps} /> 
      </ThemeProvider>
    </>
  )
}

export default App
