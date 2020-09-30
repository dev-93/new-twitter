import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [text, setText] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("information").add({
            text,
            age: 28,
            name: "taenam",
            createDate: new Date().toLocaleString(),
        });
        setText("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setText(value);
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={text}
                />
                <input type="submit" value="submit" />
            </form>
        </>
    );
};

export default Home;
