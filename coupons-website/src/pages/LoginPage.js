import React from 'react';

// import login component
import Login from '../share/ui/Login';

// import our custom css 
import '../styles/Login.css';

export function LoginPage() {

    return (
        <div>
            <div className='login-page login-bg_image' />
            <Login />
        </div>
    );
};

export default LoginPage;