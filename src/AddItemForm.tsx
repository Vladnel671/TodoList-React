import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {IconButton, TextField} from '@mui/material';

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}


const AddItemForm: FC<AddItemFormType> = ({
                                              maxLengthUserMessage,
                                              addNewItem
                                          }) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()

    const userErrorMessage = error && <span style={{color: "hotpink"}}>Title is required!</span>
    const isUserMessageTooLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageTooLong || error
    const userMaxLengthMessage = isUserMessageTooLong && <span style={{color: "hotpink"}}>Task is too long</span>
    const inputErrorClasses = error || isUserMessageTooLong ? "input-error" : ""


    return (
        <div className={"add-form"}>
            <TextField
                size="small"
                onKeyDown={onKeyDownAddItem}
                value={title}
                onChange={changeLocalTitle}
                placeholder="Please, enter title"
                error={!!inputErrorClasses}
                helperText={userErrorMessage || userMaxLengthMessage}
            />
            <IconButton size='small' disabled={isAddBtnDisabled} onClick={addTask}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;