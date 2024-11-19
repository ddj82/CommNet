import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function BoardInsert() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const Name = localStorage.getItem('name');
        // Name이 null, 빈 문자열("") 또는 undefined가 아닌 경우에만 실행
        if (Name) {
            setAuthor(Name); // 작성자 이름 저장
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            title: event.target.title.value,
            content: event.target.content.value,
            author: event.target.author.value,
        };

        if (formData.title === "" || formData.content === "") {
            alert("입력을 확인해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8082/board/insert', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Account created:', response.data);

            alert(response.data.message);
            navigate('/board'); // 등록 성공 시 게시판페이지로 이동

        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <div className="container">
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="author">작성자</label>
                    <input type="text" id="author" name="author" value={author} readOnly/>
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <input type="text" id="content" name="content" />
                    {/*<textarea></textarea>*/}
                </div>
                <div>
                    <button type="reset" className={"btn btn-sm btn-outline-primary"}>다시쓰기</button>
                    <button type="submit" className={"btn btn-sm btn-outline-primary"}>등록하기</button>
                </div>
            </form>
        </div>
    );
}
