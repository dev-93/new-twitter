import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import TextList from "components/TextList";
import NewForm from "components/NewForm";

const Home = ({ userObj }) => {
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

    return (
        <>
            <NewForm userObj={userObj} />
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
