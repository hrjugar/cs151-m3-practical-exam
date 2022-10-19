import React from "react";
import { NavLink } from "react-router-dom";
import ProcessingPage from "./ProcessingPage";

function HomePage() {
    return (
        <div className="page home">
            <header>
                <h1>Device Handler Seek Strategies</h1>
                <p>An app by Hernan Rey Jugar and Matthew Ira Senon for CS152 Module 3 Practical Exam</p>
            </header>

            <div className="disc-bg"></div>
            <div className="disc-line disc-line--1"></div>
            <div className="disc-line disc-line--2"></div>
            <div className="disc-line disc-line--3"></div>
            <div className="disc-line disc-line--4"></div>
            <div className="disc-line disc-line--5"></div>
            <div className="disc-line disc-line--6"></div>
            <div className="disc-line disc-line--7"></div>
            <div className="disc-line disc-line--8"></div>
            <div className="disc-line disc-line--9"></div>
            <div className="disc-highlight"></div>
            <div className="disc-outline"></div>
            <NavLink className="start" to="/processing">
                START
            </NavLink>
        </div>
    );
}

export default HomePage;