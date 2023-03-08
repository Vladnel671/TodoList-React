import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const maxLengthUserMessage: number = 15
    const isUserMessageTooLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = title.length === 0 || title.length > 15

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeTodoList = () =>props.removeTodoList(props.todoListId)

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    const userMaxLengthMessage = isUserMessageTooLong && <div style={{color: "hotpink"}}>Task is too long</div>
    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const inputErrorClasses = error || isUserMessageTooLong ? "input-error" : ""

    return (
        <div className={"todolist"}>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    onKeyDown={onKeyDownTask}
                    value={title}
                    onChange={changeLocalTitle}
                    placeholder="Please, enter title"
                    className={inputErrorClasses}
                />
                <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
                {userMaxLengthMessage}
                {userErrorMessage}
            </div>
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />

            <div className="filter-btn-container">
                <button
                    className={props.filter === "all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All
                </button>
                <button
                    onClick={handlerCreator("active")}
                    className={props.filter === "active" ? "active-filter-btn" : "filter-btn"}
                >Active
                </button>
                <button
                    onClick={handlerCreator("completed")}
                    className={props.filter === "completed" ? "active-filter-btn" : "filter-btn"}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;