import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOut = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyInfo = async () => {
        const info = await dbService
            .collection("information")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createDate")
            .get();
        console.log(info.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyInfo();
    }, []);

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
                <input type="submit"value="updateProfile"/>
            </form>
            <button onClick={onLogOut}>Log Out</button>
        </>
    );
};
