import {createClient} from "@supabase/supabase-js";
import {createStore} from "redux";
import {allReducers} from "./state/allReducers";

export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
export const userLoggedIn = Boolean(server.auth.session()?.user);

export  const store = createStore(
    allReducers,
    {},
);
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState());
})