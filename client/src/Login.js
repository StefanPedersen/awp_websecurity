import React, { useState } from 'react';
import createUser from "./App.js";

function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = props.users

  function handleLogin() {
    //users = props.users
    props.login(username, password);
    console.log(users);
  }

  
  return (
    <>
      <h3>Login</h3>
      <input onChange={(event) => setUsername(event.target.value)}
        name="username" type="text" placeholder="username"></input><br />
      <input onChange={(event) => setPassword(event.target.value)}
        name="password" type="password" placeholder="password"></input><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={createUser}>Create User</button>
    </>
  );
}

export default Login;
