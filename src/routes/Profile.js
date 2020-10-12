import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOut = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                diplayName: newDisplayName,
            });
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="name" onChange={onChange} value={newDisplayName}/>
                <input type="submit"value="update Profile"/>
            </form>
            <button onClick={onLogOut}>Log Out</button>
        </>
    );
};
