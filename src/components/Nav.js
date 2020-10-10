import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
