import React from 'react';
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import MainContent from '../../Dashboard/MainCategory/MainContent';
import '../../Dashboard/MainCategory/maincategory.css'
import Login from '../Login/Login';
import { useState } from 'react';
import logo from './newpnglogo.png'

function Home() {

    const [isLogin, setLogin] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function handleLogin(e) {
        e.preventDefault();

        if (username === 'admin@admin.com' && password === 'admin@123') {
            setLogin(true)
            localStorage.setItem('userId1', '12321')
            window.location.reload()
        }
        else {
            setLogin(false)
            alert("Enter a correct Information")
        }

    }

    const userId = localStorage.getItem('userId1')

    return (
        <>
            {(isLogin || userId != null) ?
                <MainCategory>
                    <MainContent />
                </MainCategory>
                :

                <>
                    <div className="container">
                        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                        <div className=" d-flex justify-content-center">
                                            <div to="/login" className="dmjlogo d-flex align-items-center w-auto">
                                                {/* <img src="uploads/IMG_5086.webp" alt="" /> */}
                                                {/* <span className="d-none d-lg-block">Admin Portal</span> */}
                                            </div>
                                        </div>

                                        <div className="card mb-3">

                                            <div className="card-body">

                                            <div  style={{width:'200px', margin:'auto' }}>
                                                        <img src={logo} alt="" />
                                                    </div>

                                                <div>
                                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                    <p className="text-center small">Enter your username & password to login</p>
                                                </div>

                                                <form onSubmit={(e) => { handleLogin(e) }} method='post' className="row g-3 needs-validation" >

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
                                                                onChange={(e) => { setUsername(e.target.value) }}
                                                            />
                                                            <div className="invalid-feedback">Please enter your username.</div>
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
                                                            onChange={(e) => { setPassword(e.target.value) }}
                                                        />
                                                        <div className="invalid-feedback">Please enter your password!</div>
                                                    </div>
                                                    {/* 
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input className="form-check-input me-3" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                            <label className="form-check-label mt-2" htmlFor="rememberMe">Remember me</label>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit">Login</button>
                                                    </div>
                                                    {/* <div className="col-12">
                                                        <p className="small mb-0">Don't have account? <p to="/signup">Create an account</p></p>
                                                    </div> */}
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </section>

                    </div>



                </>
            }
        </>
    );
}
export default Home;