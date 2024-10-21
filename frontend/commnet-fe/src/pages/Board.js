import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/board01.css';

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

    const boardOne = (postId) => {
        navigate('/board/one', {state: {postId}});
    };

    return (
        <div className="container">
            {/* boardList를 map으로 순회하여 테이블에 데이터 출력 */}
            {boardList.length > 0 ? (
                boardList.map((board, index) => (
                    <div key={index} className="card" style={{maxWidth: '100%', margin: '10px 0'}}>
                        <div className="card-body">
                            <div className="hstack gap-3">
                                <div className="vstack" style={{maxWidth: '80%'}}>
                                    <div className="p-2 fs-4">
                                        <span className="my-hover" onClick={() => boardOne(board.postId)}>{board.title}</span>
                                    </div>
                                    <div className="p-2 text-secondary text-truncate">
                                        <span className="my-hover" onClick={() => boardOne(board.postId)}>{board.content}</span>
                                    </div>
                                    <div className="hstack">
                                        <div className="p-2">{board.author}</div>
                                        <div className="p-2 text-secondary"><small>{formatDate(board.createdAt)}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="vr"></div>
                                <div style={{maxWidth: '20%'}}>
                                    <div className="vstack">
                                        <div className="p-2">조회수</div>
                                        <div className="p-2">댓글수</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <div colSpan="4">게시글이 없습니다.</div>
                </div>
            )}
            <div className="d-grid d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2" onClick={loginAuth}>글쓰기</button>
            </div>
        </div>
    );
}