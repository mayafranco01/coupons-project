const defaultState = {
    id: null,
    clientType: null,
    expiration: null,
    message: null
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action)
            return {
                ...state,
                id: action.payload.id,
                clientType: action.payload.clientType,
                expiration: action.payload.expiration,
                message: action.payload.message
            };
        case 'RESET':
            return {
                ...state,
                id: null,
                clientType: null,
                expiration: null,
                message: action.payload.message
            };
        case 'MESSAGE':
            return {
                ...state,
                message: action.payload.message
            };
        default:
            return state;
    };
};

export default reducer;