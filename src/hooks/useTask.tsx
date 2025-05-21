import { useEffect, useRef, useState } from 'react';
import { Category, CreateTask, Task, TaskBase } from '../types';
import { createTask, getTasks, updateTask } from '../api/tasksApi';
import { getCategories } from '../api/categoriesApi';

export const useTasks = () => {
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
      return {
        categories,
        tasksCompleted,
        tasksPending,
        openModal,
        setOpenModal,
        onToggle,
        taskFormProps,
      };
};
