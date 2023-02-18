import React, {useState} from 'react';
import {v1} from 'uuid';

import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {

    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React & Redux", isDone: false},
    ])
    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks: TaskType[] = [newTask, ...tasks]
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType) => setFilter(filter)

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) : Array<TaskType> => {

        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
