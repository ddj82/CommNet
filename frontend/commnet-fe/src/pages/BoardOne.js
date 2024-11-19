import React, { useEffect, useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/board01.css';
import { loginAuth } from "../components/LoginAuth";
import TextareaAutosize from 'react-textarea-autosize';
import Icon from "../components/Icon";
import ReplyOne from "../components/ReplyOne";
import { useModal } from '../components/UseModal';
import * as Utils from '../components/Utils';

function BoardOne() {
    const location = useLocation();
    const { postId } = location.state;
    const [boardOne, setBoardOne] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [author, setAuthor] = useState('');
    const [replyList, setReplyList] = useState([]);
    const [user, setUser] = useState(null);
    const { modalIsOpen, openModal, closeModal } = useModal();

    const fetchReplies = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8082/reply/list',
                { postId },
                { headers: { 'Content-Type': 'application/json' } });
            if (response.status === 200 && response.data.result) {
                console.log("댓글 불러오기 성공:", response.data.data);
                setReplyList(response.data.data);
            }
        } catch (error) {
            console.error('댓글 불러오기 오류:', error);
        }
    }, [postId]); // postId를 의존성으로 추가

// 게시물 데이터 및 댓글 불러오기 함수
    const boardone = useCallback(async () => {
        if (localStorage.getItem('token') != null) {
            setIsLoggedIn(true);
            console.log("로그인");
            try {
                const response = await axios.post('http://localhost:8082/board/one',
                    { postId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                if (response.status === 200 && response.data.result) {
                    setBoardOne(response.data.data);
                    response.data.data.createdAt = Utils.formatDate(response.data.data.createdAt);
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    setUser(storedUser);
                    setAuthor(storedUser.name);
                }
            } catch (error) {
                console.error('error : ', error);
            }
        } else {
            setIsLoggedIn(false);
            console.log("비로그인");
            try {
                const response = await axios.post('http://localhost:8082/board/one',
                    { postId },
                    { headers: { 'Content-Type': 'application/json' } });
                if (response.status === 200 && response.data.result) {
                    setBoardOne(response.data.data);
                    response.data.data.createdAt = Utils.formatDate(response.data.data.createdAt);
                }
            } catch (error) {
                console.error('error : ', error);
            }
        }

        // 댓글 가져오기
        fetchReplies();
    }, [postId, fetchReplies]);



    useEffect(() => {
        boardone();
    }, [boardone]);

    const handleLoginAuth = (url) => {
        loginAuth(url, navigate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            const formData = new FormData();
            formData.append('author', e.target.author.value);
            formData.append('content', e.target.content.value);
            formData.append('replyImg', e.target.replyImg.files[0]);
            formData.append('postId', postId);
            try {
                const response = await axios.post('http://localhost:8082/reply/insert',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } });
                if (response.status === 200 && response.data.result) {
                    console.log("댓글 등록 성공:", response.data.message);
                    alert(response.data.message);
                    fetchReplies(); // 댓글 새로고침
                }
            } catch (error) {
                console.error('댓글 등록 오류:', error);
            }
        } else {
            alert("로그인 후 이용 가능합니다.");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("사진 파일만 업로드 가능합니다.");
            setImagePreview(null);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        document.getElementById('replyImg').value = "";
    };

    const handleFileBtn = () => {
        document.getElementById('replyImg').click();
    };

    return (
        <div className="container">
            <div>
                <div className="board-title">{boardOne.title}</div>
                <div className="hstack gap-2">
                    <div className="p-2">{boardOne.author}</div>
                    <div className="p-2 ms-auto">{boardOne.createdAt}</div>
                </div>
            </div>
            <hr />
            <div className="board-content">{boardOne.content}</div>
            <hr />
            <div className="d-flex justify-content-between">
                <Link to="/board">
                    <button className="btn btn-outline-primary ms-md-2">글목록</button>
                </Link>
                <button className="btn btn-primary me-md-2" onClick={() => handleLoginAuth('/board/insert')}>
                    글쓰기
                </button>
            </div>
            <div className="div-replies mt-5">
                {isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="author" name="author" defaultValue={author} hidden />
                        <label htmlFor="replies" className="form-label">
                            <strong>댓글 {replyList.length}</strong>
                        </label>
                        <TextareaAutosize
                            className="form-control"
                            placeholder="댓글을 입력하세요."
                            id="replies"
                            name="content"
                            maxLength="300"
                            minRows={3}
                        />
                        <div className={`file-img ${imagePreview ? 'file-img-image' : 'file-img-image-X'}`}>
                            {imagePreview && (
                                <>
                                    <img id="f-img" src={imagePreview} alt="미리보기" />
                                    <button type="button" onClick={handleRemoveImage} id="file-imagePreview">
                                        <Icon name="XCircle" color="gray" size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="d-flex justify-content-between">
                            <input
                                type="file"
                                id="replyImg"
                                name="replyImg"
                                accept="image/*"
                                onChange={handleFileChange}
                                hidden
                            />
                            <button className="btn btn-sm" type="button" onClick={handleFileBtn}>
                                <Icon name="Image" size={22} />
                            </button>
                            <button className="btn btn-sm btn-primary" type="submit">등록</button>
                        </div>
                    </form>
                ) : (
                    <form>
                        <label htmlFor="replies-anonymous" className="form-label">
                            <strong>댓글 {replyList.length}</strong>
                        </label>
                        <TextareaAutosize
                            className="form-control"
                            placeholder="로그인 후 댓글을 입력하실 수 있습니다."
                            id="replies-anonymous"
                            maxLength="300"
                            minRows={3}
                            readOnly
                            onClick={handleSubmit}
                        />
                    </form>
                )}
            </div>
            <hr />
            <ReplyOne
                replyList={replyList}
                user={user}
                modalIsOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                onReplyDeleted={fetchReplies}
            />
        </div>
    );
}

export default BoardOne;
