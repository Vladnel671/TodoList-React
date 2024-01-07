import React, {FC} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props): JSX.Element => {

    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div className={"todolist"}>
            <Typography
                variant='h5'
                align="center"
                fontWeight="bold"
            ><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <HighlightOffIcon/>
                </IconButton>
            </Typography>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
            <TasksList
                changeTaskTitle={props.changeTaskTitle}
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />

            <div className="filter-btn-container">
                <Button variant="contained"
                        size="small"
                        disableElevation
                        onClick={handlerCreator("all")}
                        color={props.filter === "all" ? "secondary" : "primary"}
                >All
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={handlerCreator("active")}
                    color={props.filter === "active" ? "secondary" : "primary"}
                >Active
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={handlerCreator("completed")}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;