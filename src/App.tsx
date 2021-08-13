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
import {statusOfPersonalInfo} from "./Services/dataGetter";

export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
console.log('user is online ~>', server.auth.session()?.user)
export const userLoggedIn = Boolean(server.auth.session()?.user);
console.log('APP status', userLoggedIn)
export const store = createStore(
    allReducers,
    {},
);
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
})
console.log(store.getState())


function App() {
    const [state, setState] = useState(userLoggedIn)
     const accessFn = () => {
        console.log('state in app', state)
         setState(!state)
    }
    const [users, setUsers] = useState<[]>([]);
    useEffect(() => {
        statusOfPersonalInfo().then(person => setUsers(person));
    }, [])
    // FIX IT
    //@ts-ignore
    const matchedUser = users?.find(user => user.mail === server.auth.session()?.user?.email)?.nickname
    return (
        <div className="App">
            <Router>
                <div>Welcome{matchedUser ? `, ${matchedUser}!` : ` to our platform!`}</div>
                <Navigation accessFn={accessFn} state={state} />
                    <Switch>
                        <Route path='/:admin/registration'><Registration/></Route>
                        <Route path='/:admin/access'><Access accessFn={accessFn} state={state}/></Route>
                        <Route path='/admin'><Admin accessFn={accessFn} state={state} matchedUser={matchedUser}/></Route>
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
