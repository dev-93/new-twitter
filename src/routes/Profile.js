import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOut = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    return (
        <Wrap>
            <form className="profileForm" onSubmit={onSubmit}>
                <input
                    type="text"
                    autoFocus
                    placeholder="name"
                    onChange={onChange}
                    value={newDisplayName}
                    className="formInput"
                />
                <input type="submit" className="formBtn" value="update Profile" />
            </form>
            <button className="logout" onClick={onLogOut}>
                Log Out
            </button>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;

    .profileForm {
        border-bottom: 1px solid rgba(255, 255, 255, 0.9);
        padding-bottom: 30px;
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
            &.formInput {
                width: 100%;
                padding: 10px 20px;
                border-radius: 20px;
                border: 1px solid black;
                text-align: center;
                background-color: white;
                color: black;
            }
            &.formBtn {
                cursor: pointer;
                width: 100%;
                padding: 7px 20px;
                text-align: center;
                color: white;
                border-radius: 20px;
                background-color: #04aaff;
                cursor: pointer;
            }
        }
    }

    .logout {
        margin-top: 50px;
        cursor: pointer;
        background-color: tomato;
        cursor: pointer;
        width: 100%;
        padding: 7px 20px;
        text-align: center;
        color: white;
        border-radius: 20px;
        background-color: #04aaff;
        cursor: pointer;
    }
`;
