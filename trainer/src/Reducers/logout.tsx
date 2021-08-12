import {createClient} from "@supabase/supabase-js";

export const server = createClient('https://schntvgnpmprszlqppfh.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODc1MjMyMSwiZXhwIjoxOTQ0MzI4MzIxfQ.' +
    'I8cMe1GntTxYlQRrWZAHF6MAInAwHjolSX_xxNNIRro');
console.log('user is online ~>', server.auth.session()?.user)
export const status = Boolean(server.auth.session()?.user);

export const logOutReducer = (state = status, action: any) => {
    switch (action.type) {
        case 'IS_NOT_LOGGED': {
            return !state;
        }
        default: {
            return state
        }
    }
}