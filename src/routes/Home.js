import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import TextList from "components/TextList";
import { v4 as uuidv4 } from "uuid";
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
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const information = {
            text,
            createDate: new Date().toLocaleString(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("information").add(information);
        setText("");
        setAttachment("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setText(value);
    };

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

    const onClearAttachment = () => {
        setAttachment(null);
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
                {attachment && (
                    <div>
                        <img
                            src={attachment}
                            alt="이미지"
                            width="100px"
                            height="100px"
                        />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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
