// npx create-react-app trainer --template typescript
// npm i redux react-redux
// npm i sass
// npm i node-sass
// npm i @supabase/supabase-js
// npm i --save-dev @types/react-router-dom

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
// 1) nicknames problem
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

// console.log('users', statusOfPersonalInfo().then(x =>console.log(x)))

function App() {
    const [state, setState] = useState(userLoggedIn);
     const accessFn = () => {
         setState(!state);
    }
    const [users, setUsers] = useState<userInterface[]>([]);
    useEffect(() => {
        statusOfPersonalInfo().then(person => setUsers(person));
    }, [])

    const matchedUser = users?.find(user => user.mail === server.auth.session()?.user?.email)?.nickname;

    const [words, setWords] = useState<wordCard[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        getWordsDataBase().then(wordSets => {
            dispatch(getAllWords(wordSets));
            setWords(wordSets);
        })
    }, [])
    // console.log(store.getState())
    return (
        <div id='width' className="app">
            <Router>
                <h1 className='app__label'>Chinese trainer</h1>
                <h3 className='app__label-bottom'>{matchedUser ? `Welcome, ${matchedUser}!` : 'Greetings, stranger...'}</h3>
                <Navigation accessFn={accessFn} state={state} />
                    <Switch>
                        {!state && <Route path='/registration'><Registration/></Route>}
                        <Route path='/practice'><Practice/></Route>
                        <Route path='/access'><Access accessFn={accessFn} state={state} user={matchedUser}/></Route>
                        <Route path='/admin'><Admin accessFn={accessFn} state={state} matchedUser={matchedUser}/></Route>
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
