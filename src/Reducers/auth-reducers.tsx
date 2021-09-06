import {createClient} from "@supabase/supabase-js";
import {ACTIONS} from "../Actions/actions";
// ***
export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
export const status = Boolean(server.auth.session()?.user);
// FIX IT
export const logOutReducer = (state = !status, action: any) => {
    switch (action.type) {
        case ACTIONS.IS_LOGGED_OUT: {
            return !state;
        }
        default: {
            return state
        }
    }
}
// FIX IT
export const logInReducer = (state = status, action: any) => {
    switch (action.type) {
        case ACTIONS.IS_LOGGED_IN: {
            return !state;
        }
        default: {
            return state
        }
    }
}