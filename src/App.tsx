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

import {createClient} from '@supabase/supabase-js';
import {createStore} from 'redux';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {getAllWords} from "./state/Reducers/wordGetter/actions";
import {Access} from "./components/views/AdminSection/Access/Access";
import {Registration} from "./components/views/AdminSection/Registration/Registration";
import {Admin} from "./components/views/AdminSection/Admin";
import {Navigation} from './components/views/Navigation/Navigation';
import {BoardGame} from './components/views/Practice/BoardGame/BoardGame';
import {Practice} from './components/views/Practice/Practice';
import {WordMatching} from './components/views/Practice/WordMatching/WordMatching';
import {statusOfPersonalInfo, userInterface} from './components/services/dataGetter';
import {wordInterface} from "./components/views/AdminSection/WordCreator/WordConstructor";
import {Dictionary} from "./components/views/Dictionary/Dictionary";
import {getWordsFromFireBase} from "./components/services/getWordsFromFireBase";
import {AudioMatching} from "./components/views/Practice/AudioMatching/AudioMatching";
import {Footer} from "./components/views/Footer/Footer";
import {Landing} from "./components/views/Landing/Landing";
import {MemoryCardGame} from "./components/views/Practice/MemoryCardGame/MemoryCardGame";
import {allReducers} from "./state/Reducers/allReducers";
import './App.scss';

export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
export const userLoggedIn = Boolean(server.auth.session()?.user);
export const store = createStore(
    allReducers,
    {},
);
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
})
console.log(store.getState())
function App() {
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
                            <Route path='/access'><Access accessFn={accessFn} state={state} user={matchedUser}/></Route>
                            <Route path='/'><Landing/></Route>
                            {admin === '13dd155a-ddf4-4591-a525-528de4e7142b' && <Route path='/admin'><Admin matchedUser={matchedUser}/></Route>}
                        </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    );
}

export default App;
