import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus : (taskId: string, isDone:boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     addTaskInput.current && props.addTask(addTaskInput.current.value)
    // }

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const maxLengthUserMessage : number = 15
    const isUserMessageTooLong : boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = title.length === 0 || title.length > 15

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownTask = (e:KeyboardEvent<HTMLInputElement>)=>e.key === "Enter" && addTask()
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const handlerCreator = (filter: FilterValuesType):() => void => () : void => props.changeFilterValue(filter)

    const userMaxLengthMessage = isUserMessageTooLong && <div style={{color: "hotpink"}}>Task is too long</div>
    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const inputErrorClasses = error || isUserMessageTooLong ? "input-error": ""

    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
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