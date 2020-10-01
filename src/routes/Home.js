import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import TextList from "components/TextList";

const Home = ({ userObj }) => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        dbService.collection("information").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(newArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("information").add({
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
                    <TextList
                        key={list.id}
                        listObj={list}
                        isOwner={list.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
