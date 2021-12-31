import React, { Component } from 'react';
import '../styles/landing.css'
import User from './User'

class Landing extends Component {

    signOut = () => {
        this.props.handleRegisteredUser(undefined)
    }

    render() {
        let users = this.props.users
        return (
            <div id="profiles-container">
                <div className="profiles-label">Who's watching?</div>
                <ul className="choose-profile"> 
                    {users.map(u => 
                        <User 
                            user={u} 
                            key={u.name} 
                            handleRegisteredUser={this.props.handleRegisteredUser}/>)}
                </ul>
                {this.props.userName != undefined ? <div id="sign-out" onClick={this.signOut}>Sign out</div> : null}
            </div>                
        )
    }
}

export default Landing;