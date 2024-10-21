import React, {useEffect, useCallback, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import '../styles/board01.css';

function BoardOne() {
    const location = useLocation();
    const {postId} = location.state; // navigate로 전달된 postId를 받아옴
    const [boardOne, setBoardOne] = useState('');

    // useCallback을 사용하여 boardone 함수를 메모이제이션
    const boardone = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8080/board/one',
                {postId}, // postId를 객체로 감싸서 보냄
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (response.status === 200) {
                if (response.data.result) {
                    setBoardOne(response.data.data);
                    console.log("Seccess : ", response.data.data);
                    response.data.data.createdAt = formatDate(response.data.data.createdAt);
                } else {
                    console.log("message : ", response.data.message);
                }
            } else {
                console.error('failed');
            }

        } catch (error) {
            console.error('error : ', error);
        }
    }, [postId]); // postId가 변경될 때만 함수를 새로 생성

    // 컴포넌트가 처음 마운트될 때만 실행
    useEffect(() => {
        boardone();
    }, [boardone]); // boardone을 의존성 배열에 추가

    // 날짜 포맷팅 함수
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().replace('T', ' ').substring(0, 19);
    };

    return (
        <div className="container">
            <div>
                <div className={"board-title"}>{boardOne.title}</div>
                <div className="hstack gap-2">
                    <div className="p-2">{boardOne.author}</div>
                    <div className="p-2 ms-auto">{boardOne.createdAt}</div>
                </div>
            </div>
            <hr/>
            <div className={"board-content"}>
                {boardOne.content}
            </div>
        </div>
    );
}

export default BoardOne;
