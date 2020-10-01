import React from "react";

const TextList = ({ listObj, isOwner }) => {
    return (
        <div>
            <h4>{listObj.text}</h4>
            {isOwner && (
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    );
};

export default TextList;
