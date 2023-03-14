import {TasksType, TaskType} from "../App";
import {v1} from "uuid";

const initialState : TasksType = {}
export const tasksReducer = ( state : TasksType = initialState, action : ActionsType) : TasksType => {
    switch(action.type) {
        case "ADD-TASK" :
            let newTask : TaskType = {
            id: v1(),
            title: action.payload.title,
            isDone: false
        }
       return {...state, [action.payload.todolistId] : [newTask,...state[action.payload.todolistId]]}
        case "REMOVE-TASK" :
            return {...state, [action.payload.todolistId] : state[action.payload.todolistId].filter(el=> el.id !== action.payload.id)}
        case "CHANGE-STATUS" :
            return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(el=> el.id === action.payload.id ? {...el,isDone : action.payload.isDone} : el)}
        case "ADD-NEW-TASK-LIST" :
            return {...state, [action.payload.id] : []}
        case "CHANGE-TASK-TITLE" :
            return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(el=> el.id === action.payload.taskId ?
                    {...el, title : action.payload.title}
                    :
                el)}
        default :
            return state



    }
}

type ActionsType = ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof changeStatusTaskAC> | ReturnType<typeof addNewTaskListAC> | ReturnType<typeof changeTaskTitleAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type : "ADD-TASK",
        payload : {
            title : title,
            todolistId : todolistId
        }
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type : "REMOVE-TASK",
        payload : {
            id : id,
            todolistId : todolistId
        }
    } as const
}
export const changeStatusTaskAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type : "CHANGE-STATUS",
        payload : {
            id : id,
            isDone: isDone,
            todolistId : todolistId
        }
    } as const
}
export const addNewTaskListAC = (id: string) => {
    return {
        type : "ADD-NEW-TASK-LIST",
        payload : {
            id : id
        }
    } as const
}

export const changeTaskTitleAC = (todolistId : string, taskId: string, title : string) => {
    return {
        type : "CHANGE-TASK-TITLE",
        payload : {
            todolistId,
            taskId,
            title
        }
    } as const
}