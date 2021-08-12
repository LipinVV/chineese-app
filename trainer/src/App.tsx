// npx create-react-app trainer --template typescript
// npm i redux react-redux
// npm i sass
// npm i node-sass
// npm i @supabase/supabase-js
// npm i --save-dev @types/react-router-dom

import React, {useState} from 'react';
import './App.scss';
import {Admin} from "./AdminSection/Admin";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createClient} from "@supabase/supabase-js";
import {Registration} from "./AdminSection/Access/Registration/Registration";
import {Access} from "./AdminSection/Access/Access";
import {Navigation} from "./Navigation/Navigation";
import {allReducers} from "./Reducers/reducers";
import {createStore} from "redux";

export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
console.log('user is online ~>', server.auth.session()?.user)
export const status = Boolean(server.auth.session()?.user);

export const store = createStore(
    allReducers,
    {},
);
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
})
console.log(store.getState())

function App() {

    return (
        <div className="App">
            {server.auth.session()?.user ? 'YES' : 'NO'}
            <Router>
                <Navigation />
                {!server.auth.session()?.user &&
                <>
                    <Switch>
                        <Route path='/:admin/registration'><Registration/></Route>
                        <Route path='/:admin/access'><Access/></Route>
                        <Route path='/admin'><Admin status={status}/></Route>
                    </Switch>
                </>
                }
                {server.auth.session()?.user &&
                    <>
                        <Switch>
                            <Route path='/:admin/registration'><Registration/></Route>
                            <Route path='/:admin/access'><Access/></Route>
                            <Route path='/admin'><Admin/></Route>
                        </Switch>
                    </>
                }
            </Router>
        </div>
    );
}

export default App;
