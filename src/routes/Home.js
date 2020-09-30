import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        dbService.collection("information").add({
            age: 28,
            name: "taenam",
            createDate: Date.now(),
        });
        setNweet("");
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
                <input type="submit" value="submit" />
            </form>
        </>
    );
};

export default Home;
