import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

// StrictMode 사용 시
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// StrictMode 제거
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
