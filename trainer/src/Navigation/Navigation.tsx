import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import './navigation.scss'
import {Access} from "../AdminSection/Access/Access";
import {server} from "../App";

export const Navigation = () => {

    // const [menu, setMenu] = useState(false);
    // const [subMenu, setSubMenu] = useState(true);


    return (
        <ul className='navigation'>
            <li className='navigation__link'>
                <Link to='/'>Home</Link>
                <Link to='/admin'>Admin</Link>
                <Link to='/:admin/access'>Login</Link>
                {!server.auth.session()?.user ? <Link to='/:admin/registration'>Registration</Link> : null}
                {/*<Link to='/access'><Access/></Link>*/}
            </li>
        </ul>
    )
}