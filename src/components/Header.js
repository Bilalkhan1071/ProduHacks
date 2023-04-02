import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../assets/MemoriCare.png';

function Header() {
    return (
        <>
            <div className="top-header">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header">
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
        </>
    );
}

export default Header;
