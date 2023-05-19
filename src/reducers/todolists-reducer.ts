import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLISTS-TITLE"
    title: string
    id: string
}

export type changeTodoListFilterAT = {
    type: "CHANGE-TODOLISTS-FILTER"
    filter: FilterValuesType
    id: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | changeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLISTS-TITLE":
            return  todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLISTS-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }

}