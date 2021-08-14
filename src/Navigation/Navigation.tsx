import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import './navigation.scss';

export const Navigation = ({state}: any) => {

    const [menu, setMenu] = useState(true);
    const [width, setWidth] = useState(window.innerWidth)
    const menuHandler = () => {
        setMenu(prevState => !prevState)
    }

    useEffect(() => {
        function reportWindowSize() {
            setWidth(window.innerWidth)
        }
        window.onresize = reportWindowSize;
        window.addEventListener('resize', reportWindowSize);
    }, [])

    //style={!state ? {'gridTemplateColumns': 'repeat(6, 1fr)', 'gridTemplateRows' : '1fr'} : {'display' : 'grid', 'gridTemplateColumns': 'repeat(5, 1fr)', 'gridTemplateRows' : '1fr'}}
    return (
        <div className='navigation'>
            <div className={width < 1023 ? 'navigation__links' : 'navigation__links navigation__links_desktop'}>
                {width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/'>Home</Link> : <Link className='navigation__link' to='/'>Home</Link>}
                {width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/admin'>Admin</Link> : <Link className='navigation__link' to='/admin'>Admin</Link>}
                {width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/'>Trainings</Link> : <Link className='navigation__link' to='/'>Trainings</Link>}
                {width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/'>Materials</Link> : <Link className='navigation__link' to='/'>Materials</Link>}
                {width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/:admin/access'>{!state ? 'Login' : 'Logout'}</Link> : <Link className='navigation__link' to='/:admin/access'>{!state ? 'Login' : 'Logout'}</Link>}
                {width < 1023 && !state ? <Link className={!menu && !state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/:admin/registration'>Registration</Link> : <Link className={ !state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/:admin/registration'>Registration</Link>}
            </div>
            <button onClick={menuHandler} className='navigation__menu-button'><span className='navigation__animated-link'>{menu ? `Open` : `Close`}</span></button>
        </div>
    )
}