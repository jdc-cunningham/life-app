import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import lineAngleLeft from './../../assets/icons/line-angle-left.svg';

const Header = (props) => {
    const subAppName = props.location.pathname; // will be based on props
    const backArrow = subAppName === '/' ? "" :
        <Link to="/" className="header__back"><img src={ lineAngleLeft } alt="Back to main" />Back</Link>;

    return (
        <header>
            <span>
                { backArrow }
            </span>
            <h2>
                LifeApp
            </h2>
        </header>
    )
}

export default Header;