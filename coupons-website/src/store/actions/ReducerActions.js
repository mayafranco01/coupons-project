export const storeUserDetails = (id, clientType, expiration, message) => {
    return {
        type: 'LOGIN',
        payload: {id, clientType, expiration, message}
    };
};

export const resetUserDetails = (message) => {
    return {
        type: 'RESET',
        payload: {message}
    };
};

export const setMessage = (message) => {
    return {
        type: 'MESSAGE',
        payload: {message}
    };
};

