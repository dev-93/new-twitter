import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const NewForm = ({ userObj }) => {
    const [attachment, setAttachment] = useState("");
    const [text, setText] = useState("");

    const onSubmit = async (e) => {
        if (text === "") {
            return;
        }

        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const information = {
            text,
            createDate: new Date().toLocaleString(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("information").add(information);
        setText("");
        setAttachment("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setText(value);
    };

    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;
        const thefile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(thefile);
    };

    const onClearAttachment = () => {
        setAttachment(null);
    };
    return (
        <Form onSubmit={onSubmit}>
            <div className="container">
                <input
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={text}
                    className="text"
                />
                <input type="submit" value="&rarr;" className="arrow" />
            </div>

            <label for="attach-file">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />

            {attachment && (
                <div className="attachment">
                    <img
                        src={attachment}
                        alt="이미지"
                        width="100px"
                        height="100px"
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <button className="clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        margin-bottom: 20px;
        width: 100%;

        input {
            height: 40px;
            padding: 0px 20px;
            color: white;
            border: 1px solid #04aaff;
            border-radius: 20px;
            font-weight: 500;
            font-size: 12px;

            &.text {
                width: 200px;
                margin-right: 20px;
            }
        }

        .arrow {
            background-color: #04aaff;
            height: 40px;
            width: 40px;
            padding: 10px 0px;
            text-align: center;
            border-radius: 20px;
            color: white;
        }
    }

    label {
        color: #04aaff;
        cursor: pointer;

        > span {
            margin-right: 10px;
            font-size: 12px;
        }
    }

    .attachment {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
            height: 80px;
            width: 80px;
            border-radius: 40px;
        }

        .clear {
            color: #04aaff;
            cursor: pointer;
            text-align: center;

            span {
                margin-right: 10px;
                font-size: 12px;
            }
        }
    }
`;

export default NewForm;
