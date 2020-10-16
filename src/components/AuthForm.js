import { authService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
                <input
                    className="authInput"
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    className="authInput"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    className="authInput authSubmit"
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {error && <span className="authError">{error}</span>}
            </Form>
            <Switch className="authSwitch" onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </Switch>
        </>
    );
};

const Form = styled.form`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;

    .authInput {
        max-width: 320px;
        width: 100%;
        padding: 10px;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 1);
        margin-bottom: 10px;
        font-size: 12px;
        color: black;
    }

    .authSubmit {
        text-align: center;
        background: #04aaff;
        color: white;
        margin-top: 10;
        cursor: pointer;
    }

    .authError {
        color: tomato;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
    }
`;

const Switch = styled.span`
    color: #04aaff;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 50px;
    display: block;
    font-size: 12px;
    text-decoration: underline;
`;
export default AuthForm;
