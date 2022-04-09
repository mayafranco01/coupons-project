// import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import reducer from './Reducer';

// export default combineReducers({
//     // similar to auth: auth
//     auth
// });

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}


export default function configureStore() {
    const persistedState = loadFromLocalStorage();  
    const store = createStore(reducer, persistedState); 
    store.subscribe(() => saveToLocalStorage(store.getState()));

    return store;
};