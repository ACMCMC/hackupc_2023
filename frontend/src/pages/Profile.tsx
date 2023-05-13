import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  var { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
/*
  isAuthenticated = true;
  user = {
    name: "abc",
    email: "hdkeurh",
    picture: "fhkreyhfgki"
  }
*/
  return (
    //returns boolean - return component 
    <>
    {isAuthenticated && (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )}
    </>
  );
};

export default Profile;