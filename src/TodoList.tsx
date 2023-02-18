import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
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
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }
        setTitle("")
    }

    const onKeyDownTask = (e:KeyboardEvent<HTMLInputElement>)=>e.key === "Enter" && addTask()


    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const setAllFilterValue = () => props.changeFilterValue("all")
    const setActiveFilterValue = () => props.changeFilterValue("active")
    const setCompletedFilterValue = () => props.changeFilterValue("completed")
    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={addTaskInput}/>*/}
                {/*<button onClick={addTask}>+</button>*/}
                <input onKeyDown={onKeyDownTask} value={title} onChange={changeLocalTitle}/>
                <button disabled={title.length === 0} onClick={addTask}>+
                </button>
                {title.length > 15 && <div style={{color: "hotpink"}}>Task is too long</div>}
            </div>
            <TasksList tasks={props.tasks} removeTask={props.removeTask}/>

            <div>
                <button
                    onClick={setAllFilterValue}
                >All
                </button>
                <button
                    onClick={setActiveFilterValue}
                >Active
                </button>
                <button
                    onClick={setCompletedFilterValue}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;