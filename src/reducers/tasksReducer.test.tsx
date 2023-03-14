import React from "react";
import {v1} from "uuid";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, tasksReducer} from "./tasksReducer";

test("correct task shoulb be removed", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();
    let taskId4 = v1();
  const startState =   {
        [todolistId1]: [
        {id: taskId1, title: "HTML&CSS", isDone: true},
        {id: taskId2, title: "JS", isDone: true}
    ],
        [todolistId2]: [
        {id: taskId3, title: "Milk", isDone: true},
        {id: taskId4, title: "React Book", isDone: true}
    ]
    }

    const endState = tasksReducer(startState, removeTaskAC(taskId2,todolistId1))

    expect(endState[todolistId1].length).toBe(1)
    expect(startState).not.toBe(endState)
})

test("task should be add in correct todolist", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();
    let taskId4 = v1();
    const startState =   {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    }

    const endState = tasksReducer(startState, addTaskAC("Snuis",todolistId2))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe("Snuis")
})

test("choose task should be change status", ()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();
    let taskId4 = v1();
    const startState =   {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS", isDone: true},
            {id: taskId2, title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: taskId3, title: "Milk", isDone: true},
            {id: taskId4, title: "React Book", isDone: true}
        ]
    }

    const endState = tasksReducer(startState, changeStatusTaskAC(taskId3, false, todolistId2))

    expect(endState[todolistId2][0].isDone).toBe(false)
    expect(startState[todolistId2][0].isDone).not.toBe(endState[todolistId2][0].isDone)
})