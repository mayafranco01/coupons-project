import React from 'react';

// import Alert and Button from react-bootstrap to create an Alert to send info messages or errors to the user
import { Alert, Button } from 'react-bootstrap';

// import useSelector hook from react redux to extract message from the redux store state
// import useDispatch hook from react redux to dispatch our actions from the redux store without connecting our component 
import { useSelector, useDispatch } from 'react-redux';

// import setMessage from react redux ReducerActions that is displayed when there is a message to show to the user 
// and sets to undefined when the Alert is closed
import { setMessage } from '../../store/actions/ReducerActions';

// import our custom css 
import '../../styles/Alert.css';

const AlertMessage = () => {

    const dispatch = useDispatch();

    // this function receives a message and returns a boolean value that is sent to the Array attribute 'show'
    // and the Alert displays the message if the value is true
    const isMessageExist = (message) => {
        return message !== undefined && message !== null && message.length > 0;
    };

    return (
        <Alert show={isMessageExist(useSelector(state => state.message))} variant='dark' className='fixed-bottom'>
            <p className='alert_content'>
                {useSelector(state => state.message)}
            </p>
            <hr />
            <div className='d-flex justify-content-end'>
                <Button onClick={() => dispatch(setMessage(undefined))} variant='outline-dark'>
                    Close
                </Button>
            </div>
        </Alert>
    );
};

export default AlertMessage;