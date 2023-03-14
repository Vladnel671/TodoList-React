import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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

    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isUserMessageTooLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageTooLong || error
    const userMaxLengthMessage = isUserMessageTooLong && <div style={{color: "hotpink"}}>Task is too long</div>
    const inputErrorClasses = error || isUserMessageTooLong ? "input-error" : ""


    return (
        <div>
            <input
                onKeyDown={onKeyDownAddItem}
                value={title}
                onChange={changeLocalTitle}
                placeholder="Please, enter title"
                className={inputErrorClasses}
            />
            <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

export default AddItemForm;