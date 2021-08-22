// npx create-react-app trainer --template typescript
// npm i redux react-redux
// npm i sass
// npm i node-sass
// npm i @supabase/supabase-js
// npm i --save-dev @types/react-router-dom
// npm install react-confetti
// npm install --save react-snowstorm
// npm install fireworks-js

// //  npm install pinyin
// let dictionary: any = []
// import ('./../../dictionaryInEnglish.json').then((data) => dictionary.push(data))
// console.log(dictionary)
// let pinyin = require('pinyin')
// console.log(pinyin)

import React, {useEffect, useState} from 'react';
import './App.scss';
import {Admin} from "./AdminSection/Admin";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createClient} from "@supabase/supabase-js";
import {Registration} from "./AdminSection/Access/Registration/Registration";
import {Access} from "./AdminSection/Access/Access";
import {Navigation} from "./Navigation/Navigation";
import {allReducers} from "./Reducers/reducers";
import {createStore} from "redux";
import {getWordsDataBase, statusOfPersonalInfo, userInterface} from "./Services/dataGetter";
import {Practice} from "./Practice/Practice";
import {wordCard} from "./types/types";
import {getAllWords} from "./Actions/actions";
import {useDispatch} from "react-redux";
import {DefinitionWord} from "./Practice/WordMatching/DefinitionWord";
import {WordDefinition} from "./Practice/WordMatching/WordDefinition";
import {BoardGame} from "./Practice/BoardGame/BoardGame";
// 1) same nicknames problem
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
// console.log(store.getState())

function App() {
    const [state, setState] = useState(userLoggedIn);
     const accessFn = () => {
         setState(!state);
    }
    const [user, setUser] = useState<userInterface[]>([]);
    useEffect(() => {
        statusOfPersonalInfo().then(person => setUser(person));
    }, [])

    const matchedUser= user?.find(user => user.mail === server.auth.session()?.user?.email)?.nickname;
    const admin: any = server.auth.session()?.user?.id;
    const matchedUserPoints = user?.find(user => user.mail === server.auth.session()?.user?.email)?.globalPoints;
    const [words, setWords] = useState<wordCard[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getWordsDataBase().then(wordSets => {
            dispatch(getAllWords(wordSets));
            setWords(wordSets);
        })
    }, [])
    return (
        <div id='width' className="app">
            <Router>
                <div className='app__label'><span className='app__label-title'>Enlightenment</span></div>
                <h3 className='app__label-bottom'>{matchedUser ? `Welcome, ${matchedUser}!` : 'Greetings, stranger...'}</h3>
                {state && <h3 className='app__label-bottom'>{`You've got  ${matchedUserPoints} points`}</h3>}
                <Navigation admin={admin} accessFn={accessFn} state={state} />
                    <Switch>
                        {!state && <Route path='/registration'><Registration/></Route>}
                        <Route path='/practice/definition-word'><DefinitionWord user={matchedUser}/></Route>
                        <Route path='/practice/word-definition'><WordDefinition user={matchedUser}/></Route>
                        <Route path='/practice/board-game'><BoardGame  user={matchedUser}/></Route>
                        <Route path='/practice'><Practice user={matchedUser}/></Route>
                        <Route path='/access'><Access accessFn={accessFn} state={state} user={matchedUser}/></Route>
                        {admin === '13dd155a-ddf4-4591-a525-528de4e7142b' && <Route path='/admin'><Admin accessFn={accessFn} state={state} matchedUser={matchedUser}/></Route>}
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
