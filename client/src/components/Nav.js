import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import back from './assets/back.png';
import './Nav.css';

export default class Nav extends Component {
    render(){
        return <div>
            <Link to={'/'}>
                <div id="nav-back-button">
                    <img src={back} id="nav-back-icon" alt="back" />
                    <h3>BACK</h3>
                </div>
            </Link>
        </div>
    }

}
