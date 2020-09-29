import { authService } from "fbase";
import React from "react";

export default () => {
    const onLogOut = () => authService.signOut();

    return (
        <>
            <button onClick={onLogOut}>Log Out</button>
        </>
    );
};
