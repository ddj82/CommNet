import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../api';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [remainingTime, setRemainingTime] = useState(null); // 남은 유효시간
    const navigate = useNavigate(); // 로그아웃 시 페이지 이동을 위한 navigate

    // 페이지 로드 시 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem('token');
        const exprTime = localStorage.getItem('tokenExprTime'); // 저장된 만료 시간
        const issuedAt = token ? JSON.parse(atob(token.split('.')[1])).iat : null; // 토큰 발급 시간

        if (token && issuedAt) {
            const calculateRemainingTime = () => {
                const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로
                const tokenExpireAt = issuedAt + parseInt(exprTime, 10); // 토큰 만료 시간 계산
                const timeLeft = tokenExpireAt - currentTime; // 남은 시간 계산

                if (timeLeft > 0) {
                    setRemainingTime(timeLeft); // 남은 시간 업데이트
                    setIsLoggedIn(true);
                } else {
                    // 시간이 만료되면 로그아웃 처리
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('tokenExprTime');
                    setIsLoggedIn(false);
                    alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
                    navigate('/login');
                    window.location.reload();
                }
            };

            calculateRemainingTime(); // 초기 계산
            const interval = setInterval(calculateRemainingTime, 1000); // 1초마다 남은 시간을 계산

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
        }
    }, [navigate]);

    // 만료 시간 연장 (토큰 재발급) + 유저 정보 업데이트
    const extendSession = async () => {
        try {
            const response = await api.post('/auth/extendSession', {
                token: localStorage.getItem('token') // 기존 토큰을 보냄
            });

            if (response.data.result) {
                // 새로운 토큰과 만료 시간 설정
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('tokenExprTime', response.data.data.exprTime);

                // 만약 유저 정보를 포함한다면 업데이트
                if (response.data.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                }
                alert("세션이 연장되었습니다.");
                window.location.reload();
            } else {
                alert("세션 연장에 실패하였습니다. 다시 로그인 해주세요.");
                logout(); // 실패 시 로그아웃 처리
            }
        } catch (error) {
            console.error('세션 연장 중 에러 발생:', error);
            alert("세션 연장 중 에러가 발생했습니다.");
        }
    };


    // 로그아웃 버튼 클릭 시 로그아웃 처리
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExprTime');
        setIsLoggedIn(false);
        navigate('/'); // 로그아웃 후 메인 페이지로 이동
        window.location.reload();
    };

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">홈</Link></li>
                    <li><Link to="/Board" className="nav-link px-2">게시판</Link></li>
                    {/*<li><Link to="/pricing" className="nav-link px-2">Pricing</Link></li>*/}
                    {/*<li><Link to="/faqs" className="nav-link px-2">FAQs</Link></li>*/}
                    {/*<li><Link to="/about" className="nav-link px-2">About</Link></li>*/}
                </ul>

                {!isLoggedIn ? (
                    <div className="col-md-3 text-end">
                        <Link to="/signup">
                            <button className="btn btn-primary me-2">회원가입</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn-outline-primary">로그인</button>
                        </Link>
                    </div>
                ) : (
                    <div className="col-md-4 text-end">
                        <Link to="/">
                            <button className="btn btn-primary me-2">내 정보</button>
                        </Link>
                        <button onClick={logout} className="btn btn-outline-danger">로그아웃</button>
                    </div>
                )}
                {/* 남은 시간이 5분 이하일 때 경고 표시 */}
                {remainingTime !== null && remainingTime <= 3600 && (
                    <div style={{marginTop: '10px'}} className="col-md-12 text-end">
                        <small className="me-2">자동 로그아웃 {remainingTime}초 남았습니다.</small>
                        <button onClick={extendSession} className="btn btn-sm btn">초기화</button>
                    </div>
                )}

            </header>
        </div>
    );
};

export default Header;
