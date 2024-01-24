import React from "react";
import MainCategory from '../../Dashboard/MainCategory/MainCategory';
import { Link } from "react-router-dom";
import './contact.css'

function Contact() {
    return (
        <>
            <MainCategory>

                <div className="pagetitle">
                    <h1>Contact</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Contact</li>
                        </ol>
                    </nav>
                </div>

                <section class="section contact">

                    <div class="row gy-4">

                        <div class="col-xl-6">

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="info-box card">
                                        <i class="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>Gurukripa Enclave, Near IndusInd Bank, Besides Raas Mahal Hotel, Old Ramgadhmod Bus stand, Jaipur (302002)</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="info-box card">
                                        <i class="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <p>+91-96640 83783 <br/> +91-80057 79031</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="info-box card">
                                        <i class="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <p>info@a2groups.org</p>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="info-box card">
                                        <i class="bi bi-clock"></i>
                                        <h3>Open Hours</h3>
                                        <p>Monday - Saturday<br />10:00AM - 08:00PM</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-xl-6">
                            <div class="card p-4">
                                <form action="forms/contact.php" method="post" class="php-email-form">
                                    <div class="row gy-4">

                                        <div class="col-md-6">
                                            <input type="text" name="name" class="form-control" placeholder="Your Name" required />
                                        </div>

                                        <div class="col-md-6 ">
                                            <input type="email" class="form-control" name="email" placeholder="Your Email" required />
                                        </div>

                                        <div class="col-md-12">
                                            <input type="text" class="form-control" name="subject" placeholder="Subject" required />
                                        </div>

                                        <div class="col-md-12">
                                            <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                                        </div>

                                        <div class="col-md-12 text-center">
                                            <div class="loading">Loading</div>
                                            <div class="error-message"></div>
                                            <div class="sent-message">Your message has been sent. Thank you!</div>

                                            <button type="submit">Send Message</button>
                                        </div>

                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                </section>

            </MainCategory>
        </>
    );
}

export default Contact;