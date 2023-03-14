import {FilterValuesType, TodolistType} from "../App";

const initialState : Array<TodolistType>= []
export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST" :
            let newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all"
            }
            return [newTodolist, ...state]
        case "CHANGE-FILTER" :
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        case "REMOVE-TODOLIST" :
            return state.filter(el => el.id !== action.payload.id)
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(el=> el.id === action.payload.todolistId ? {...el,title : action.payload.title} : el)
        default:
            return state

    }
}

type ActionsType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitletAC>

export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            todolistId: todolistId
        }
    } as const
}
export const changeFilterTodolistAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todolistId: todolistId,
            value: value
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: id
        }
    } as const
}

export const changeTodolistTitletAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            title
        }
    } as const
}