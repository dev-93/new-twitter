import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import TextList from "components/TextList";

const Home = ({ userObj }) => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [attachment, setAttachment] = useState();

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

    // const onFileChange = (e) => {
    //     const target: {
    //         {files},
    //     } = e;
    // };

    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;
        const thefile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(thefile);
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
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="submit" />
                <div>
                    {attachment && (
                        <img
                            src={attachment}
                            alt="이미지"
                            width="100px"
                            height="100px"
                        />
                    )}
                </div>
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
