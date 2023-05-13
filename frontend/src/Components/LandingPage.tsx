import React from 'react';
import logo from '../logo.svg';

function Login(){
    /* create a login page with a button that redirects to the auth0 login page */
    const [text, setText] = React.useState<string>('');
    const handleOnClick = () => {
        console.log(text);
    };
    return(
        <div>
            <img src='{logo}'></img>
            <button>Login</button>
            <div className="input__wrapper">
        
        

      </div>
        </div>
    );
}

export default Login;