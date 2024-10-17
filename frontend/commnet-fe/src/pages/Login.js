import React from 'react';
import '../styles/style01.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 form submit 동작 방지
        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        if (formData.email === "" || formData.password === "") {
            alert("입력을 확인해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Account created:', response.data);

            alert(response.data.message);

            if (response.data.result) {
                // JWT 토큰과 만료 시간을 localStorage에 저장
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user)); // 유저 정보도 저장
                localStorage.setItem('tokenExprTime', response.data.data.exprTime); // 토큰 만료 시간 저장 (초 단위)

                // 메인 페이지로 이동
                navigate('/');
            }


        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <div className="div-main">
            <form onSubmit={handleSubmit} className="form-main">
                <div>
                    <div className="div-label">Email</div>
                    <input type="text" className="input-text" name="email"/>
                </div>
                <div>
                    <div className="div-label">Password</div>
                    <input type="password" className="input-text" name="password"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-submit">로그인</button>
                </div>
            </form>
        </div>
    );
}
