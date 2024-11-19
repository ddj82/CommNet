// 날짜 포맷팅 함수1 (YYYY-MM-DD HH:MM:SS)
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 9); // UTC 시간을 KST로 변환
    return date.toISOString().replace('T', ' ').substring(0, 19);
};

// 날짜 포맷팅 함수2(YYYY-MM-DD)
export const formatDate2 = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 9); // UTC 시간을 KST로 변환
    return date.toISOString().split('T')[0];
};