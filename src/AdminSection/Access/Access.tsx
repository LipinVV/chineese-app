import React, {useState} from 'react';
import {server, userLoggedIn} from "../../App";
import './access.scss';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {isLoggedIn, isLoggedOut} from "../../Actions/actions";


export const Access = ({accessFn, state}: any) => {
    const dispatch = useDispatch();
    const [userMail, setUserMail] = useState('vit.lipin@gmail.com');
    const [userPassword, setUserPassword] = useState('password');
    const [userConnected, setUserConnected] = useState(userLoggedIn);
    const [loginError, setLoginError] = useState(false);
    const [textOfError, setTextOfError] = useState('');

    const mailCondition = (password: string, email: string) => {
        return password.length < 5 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    }

    const logIn = async () => {
        try {
            const {user, session, error} = await server.auth.signIn({
                email: userMail,
                password: userPassword,
            });
            dispatch(isLoggedIn(!userConnected))
            accessFn()
            if (error) {
                setLoginError(true);
                setTextOfError(error.message)
            }
        } catch (error) {
            console.error('error', error)
        }
    }

    const logOut = async () => {
        try {
            const {error} = await server.auth.signOut();
            dispatch(isLoggedOut(userConnected));
            accessFn()
        } catch (error) {
            console.error('error', error)
        }
    }
    return (
        <div className='access'>Access
            {!state && <label className='access-label'>Enter your e-mail
                <input
                    className='access-input'
                    type='text'
                    value={userMail}
                    onChange={(evt) => setUserMail(evt.target.value)}/>
            </label>}
            {!state && <label className='access__label'>Enter your password
                <input
                    className='access__input'
                    type='text'
                    value={userPassword}
                    onChange={(evt) => setUserPassword(evt.target.value)}/>
            </label>}
            {state ?
                <button
                    type='button'
                    className='access-button'
                    onClick={logOut}>Logout
                </button>
                :
                <button
                    type='button'
                    disabled={mailCondition(userPassword, userMail)}
                    className={mailCondition(userPassword, userMail) ? '' : ''}
                    onClick={logIn}>Login
                </button>
            }
            {loginError && <div className={!loginError ? '' : ''}>
                {textOfError}
                <Link to='/access' className='login-button'>Try again</Link>
            </div>}
        </div>
    )
}