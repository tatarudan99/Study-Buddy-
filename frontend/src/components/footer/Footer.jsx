// src/components/Footer.jsx

import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>
                © 2024 Study Buddy.{' '}
                <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy Policy</Link>
            </p>
            <p className={"contact__bloock"}>
                <a className={"footer__email"} href="mailto:2125053@student.uwtsd.ac.uk">2125053@student.uwtsd.ac.uk</a>
                <a className={"footer__number"} href="tel:+447538021256">+447538021256</a>
            </p>
        </footer>
    );
}

export default Footer;
