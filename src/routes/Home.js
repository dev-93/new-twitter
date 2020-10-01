import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        dbService.collection("new-twitter").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(newArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("new-twitter").add({
            text,
            createDate: new Date().toLocaleString(),
            creatorId: userObj.uid,
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
