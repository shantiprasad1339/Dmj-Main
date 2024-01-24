import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <>
            {/* ======= Footer ======= */}
            <footer id="footer" className="footer">
                <div className="copyright">
                    &copy; Copyright 2023 <strong><span>DMJ Admin</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <Link to="#">DMJ</Link>
                </div>
            </footer>
            {/* -- End Footer -- */}

            <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
        </>
    );
}

export default Footer;