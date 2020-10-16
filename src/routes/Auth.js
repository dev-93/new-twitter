import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Auth = () => {
    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    };
    return (
        <Wrap>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />

            <AuthForm />

            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </Wrap>
    );
};

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .authBtns {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 320px;
        .authBtn {
            cursor: pointer;
            border-radius: 20px;
            border: none;
            padding: 10px 0px;
            font-size: 12px;
            text-align: center;
            width: 150px;
            background: white;
            cursor: pointer;
        }
    }
`;

export default Auth;
