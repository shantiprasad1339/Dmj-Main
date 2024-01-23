import React from 'react';
import './leftcategory.css'
import { Link } from 'react-router-dom';


function LeftCategory() {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {/* -- End Dashboard Nav -- */}

                    {/* <li className="nav-item">
                        <Link className="nav-link collapsed" to="/variation">
                            <i className="bi bi-diagram-3"></i>
                            <span>Variation</span>
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms1-nav" data-bs-toggle="collapse" to="#">
                            <i className="bi bi-pencil-square"></i><span>Add Variations</span><i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="forms1-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            {/* <li>
                                <Link to="/editmaincategory">
                                    <i className="bi bi-stack"></i><span>Main Category</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/addvariantimages">
                                    <i className="bi bi-layers"></i><span>Add Images</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addvariantprice">
                                    <i className="bi bi-palette-fill"></i><span>Add Variant</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/editsize">
                                    <i className="bi bi-123"></i><span>Size</span>
                                </Link>
                            </li> */}
                            <li>
                                {/* <Link to="/editbanner">
                                    <i className="bi bi-images"></i><span>Banner</span>
                                </Link> */}
                            </li>
                            {/* <li>
                                <Link to="/editprice">
                                    <i className="bi bi-tags-fill"></i><span>Price</span>
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link to="/editreview">
                                    <i className="bi bi-yelp"></i><span>Review</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/editrating">
                                    <i className="bi bi-stars"></i><span>Rating</span>
                                </Link>
                            </li> */}
                        </ul>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/productlist">
                            <i className="bi bi-card-list"></i>
                            <span>My Product List</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/orderlist">
                            <i className="bi bi-card-list"></i>
                            <span>My Order List</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-plus-square"></i><span>Master</span><i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/addmaincategory">
                                    <i className="bi bi-stack"></i><span>Main Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addsubcategory">
                                    <i className="bi bi-layers"></i><span>Sub Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addcolor">
                                    <i className="bi bi-palette-fill"></i><span>Color</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addsize">
                                    <i className="bi bi-123"></i><span>Size</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addbanner">
                                    <i className="bi bi-images"></i><span>Banner</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addmaterial">
                                    <i className="bi bi-images"></i><span>Material</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addblog">
                                    <i className="bi bi-file-text"></i><span>Blog</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/addprice">
                                    <i className="bi bi-tags-fill"></i><span>Price</span>
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link to="/addreview">
                                    <i className="bi bi-yelp"></i><span>Review</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/addrating">
                                    <i className="bi bi-stars"></i><span>Rating</span>
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    {/* -- End Components Nav -- */}

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" to="#">
                            <i className="bi bi-pencil-square"></i><span>Edit</span><i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">

                            <li>
                                <Link to="/editbanner">
                                    <i className="bi bi-images"></i><span>Banner</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/variant">
                                    <i className="bi bi-palette-fill"></i><span>Product Variant</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/editmaincategory">
                                    <i className="bi bi-palette-fill"></i><span>Main Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/editsubcategory">
                                    <i className="bi bi-palette-fill"></i><span>Sub Category</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        {/* <Link className="nav-link collapsed" data-bs-target="#forms-shipping" data-bs-toggle="collapse" to="#">
                            <i className="bi bi-truck"></i><span>Order Shipping</span><i className="bi bi-chevron-down ms-auto"></i>
                        </Link> */}
                        <ul id="forms-shipping" className="nav-content collapse " data-bs-parent="#sidebar-nav">

                            <li>
                                <Link to="/create-order">
                                    <i className="bi bi-cart-plus"></i><span>Create Order</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/variant">
                                    <i className="bi bi-palette-fill"></i><span>Product Variant</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/editmaincategory">
                                    <i className="bi bi-palette-fill"></i><span>Main Category</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/editsubcategory">
                                    <i className="bi bi-palette-fill"></i><span>Sub Category</span>
                                </Link>
                            </li> */}
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/userprofile">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>


                    {/* <li className="nav-item">
                        <Link className="nav-link collapsed" to="/faq">
                            <i className="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/contact">
                            <i className="bi bi-envelope"></i>
                            <span>Contact</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/signup">
                            <i className="bi bi-card-list"></i>
                            <span>Register</span>
                        </Link>
                    </li> */}

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/login">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>

            </aside>
            {/* -- End Sidebar-- */}

        </>
    );
}

export default LeftCategory;