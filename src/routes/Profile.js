import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();

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

    return (
        <>
            <button onClick={onLogOut}>Log Out</button>
        </>
    );
};
