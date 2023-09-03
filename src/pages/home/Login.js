import React from 'react';
import "./login.scss"
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import { FunctionContext } from '../../context/functionContext';

const Login = () => {
  const {emailAdmin,PasswordAdmin } =useContext(FunctionContext);
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setErrorMessage]= useState("");
  const navigate = useNavigate();

  const handleLogin =(e) => {
    e.preventDefault()
    console.log(emailAdmin ,"check");
    console.log(email ,"email")
    console.log( password,"password")
    console.log(emailAdmin ,"adminEmail" );
    console.log(PasswordAdmin,"adminPassword")
    if (  email === emailAdmin  &&  password  === PasswordAdmin ) {
      setErrorMessage('');
      navigate("/home")
    } else {
      setErrorMessage('Invalid email or password.');
      console.log("there is error ")
    }
  };
  return (
    <div className='login-page'>
       <div className='errorr'>
       { error && <p> {error}</p>}
      </div>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
    <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password"  value={password}  onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit" >Log In</button>
    </form>
    </div>
  )
}

export default Login
