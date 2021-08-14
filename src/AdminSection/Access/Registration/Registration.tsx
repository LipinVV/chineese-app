import React, {useState} from 'react';
import {server} from "../../../App";
import './registration.scss'
import {useHistory} from "react-router";
import {Link} from 'react-router-dom';


export const Registration = () => {
    const history = useHistory();
    // const userLoggedIn = Boolean(server.auth.session()?.user);
    const [userMail, setUserMail] = useState('vit.lipin@gmail.com');
    const [userPassword, setUserPassword] = useState('password');
    // const [userConnected, setUserConnected] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [textOfError, setTextOfError] = useState('');
    const [status, setStatus] = useState(false);
    const [nickName, setNickName] = useState('Trainee');

    const mailCondition = (password: any, email: any) => {
        return password.length < 5 || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    }
    const signUp = async () => {
        try {
            const {user, error} = await server.auth.signUp({
                email: userMail,
                password: userPassword,
            })
            const {data} = await server
                .from('users')
            if (!data?.map((user: any) => user).find((values: any) => values.nickname === nickName || values.mail === userMail)) {
                const {data} = await server
                    .from('users')
                    .insert([
                        {
                            nickname: nickName,
                            mail: userMail,
                        }
                    ])
                console.log('user is =>', data)
            }
            if (error) {
                console.log('ERROR', error, typeof error)
                setSignInError(true)
                setTextOfError(`${error.message}. Try again`)
            }
            if (user?.aud === 'authenticated') {
                console.log('user', user)
                setStatus(true)
                setSignInError(false)
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log('reg =>', server.auth.session()?.user?.email)
    return (
        <div className='registration'>
            <h1 className='registration__header'>Sign In to your account</h1>
            {!status && <div className='registration__form'>
                    <label className='registration__label'>Enter your nickname
                        <input
                            className='registration__input'
                            type='text'
                            value={nickName}
                            onChange={(evt) => setNickName(evt.target.value)}/>
                    </label>
                    <label className='registration__label'>Enter your e-mail
                        <input
                            className='registration__input'
                            type='text'
                            value={userMail}
                            onChange={(evt) => setUserMail(evt.target.value)}/>
                    </label>
                    <label className='registration__label'>Create your password
                        <input
                            className='registration__input'
                            type='text'
                            value={userPassword}
                            onChange={(evt) => setUserPassword(evt.target.value)}/>
                    </label>
                    <button
                        disabled={mailCondition(userPassword, userMail)}
                        className={mailCondition(userPassword, userMail) ? 'registration__button registration__button_disabled' : 'registration__button'}
                        type='button'
                        onClick={signUp}
                    >Create an account
                    </button>
                    <Link to='/access' className='registration__button'>To login page</Link>
                </div>
            }
            {!status &&
            <div className={signInError ? 'registration__error-message' : ''}>
                {textOfError}
            </div>
            }
            {status && <div className={signInError ? '' : ''}>
                Account was created
                <button className='registration__button' onClick={() => history.goBack()}>Go back</button>
            </div>
            }

        </div>
    )
}