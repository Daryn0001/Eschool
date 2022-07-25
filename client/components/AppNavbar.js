import React, {Component} from 'react';

import {connect} from 'react-redux';
import {logoutUser} from '../services/index';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignInAlt, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        this.props.logoutUser();
    };

    render() {

        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to={"/register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
            <Nav className="me-auto">
                <Link to={"/pupils"} className="nav-link">Student List</Link>
                <Link to={"/pupils/add"} className="nav-link">Add Student</Link>
            </Nav>
                <Nav className="navbar-right">
                    <Link to={"/logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>

                </Nav>
            </>
        );

        return (
            <Navbar bg="dark" variant="dark">
                <Link to="/" className="navbar-brand">E-School</Link>
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export  default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);