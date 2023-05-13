import React from "react";
import logo from "../logo.svg";

function AuthenticateUser(){
    /* create a login page with a button that redirects to the auth0 login page */
    
    const [user, setUser] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const handleOnClick = () => {
        console.log(user,password);
      };
    return(
        <div className="rounded">
        <img src='{logo}'></img>
        <input
          type="text"
          placeholder="username"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button disabled={!(user&&password)} onClick={handleOnClick}>
          test
        </button>
      </div>
      
    );
}
   

export default AuthenticateUser;