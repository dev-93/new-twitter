import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Nav = ({ userObj }) => {
    return (
        <Navigation>
            <ul>
                <li>
                    <Link className="home" to="/">
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                <li>
                    <Link className="profile" to="/profile">
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span>
                            {userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"}
                        </span>
                    </Link>
                </li>
            </ul>
        </Navigation>
    );
};

const Navigation = styled.nav`
    ul {
        display: flex;
        justify-content: center;
        margin-top: 50px;

        li {
            .home {
                margin-top: 10px;
            }

            .profile {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 12px;

                span {
                    margin-top: 10px;
                }
            }
        }
    }
`;

export default Nav;
