import React from 'react';
import JobSaved from './JobSaved';
import {Link, NavLink, Route, BrowserRouter as Router} from 'react-router-dom';

const Footer = (props) => {
        return  (
            <footer>
                {props.loggedIn === true ? <div className="threeButtons"><Link to='/'>Search Again</Link>
                    <Link to='/mysavedjobs'>My Saved Jobs</Link> {props.loggedIn === true ? <a href="#" onClick={props.signOut}>Sign Out</a> : <a href="#" onClick={props.signIn}>Sign In</a>}</div> : <div className="oneButton"><a href="#" onClick={props.signIn}>Sign In</a></div>}
                {/* {props.loggedIn === true ? <a href="#" onClick={props.signOut}>Sign Out</a> : <a href="#" onClick={props.signIn}>Sign In</a>} */}
            </footer>
        )
}

export default Footer