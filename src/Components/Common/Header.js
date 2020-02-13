import React from 'react'
import logo from '../../Images/logo.jpg'
import classes from '../../Styles/Common.module.css'
import { Link } from "react-router-dom"

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/">
                    <div className={classes.logo}>
                        <img src={logo} alt="Gallery" />
                    </div>
                </Link>
                <div className={classes.clearfix}></div>
            </React.Fragment>
        )
    }
}

export default Header