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

import {createClient} from '@supabase/supabase-js';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import {getAllWords} from './Actions/actions';
import {Access} from './AdminSection/Access/Access';
import {Registration} from './AdminSection/Access/Registration/Registration';
import {Admin} from './AdminSection/Admin';
import './App.scss';
import {Navigation} from './Navigation/Navigation';
import {BoardGame} from './Practice/BoardGame/BoardGame';
import {Practice} from './Practice/Practice';
import {DefinitionWord} from './Practice/WordMatching/DefinitionWord';
import {WordDefinition} from './Practice/WordMatching/WordDefinition';
import {allReducers} from './Reducers/reducers';
import {getWordsDataBase, statusOfPersonalInfo, userInterface} from './Services/dataGetter';
import {wordCard} from './types/types';
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

    const matchedUser = user?.find(user => user.mail === server.auth.session()?.user?.email)?.nickname;
    const matchedUserPoints = user?.find(user => user.mail === server.auth.session()?.user?.email)?.globalPoints;

    const admin: any = server.auth.session()?.user?.id;
    const [words, setWords] = useState<wordCard[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getWordsDataBase().then(wordSets => {
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

// const getBucketHandler = async () => {
//         try {
//             const { data, error } = await server
//                 .storage.listBuckets()
//             console.log(data, error)
//         }
//         catch (error) {
//             console.log(error)
//         }
// }
// useEffect(() => {
//     getBucketHandler().then(x => console.log(x))
// })
//
//   const bucketCreator = async () => {
//       const { data, error } = await server
//           .storage
//           .createBucket('avatars', { public: false })
//   }
//
// bucketCreator().then(x => console.log(x))

    const wordsFromStore: any = Object.values(store.getState().wordsGetter);

    return (
        <div id='width' className="app">
            <Router>
                <div className='app__label'><Link to='/home' className='app__label-title'>Wisdom</Link></div>
                <h3 className='app__label-bottom'>{matchedUser ? `May the power be with you, ${matchedUser}!` : 'Greetings, stranger...'}</h3>
                {state && <h3 className='app__label-bottom'>{`You've got  ${matchedUserPoints} points`}</h3>}
                <Navigation admin={admin} accessFn={accessFn} state={state} />
                    <Switch>
                        {!state && <Route path='/registration'><Registration/></Route>}
                        <Route path='/practice/definition-word'><DefinitionWord user={matchedUser} onGameFinish={() => {
                            getUser()
                        }}/></Route>
                        <Route path='/practice/word-definition'><WordDefinition user={matchedUser}/></Route>
                        <Route path='/practice/board-game'><BoardGame words={wordsFromStore}  user={matchedUser}/></Route>
                        <Route path='/practice'><Practice /></Route>
                        <Route path='/access'><Access accessFn={accessFn} state={state} user={matchedUser}/></Route>
                        {admin === '13dd155a-ddf4-4591-a525-528de4e7142b' && <Route path='/admin'><Admin accessFn={accessFn} state={state} matchedUser={matchedUser}/></Route>}
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
