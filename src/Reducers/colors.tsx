export const colorReducer = (state = {'backgroundColor' : 'red'}, action: any) => {
    switch (action.type) {
        case 'GET_WHITE_COLOR': {
            // {'backgroundColor' : 'white'};
            return action.payload
        }
        case 'GET_RED_COLOR': {
            return {'backgroundColor' : 'green'};
        }
        default: {
            return state
        }
    }
}