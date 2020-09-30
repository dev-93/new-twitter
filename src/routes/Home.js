import React, { useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={nweet}
                />
                <input type="submit" value="new-twitter" />
            </form>
        </>
    );
};

export default Home;
