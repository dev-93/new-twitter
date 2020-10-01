import { dbService } from "fbase";
import React, { useState } from "react";

const TextList = ({ listObj, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(listObj.text);
    const onDelete = async () => {
        const yes = window.confirm("지우시겠습니까?");
        if (yes) {
            await dbService.doc(`information/${listObj.id}`).delete();
        }
    };
    const onToggle = () => {
        setIsEditing((prev) => !prev);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`information/${listObj.id}`).update({
            text: newText,
        });
        setIsEditing(false);
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewText(value);
    };
    return (
        <div>
            {isEditing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder={listObj.text}
                            onChange={onChange}
                            value={newText}
                        />
                        <input type="submit" value="Update text" />
                    </form>
                    <button onClick={onToggle}>cancel</button>
                </>
            ) : (
                <>
                    <h4>{listObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDelete}>Delete</button>
                            <button onClick={onToggle}>Edit</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default TextList;
