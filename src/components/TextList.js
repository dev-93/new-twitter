import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TextList = ({ listObj, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(listObj.text);
    const onDelete = async () => {
        const yes = window.confirm("지우시겠습니까?");
        if (yes) {
            await dbService.doc(`information/${listObj.id}`).delete();
            await storageService.refFromURL(listObj.attachmentUrl).delete();
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
        <List>
            {isEditing ? (
                <>
                    <form onSubmit={onSubmit} className="container">
                        <input
                            type="text"
                            placeholder={listObj.text}
                            onChange={onChange}
                            value={newText}
                            className="formInput"
                        />
                        <input type="submit" value="수정하기" className="formBtn" />
                    </form>
                    <button className="cancelBtn" onClick={onToggle}>
                        cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{listObj.text}</h4>
                    {listObj.attachmentUrl && <img src={listObj.attachmentUrl} alt="사진" />}
                    {isOwner && (
                        <div className="actions">
                            <button onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button onClick={onToggle}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </List>
    );
};

const List = styled.div`
    margin-bottom: 20px;
    background-color: white;
    width: 100%;
    max-width: 320px;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.8);

    .container {
        width: 100%;
        max-width: 320px;
        display: flex;
        flex-direction: column;

        .formBtn {
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            padding: 7px 20px;
            text-align: center;
            color: white;
            border-radius: 20px;
            background-color: #04aaff;
            cursor: pointer;
        }
    }

    .cancelBtn {
        cursor: pointer;
        background-color: tomato;
        margin-top: 15px;
        margin-bottom: 5px;
        width: 100%;
        padding: 7px 20px;
        text-align: center;
        color: white;
        border-radius: 20px;
    }

    h4 {
        font-size: 14px;
    }

    img {
        right: -10px;
        top: 20px;
        position: absolute;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-top: 10px;
    }

    .actions {
        position: absolute;
        right: 10px;
        top: 10px;

        button:first-child {
            margin-right: 10px;
        }
    }
`;

export default TextList;
