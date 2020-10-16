import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import styled from "styled-components";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Nav from "./Nav";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Nav userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <Wrap>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </Wrap>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

const Wrap = styled.div`
    max-width: 890;
    width: 100%;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    justify-content: center;
`;

export default AppRouter;
