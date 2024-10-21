import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Board from "./pages/Board";
import BoardInsert from "./pages/BoardInsert";
import BoardOne from "./pages/BoardOne";

export default function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/board" element={<Board/>}/>
                <Route path="/board/insert" element={<BoardInsert/>}/>
                <Route path="/board/one" element={<BoardOne/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}
