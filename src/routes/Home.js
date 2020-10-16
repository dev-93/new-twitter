import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import TextList from "components/TextList";
import NewForm from "components/NewForm";
import styled from "styled-components";

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
        <Wrap>
            <NewForm userObj={userObj} />
            <div className="list_box">
                {data.map((list) => (
                    <TextList
                        key={list.id}
                        listObj={list}
                        isOwner={list.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;

    .list_box {
        margin-top: 30px;
    }
`;

export default Home;
