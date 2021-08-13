import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import './navigation.scss'
import {server} from "../App";

export const Navigation = ({state}: any) => {

    const [menu, setMenu] = useState(false);

    const menuHandler = () => {
        setMenu(prevState => !prevState)
    }

    return (
        <div className='navigation'>
            <div className={menu ? 'navigation__links navigation__links_hidden' : 'navigation__links'}>
                <Link className='navigation__link' to='/'>Home</Link>
                <Link className='navigation__link' to='/admin'>Admin</Link>
                <Link className='navigation__link' to='/:admin/access'>Login</Link>
                {!state ? <Link className='navigation__link' to='/:admin/registration'>Registration</Link> : null}
            </div>
            <button onClick={menuHandler} className='navigation__menu-button'>Open</button>
        </div>
    )
}