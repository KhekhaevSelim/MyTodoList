import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./../App";
import AddItemInput from "./AddItemInput";
import SuperEditableSpan from "./SuperEditableSpan"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle : (todolistId : string, taskId: string, title : string) => void
    changeTodolistTitle : (todolistId : string, title : string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskCallBack = (title : string) => {
        props.addTask(title, props.id)
    }

    const changeTaskTitle = (taskId : string, title : string) => {
    props.changeTaskTitle(props.id, taskId, title )
    }
    const changeTodolistTitle = (title : string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return <div>
        <h3> <SuperEditableSpan callBack={(title)=>changeTodolistTitle(title)} title={props.title}/>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <div>
            <AddItemInput callBack={addTaskCallBack}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox defaultChecked onChange={onChangeHandler} checked={t.isDone}/>
                        <SuperEditableSpan callBack={(title)=>changeTaskTitle(t.id,title)} title={t.title}/>
                        <IconButton onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "outlined"} color="success" onClick={onAllClickHandler}>all</Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} color="secondary" onClick={onActiveClickHandler}>active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} color="error" onClick={onCompletedClickHandler}>completed</Button>
        </div>
    </div>
}


