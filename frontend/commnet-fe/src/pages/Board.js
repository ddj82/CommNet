import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Board() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [boardList, setBoardList] = useState('');

    const boardListAll = async () => {
        try {
            const response = await axios.post('http://localhost:8080/board');
            if (response.status === 200) {
                // console.log('@board success : ', response.data);
                if (response.data.result) {
                    // 게시글 데이터를 상태에 저장
                    setBoardList(response.data.data);
                } else {
                    console.log("message : ", response.data.message);
                }
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('error : ', error);
        }
    };

    useEffect(() => {
        boardListAll(); // 페이지가 로드될 때 API 호출
    }, []);

    const loginAuth = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/check', {
                token: localStorage.getItem('token') // 기존 토큰을 보냄
            });
            if (response.status === 200) {
                console.log('success : ', response.data);
                if (response.data.result) {
                    localStorage.setItem('name', response.data.data.name);
                    navigate('/board/insert');
                } else {
                    alert(response.data.message)
                }
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('error : ', error);
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // 날짜 부분만 반환 (YYYY-MM-DD)
    };

    return (
        <div>
            <h1>게시판</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {/* boardList를 map으로 순회하여 테이블에 데이터 출력 */}
                {boardList.length > 0 ? (
                    boardList.map((board, index) => (
                        <tr key={index}>
                            <td>{board.postId}</td>{/* 게시글 번호 */}
                            <td>{board.title}</td>{/* 게시글 제목 */}
                            <td>{board.author}</td>{/* 게시글 작성자 */}
                            {/*<td>{board.createdAt}</td>*/}
                            <td>{formatDate(board.createdAt)}</td>{/* 작성일을 포맷팅 */}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">게시글이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className={"btn btn-sm btn-outline-primary"} onClick={loginAuth}>글쓰기</button>
        </div>
    );
}