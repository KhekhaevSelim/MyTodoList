import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";

const rootReducers = combineReducers({
    task : tasksReducer,
    todolist : todolistReducer
})

export const store = createStore(rootReducers)

export type StoreType = ReturnType<typeof rootReducers>

// @ts-ignore
window.store = store
