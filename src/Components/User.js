import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/user.css'

class User extends Component {

    handleRegisteredUser = () => {
        this.props.handleRegisteredUser(this.props.user.name)
    }

    render() {
        let name = this.props.user.name
        let img = this.props.user.img
        return (
            <li className="profile">
                <Link className="profile-link" to="/Catalog" onClick={this.handleRegisteredUser}>
                    <div className="profile-icon" style={{backgroundImage: `url(${img})` }}> 
                    </div>
                    <span className="profile-name">{name}</span>
                </Link>
            </li>

        );
    }
}

export default User;