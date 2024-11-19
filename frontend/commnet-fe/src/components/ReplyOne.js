import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as Utils from './Utils';
import axios from 'axios';

function ReplyOne({ replyList, user, modalIsOpen, openModal, closeModal, onReplyDeleted }) {
    const replyDelete = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8082/reply/delete",
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('삭제 완료:', response.data);
            alert(response.data.message);
            if (onReplyDeleted) {
                onReplyDeleted(); // 부모 컴포넌트에서 상태를 업데이트하는 콜백 함수 호출
            }
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
        }
    };

    return (
        <div className="mt-3 div-replies">
            {replyList.length > 0 ? (
                replyList.map((reply, index) => (
                    <div key={index}>
                        <div className="my-3 d-flex justify-content-between">
                            {reply.author}
                            <small>{Utils.formatDate(reply.createdAt)}</small>
                        </div>
                        <div className="mb-2">
                            {reply.content}
                        </div>
                        <div>
                            {reply.replyImg && (
                                <img src={`http://localhost:8082/usr${reply.replyImg}`} alt="Reply"
                                     style={{ width: '100px', height: 'auto' }} />
                            )}
                        </div>
                        {user && user.name === reply.author && (
                            <div className="mt-2 d-flex justify-content-end">
                                <button className="btn btn-sm btn-outline-danger" type="button" onClick={openModal}>삭제</button>
                            </div>
                        )}
                        <Modal show={modalIsOpen} onHide={closeModal} centered>
                            <Modal.Header closeButton>
                                <strong>댓글을 삭제하시겠습니까?</strong>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button size="sm" variant="secondary" onClick={closeModal}>아니오</Button>
                                <Button size="sm" variant="danger" onClick={replyDelete}>예</Button>
                            </Modal.Footer>
                        </Modal>
                        <hr />
                    </div>
                ))
            ) : (
                <div>
                    <div>첫 댓글을 남겨주세요.</div>
                </div>
            )}
        </div>
    );
}

export default ReplyOne;
