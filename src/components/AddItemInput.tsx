import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemInputPropsType = {
    callBack : (title: string) => void
}
const AddItemInput = (props: AddItemInputPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(title)
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
           addTask()
        }
    }
    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                defaultValue="Default Value"
                size="small"

            />
            <Button variant="contained" onClick={addTask} size="medium">+</Button>
            {error && <div style={{color : "red"}} className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemInput;