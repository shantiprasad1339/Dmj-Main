import React, { useEffect } from 'react';
import './header1.css';
import { Link } from 'react-router-dom';
import logo from './Images/loaderImg.png';
import profile from './Images/man-icon.png'
import '../../Js/main.js'
import axios from 'axios';

const url2 = 'https://squid-app-2-7wbvi.ondigitalocean.app/download-zip';

function Header1() {




    return (
        <>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center">
                        <img src={logo} alt="dmjlogo" />

                        {/* <span className="d-none d-lg-block ms-3">Admin</span> */}
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn ms-4"></i>
                </div>

                {/* -- End Logo -- */}

                <div className="search-bar">
                    <form className="search-form d-flex align-items-center" method="POST">
                        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item me-4">
                            {/* <a href={url2} download='images' className="btnadd btn btn-primary">
                                Download Backup
                            </a> */}
                            {/* <button type="button"  ><i className="bi bi-plus-circle-dotted me-1 fs-6"></i> </button> */}

                        </li>
                        <li className="nav-item me-4">
                            <Link to="/addproduct">
                                <button type="button" className="btnadd btn btn-primary"><i className="bi bi-plus-circle-dotted me-1 fs-6"></i> Add Product</button>
                            </Link>
                        </li>

                        <li className="nav-item d-block d-lg-none">
                            <Link className="nav-link nav-icon search-bar-toggle " to="/">
                                <i className="bi bi-search"></i>
                            </Link>
                        </li>
                        {/* -- End Search Icon-- */}

                        <li className="nav-item dropdown pe-3">

                            <Link className="nav-link nav-profile d-flex align-items-center pe-0" Link="#" data-bs-toggle="dropdown">
                                <img src={profile} alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                            </Link>


                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>Admin</h6>
                                    <span>Web Designer</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/userprofile">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                {/* <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/userprofile">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/faq">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </Link>
                                </li> */}
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li onClick={() => {
                                    localStorage.clear()
                                    window.location.reload()
                                }}>
                                    <Link className="dropdown-item d-flex align-items-center" to="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </Link>
                                </li>

                            </ul>
                            {/* -- End Profile Dropdown Items -- */}
                        </li>
                        {/* -- End Profile Nav -- */}

                    </ul>
                </nav>
                {/* -- End Icons Navigation -- */}

            </header>
            {/* -- End Header -- */}
        </>
    );
}

export default Header1;