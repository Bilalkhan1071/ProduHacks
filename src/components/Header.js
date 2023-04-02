import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../assets/MemoriCare.png';
import profileImg from '../assets/profile.jpg'; // Import your profile image here

function Header() {
    return (
        <>
            <div className="top-header">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header">
                <div className="nav-links">
                    <NavLink to="/" className="nav-link" activeClassName="nav-link-active">
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/patients"
                        className="nav-link"
                        activeClassName="nav-link-active"
                    >
                        Patients
                    </NavLink>
                    <NavLink
                        to="/help-log"
                        className="nav-link"
                        activeClassName="nav-link-active"
                    >
                        Help Log
                    </NavLink>
                </div>
                <div className="profile-container">
                    <img src={profileImg} alt="Profile" className="profile-image" />
                    <span className="profile-text">Profile</span>
                </div>
            </div>
        </>
    );
}

export default Header;
