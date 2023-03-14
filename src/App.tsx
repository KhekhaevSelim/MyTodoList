import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist"
import {v1} from 'uuid';
import AddItemInput from "./components/AddItemInput";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonAppBar from "./components/ButtonAppBar";
import {
    addNewTaskListAC,
    addTaskAC,
    changeStatusTaskAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTodolistTitletAC,
    removeTodolistAC
} from "./reducers/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./store/Store";

export type TodolistType = {
id: string,
    title: string,
    filter: FilterValuesType
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key : string] : Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    // let todolistId1 = v1();
    // let todolistId2 = v1();

    const todolist = useSelector<StoreType,Array<TodolistType>>(state => state.todolist)

  const task = useSelector<StoreType, TasksType>(state => state.task)

    const dispatch = useDispatch()
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
     dispatch(changeStatusTaskAC(id,isDone,todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
     dispatch(changeFilterTodolistAC(value,todolistId))
    }

    function removeTodolist(id: string) {
      dispatch(removeTodolistAC(id))
    }
    const addTodolist = (title : string) => {
        const todolistId = v1()
        dispatch(addTodolistAC(title,todolistId))
        dispatch(addNewTaskListAC(todolistId))
    }
   const changeTaskTitle = (todolistId : string, taskId: string, title : string) => {
dispatch(changeTaskTitleAC(todolistId,taskId,title))
    }

   const changeTodolistTitle = (todolistId : string, title : string) => {
dispatch(changeTodolistTitletAC(todolistId,title))   }

    return (

        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <Grid container style={{padding : "20px"}}>
            <AddItemInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                {
                    todolist.map((t, ) => {
                        let allTodolistTasks = task[t.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (t.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item> <Paper style={{padding : "10px"}}>
                        <Todolist
                            changeTodolistTitle={changeTodolistTitle}
                            changeTaskTitle={changeTaskTitle}
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            removeTodolist={removeTodolist}
                        /> </Paper></Grid>
                    })
                }
            </Grid>

            </Container>
        </div>
    );
}

export default App;
