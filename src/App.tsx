// npx create-react-app trainer --template typescript
// npm i redux react-redux
// npm i sass
// npm i node-sass
// npm i @supabase/supabase-js
// npm i --save-dev @interfaces/react-router-dom
// npm install react-confetti
// npm install --save react-snowstorm
// npm install fireworks-js
// npm install pinyin

import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {getAllWords} from "./state/wordGetter/actions";
import {Login} from "./views/Login/Login";
import {Registration} from "./views/Registration/Registration";
import {Admin} from "./views/AdminSection/Admin";
import {Navigation} from './components/Navigation/Navigation';
import {BoardGame} from './views/Practice/BoardGame/BoardGame';
import {Practice} from './views/Practice/Practice';
import {WordMatching} from './views/Practice/WordMatching/WordMatching';
import {statusOfPersonalInfo, userInterface} from './services/dataGetter';
import {wordInterface} from "./views/AdminSection/WordCreator/WordConstructor";
import {Dictionary} from "./components/Dictionary/Dictionary";
import {getWordsFromFireBase} from "./services/getWordsFromFireBase";
import {AudioMatching} from "./views/Practice/AudioMatching/AudioMatching";
import {Footer} from "./components/Footer/Footer";
import {Landing} from "./components/Landing/Landing";
import {MemoryCardGame} from "./views/Practice/MemoryCardGame/MemoryCardGame";
import {server, store, userLoggedIn } from "./services/server";
import './App.scss';


export default function App() {
    const [state, setState] = useState(userLoggedIn);
     const accessFn = () => {
         setState(!state);
    }
    const [user, setUser] = useState<userInterface[]>([]);

    const matchedUser = user?.find((user : userInterface) => user.mail === server.auth.session()?.user?.email)?.nickname;
    const matchedUserPoints = user?.find((user : userInterface) => user.mail === server.auth.session()?.user?.email)?.globalPoints;

    const admin: string | undefined = server.auth.session()?.user?.id;
    const [words, setWords] = useState<wordInterface[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getWordsFromFireBase().then(wordSets => {
            dispatch(getAllWords(wordSets));
            setWords(wordSets);
        })
        return () => {
            setWords([])
        }
    }, [])
    const getUser = async () => {
        const user = await statusOfPersonalInfo()
        setUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    const wordsFromStore = Object.values(store.getState().wordsGetter);

    const [menuIsOpen, setMenuIsOpen] = useState(true);

    const menuShowHandler= () => {
        setMenuIsOpen(prevState => !prevState);
    }

    return (
        <div  className="app">
            <div className='app-content'>
                <Router>
                    <div className='app__label'><Link to='/home' className='app__label-title'>Wisdom</Link></div>
                    <h3 className='app__label-bottom'>{matchedUser ? `May the power be with you, ${matchedUser}!` : 'Greetings, Stranger...'}</h3>
                    {state && <h3 className='app__label-bottom'>{`You've got  ${matchedUserPoints} points`}</h3>}
                    <Navigation setMenuIsOpen={setMenuIsOpen} menuFn={menuShowHandler} menuIsOpen={menuIsOpen} admin={admin} accessFn={accessFn} state={state} />
                        <Switch>
                            {!state && <Route path='/registration'><Registration/></Route>}
                            <Route path='/practice/definition-word'><WordMatching mainEntity={'word'} user={matchedUser} onGameFinished={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice/word-definition'><WordMatching mainEntity={'definition'} user={matchedUser} onGameFinished={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice/audio-definition'><WordMatching mainEntity={'audioUrl'} user={matchedUser} onGameFinished={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice/board-game'><BoardGame words={wordsFromStore}  user={matchedUser} onGameFinish={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice/audio-matching'><AudioMatching user={matchedUser} onGameFinished={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice/memory-game'><MemoryCardGame user={matchedUser} words={wordsFromStore}  onGameFinished={() => {
                                getUser()
                            }}/></Route>
                            <Route path='/practice'><Practice menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen}/></Route>
                            <Route path='/dictionary'><Dictionary /></Route>
                            <Route path='/access'><Login accessFn={accessFn} state={state} user={matchedUser}/></Route>
                            <Route path='/'><Landing/></Route>
                            {admin === '13dd155a-ddf4-4591-a525-528de4e7142b' && <Route path='/admin'><Admin matchedUser={matchedUser}/></Route>}
                        </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    );
}
