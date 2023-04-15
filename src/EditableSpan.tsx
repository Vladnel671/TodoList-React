import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    spanClasses?: string
    inputClasses?: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        changeTitle,
        spanClasses
    }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setTitle] = useState<string>(title)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }


    return (
        editMode
            ? <TextField
                size='small'
                variant="standard"
                value={localTitle}
                onChange={changeLocalTitle}
                autoFocus={true}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode} className={spanClasses}>{title}</span>
    );
};

export default EditableSpan;