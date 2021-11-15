import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {isLoggedIn, isLoggedOut} from "../../../../state/auth/actions";
import {server, userLoggedIn} from "../../../../App";
import './access.scss';

export const Access = ({accessFn, state, user}: any) => {
    const dispatch = useDispatch();
    const [userMail, setUserMail] = useState('vit.lipin@gmail.com');
    const [userPassword, setUserPassword] = useState('password');
    const [userConnected] = useState(userLoggedIn);
    const [accessError, setAccessError] = useState(false);
    const [textOfError, setTextOfError] = useState('');

    const mailCondition = (password: string, email: string) => {
        return password.length < 5 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    const logIn = async () => {
        try {
            const {error} = await server.auth.signIn({
                email: userMail,
                password: userPassword,
            });
            dispatch(isLoggedIn(!userConnected))
            if (error) {
                setAccessError(true);
                setTextOfError(`${error.message}. Try again`)
            }
            else {
                setAccessError(false);
                accessFn()
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
            console.error('error', error);
        }
    }
    return (
        <div className='access'>
            <h1 className='access__header'>{!state ? 'The last step' : 'Practice'} {!state ? 'to start your training' : `is waiting for you, ${user}`}</h1>
            {!state && <label className='access__label'>Enter your e-mail
                <input
                    className='access__input'
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
                <Link  to='/practice' className='access__button access__button_practice'>Return to practice</Link>
                :
                <button
                    type='button'
                    style={accessError ? {'animationName': 'shake', 'animationDuration' : '0.6s'}: {}}
                    disabled={mailCondition(userPassword, userMail)}
                    className={accessError ? 'access__button' : 'access__button'}
                    onClick={logIn}>Login
                </button>
            }
            {accessError ? <div className={accessError ? 'access__error-message' : 'access__error-message access__error-message_hidden'}>
                {textOfError}
            </div> : ''}
            {state && <button
                type='button'
                className='access__button'
                onClick={logOut}>Logout
            </button>}
        </div>
    )
}