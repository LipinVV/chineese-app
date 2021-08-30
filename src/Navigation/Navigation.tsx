import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './navigation.scss';

export const Navigation = ({state, setMenuIsOpen, menuIsOpen}: any) => {
    const [width, setWidth] = useState(window.innerWidth)
    const menuHandler = () => {
        setMenuIsOpen((prevState: any) => !prevState)
    }

    useEffect(() => {
        const reportWindowSize = () => {
            setWidth(window.innerWidth)
        }
        window.onresize = reportWindowSize;
        window.addEventListener('resize', reportWindowSize);
    }, [])

    return (
        <div className='navigation'>
            <div  className={menuIsOpen ? 'navigation__wrapper__hidden' : 'navigation__wrapper'}>
                <div className={width < 1023 ? 'navigation__links' : 'navigation__links navigation__links_desktop'}>
                    {width < 1023 ? <Link className={!menuIsOpen ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/'>Home</Link> : <Link className='navigation__link' to='/'>Home</Link>}
                    {/*{width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/admin'>Admin</Link> : <Link className='navigation__link' to='/admin'>Admin</Link>}*/}
                    {width < 1023 && state ? <Link className={!menuIsOpen && state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/practice'>Practice</Link> : <Link className={ state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/practice'>Practice</Link>}
                    {/*{width < 1023 ? <Link className={!menu ? 'navigation__link' : 'navigation__link navigation__link_hidden' } to='/'>Materials</Link> : <Link className='navigation__link' to='/'>Materials</Link>}*/}
                    {width < 1023 ? <Link className={!menuIsOpen  ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/access'>{!state ? 'Login' : 'Logout'}</Link> : <Link className='navigation__link' to='/access'>{!state ? 'Login' : 'Logout'}</Link>}
                    {width < 1023 && !state ? <Link className={!menuIsOpen && !state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/registration'>Registration</Link> : <Link className={ !state ? 'navigation__link' : 'navigation__link navigation__link_hidden' }  to='/registration'>Registration</Link>}
                </div>
            </div>
            <button onClick={() => {
                menuHandler()
            }} className='navigation__menu-button'><span className='navigation__animated-link'>{menuIsOpen ? `Open` : `Close`}</span></button>
        </div>
    )
}