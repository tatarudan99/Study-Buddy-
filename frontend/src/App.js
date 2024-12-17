// src/App.js

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import './styles/App.css';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Questionnaire from "./components/questionnaire/Questionnaire";
import StudySession from "./components/study-session/StudySession";
import About from "./components/about/About";
import Terms from "./components/terms/Terms";
import Privacy from "./components/privacy/Privacy";
import NotFound from "./components/not-found/NotFound";
import Footer from "./components/footer/Footer";

function App() {
    return (
            <Router>
                <div className="app-container">
                    <Navbar/>
                    <main className="container">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/questionnaire" element={<Questionnaire/>}/>
                            <Route path="/study" element={<StudySession/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/terms" element={<Terms/>}/>
                            <Route path="/privacy" element={<Privacy/>}/>
                            <Route path="*" element={<NotFound/>}/>

                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
    );
}

export default App;
