import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const getData = async () => {
        const dbData = await dbService.collection("information").get();
        dbData.forEach((document) => {
            const dataObj = {
                ...document.data(),
                id: document.id,
            };
            setData((prev) => [dataObj, ...prev]);
        });
    };

    useEffect(() => {
        getData();
    }, []);

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
            <div>
                {data.map((list) => (
                    <div key={list.id}>{list.text}</div>
                ))}
            </div>
        </>
    );
};

export default Home;
