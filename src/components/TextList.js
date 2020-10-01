import { dbService } from "fbase";
import React from "react";

const TextList = ({ listObj, isOwner }) => {
    const onDelete = async () => {
        const yes = window.confirm("지우시겠습니까?");
        if (yes) {
            await dbService.doc(`new-twitter/${listObj.id}`).delete();
        }
    };
    return (
        <div>
            <h4>{listObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDelete}>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    );
};

export default TextList;
