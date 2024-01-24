import React, { useState } from "react";
import { Link } from "react-router-dom";
import './signup.css'

function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSignup(e){
        e.preventDefault();
        console.log(name, email, username, password)
    }

    return (
        <>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center">
                                        <Link to="/signup" className="dmjlogo d-flex align-items-center w-auto">
                                            <img src="/src/Dashboard/Header/Images/loaderImg.png" alt="" />
                                            {/* <span className="d-none d-lg-block">Admin</span> */}
                                        </Link>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                                <p className="text-center small">Enter your personal details to create account</p>
                                            </div>

                                            <form onSubmit={(e)=>{handleSignup(e)}} className="row g-3 needs-validation">
                                                <div className="col-12">
                                                    <label htmlFor="yourName" className="form-label">Your Name</label>
                                                    <input 
                                                    type="text" 
                                                    name="name" 
                                                    className="form-control" 
                                                    id="yourName" 
                                                    required 
                                                    value={name}
                                                    onChange={(e)=>{setName(e.target.value)}}
                                                    />
                                                    <div className="invalid-feedback">Please, enter your name!</div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourEmail" className="form-label">Your Email</label>
                                                    <input 
                                                    type="email" 
                                                    name="email" 
                                                    className="form-control" 
                                                    id="yourEmail" 
                                                    required 
                                                    value={email}
                                                    onChange={(e)=>{setEmail(e.target.value)}}
                                                    />
                                                    <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Username</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-person"></i></span>
                                                        <input 
                                                        type="text" 
                                                        name="username" 
                                                        className="form-control" 
                                                        id="yourUsername" 
                                                        required 
                                                        value={username}
                                                        onChange={(e)=>{setUsername(e.target.value)}}
                                                        />
                                                        <div className="invalid-feedback">Please choose a username.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input 
                                                    type="password" 
                                                    name="password" 
                                                    className="form-control" 
                                                    id="yourPassword" 
                                                    required 
                                                    value={password}
                                                    onChange={(e)=>{setPassword(e.target.value)}}
                                                    />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                        <label className="form-check-label checklabel" htmlFor="acceptTerms">
                                                            I agree and accept the 
                                                            <Link to="#"> terms and conditions </Link>
                                                        </label>
                                                        <div className="invalid-feedback">You must agree before submitting.</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Already have an account? <Link to="/login">Log in</Link></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                    <div className="credits">
                                        Designed by <Link to="#">DMJ Admin</Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
        </>
    );
}

export default SignUp;