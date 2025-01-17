import api from '../api';

export const loginAuth = async (redirectUrl, navigate) => {
    try {
        const response = await api.post('/auth/check', {
            token: localStorage.getItem('token'), // 기존 토큰을 보냄
        });
        if (response.status === 200) {
            console.log('success : ', response.data);
            if (response.data.result) {
                localStorage.setItem('name', response.data.data.name);
                navigate(redirectUrl); // 전달받은 navigate 사용
            } else {
                alert(response.data.message);
            }
        } else {
            console.error('failed');
        }
    } catch (error) {
        console.error('error : ', error);
    }
};