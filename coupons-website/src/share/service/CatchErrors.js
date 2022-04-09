// import resetUserDetails action from redux store to reset the global states in case of network error or if the jwt token is expired
import { resetUserDetails } from '../../store/actions/ReducerActions';

// this method receives dispatch and err props from the services and handles errors by dispatch actions from the redux store as needed 
const CatchErrors = (dispatch, err) => {
    let errorMessage;
    try {
        console.log(`CatchErrors: err.status: ${err?.status} err.response.status: ${err?.response?.status} 
        err.code: ${err?.code} err.response.code: ${err?.response?.code} err: ${JSON.stringify(err)}`);
        
        if (err?.message === 'Network Error') {
            dispatch(resetUserDetails('Network error'));
            errorMessage = 'Network error';
        }
        else if (err?.response?.status === 401) {
            dispatch(resetUserDetails('Your time in the system is up. Please sign in again.'));
            errorMessage = 'Your time in the system is up. Please reconnect.';
        }
        else if (err?.response?.data) {
            console.log('err.response.data.message: ', err.response.data.message);
            errorMessage = err.response.data.message;
        } else {
            console.log('err.message: ', err?.message);
            errorMessage = err.message;
        };
    } catch (e) {
        console.error(`I just caught an error in CatchError.js that I missed along the way... The error is:  ${e}`);
    };
    return { succeeded: false, errorMessage }
};

export default CatchErrors;