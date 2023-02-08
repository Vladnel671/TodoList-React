import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React & Redux", isDone: false},
    ])
    const removeTask = (taskId: number) => setTasks(tasks.filter(t => t.id !== taskId))

    const [filter, setFilter] = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType) => setFilter(filter)

    let filteredTasks: Array<TaskType> = []

    if (filter === "all") {
        filteredTasks = tasks
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
