import React, {useEffect} from 'react';
import api from '../api';
import {useNavigate} from 'react-router-dom';
import '../styles/style01.css';

const Signup = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const requestLogin = async () => {
        try {
            const response = await api.get('/check');
            if (response.status === 200) {
                console.log('@check success : ', response.data);
            } else {
                console.error('@check failed');
            }
        } catch (error) {
            console.error('@check error : ', error);
        }
    };

    useEffect(() => {
        requestLogin(); // 페이지가 로드될 때 API 호출
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 form submit 동작 방지
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
            phoneNumber: event.target.phoneNumber.value,
        };

        if (formData.name === "" || formData.email === "" || formData.password === "" || formData.phoneNumber === "") {
            alert("입력을 확인해주세요.");
            return;
        }

        try {
            const response = await api.post('/auth/signUp', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Account created:', response.data);

            alert(response.data.message);

            if (response.data.result) {
                navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
            }

        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    const goToMain = () => {
        navigate('/'); // 메인 페이지로 이동
        window.location.reload();
    };

    return (
        <div className="div-main">
            <form onSubmit={handleSubmit} className="form-main">
                <div>
                    <div className="div-label">Name</div>
                    <input type="text" placeholder="Name" className="input-text" name="name"/>
                </div>
                <div>
                    <div className="div-label">Zendesk Email</div>
                    <input type="email" placeholder="Zendesk Email" className="input-text" name="email"/>
                </div>
                <div>
                    <div className="div-label">Password</div>
                    <input type="password" placeholder="Password" className="input-text" name="password"/>
                </div>
                <div>
                    <div className="div-label">Confirm Password</div>
                    <input type="password" placeholder="Re-enter Password" className="input-text"
                           name="confirmPassword"/>
                </div>
                <div>
                    <div className="div-label">Phone Number</div>
                    <input type="tel" placeholder="Tel" className="input-text" name="phoneNumber"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-submit">계정 생성</button>
                    <button type="reset" className={"btn btn-sm btn-outline-primary"}>다시 입력</button>
                    <button type="button" onClick={goToMain} className={"btn btn-sm btn-outline-primary"}>메인으로</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
