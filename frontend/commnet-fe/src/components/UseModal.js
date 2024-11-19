import { useState } from 'react';

// UseModal.js: 모달 상태 관리를 위한 커스텀 훅
export const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return {
        modalIsOpen,
        openModal,
        closeModal,
    };
};
