import React, {ChangeEvent, useState} from 'react';


type SuperEditableSpanPropsType = {
    title : string
    callBack : (title : string) => void
}
const SuperEditableSpan = (props: SuperEditableSpanPropsType) => {
    let [edit, setEdit] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)
    const editModeOn = () => {
        setEdit(true)
    }

    const editModeOff = () => {
        setEdit(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        props.callBack(title)
    }
    return (
        edit ?
            <input onBlur={editModeOff} autoFocus value={title} onChange={onChangeHandler}/>
            :
            <span onDoubleClick={editModeOn}>{title}</span>
    );
};

export default SuperEditableSpan;