
import { CreateTask, Task, TaskBase } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

if (!BASE_URL) throw new Error("BASE_URL no está definida");

export const getTasks = async (): Promise<TaskBase[]> => {
    try {
        const res = await fetch(`${BASE_URL}/tasks`,{method:"GET"});
        const data = await res.json();
        return data
    } catch (error:any) {
        throw new Error("Error with api"  + error.message);
    }
 
};
export const getTaskById = async (id:number|string): Promise<TaskBase> => {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`,{method:"GET"});
        const data = await res.json();
        return data
    } catch (error:any) {
        throw new Error("Error with api"  + error.message);
    }
 
};

export const updateTask = async (task: TaskBase): Promise<Task> => {
    const config = {method:"PATCH",headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(task)}
    try {
        const res = await fetch(`${BASE_URL}/tasks/${task.id}`, config);
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return await res.json();
        
    } catch (error: any) {
        throw new Error("Error with api" + error.message);
    }
 
};

export const createTask = async (task: CreateTask): Promise<TaskBase> => {
    const config ={method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task)}
    try {
        const res = await fetch(`${BASE_URL}/tasks`, config);
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return await res.json();
        
    } catch (error: any) {
        throw new Error("Error with api" + error.message);
    }
  
};
