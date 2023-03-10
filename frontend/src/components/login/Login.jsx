import React, {useState} from 'react'
import httpClient from "../../httpClient";
import {useNavigate} from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    //temp database account info
    const database = [
      {
        email: "email1",
        password: "password1"
      }
    ];

    const errors = [
      {
        email: "invalid email",
        password: "invalid password"
      }
    ]

    const navigate = useNavigate();

    const logInUser = async (event) => {
        console.log(email, password);
        event.preventDefault();

        // var { email, password } = document.forms[0];
        try {
            //TODO: check if email and password are viable
            // checks if input fields are empty
            // if ((email.trim() == "") || (password.trim() == "")) {
            //   alert("Please fill in all input fields");
            // } else {
            
            // if (email.value != database.email){
            //   setLoginError({ name: "email", message: errors.email});
            // } else if (password.value != database.password){
            //   setLoginError({ name: "password", message: errors.password});
            // } else {
              const resp = await httpClient.post("//localhost:5000/login", {
                  email,
                  password,
              });
              navigate("/home")
            // }
            // }

        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }
    };

    return (
        <div className='box'>
            <h1>Login</h1>
            <form className="login-form" onSubmit={logInUser}>
                <div className='input-container'>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        placeholder="youremail@gmail.com"
                        required
                    />
                </div>
                <div className='input-container'>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        placeholder="********"
                        required
                    />
                </div>
                <div className='button-container'>
                  <button type="submit">
                      Submit
                  </button>
                </div>
            </form>
            <button className='link-button' onClick={() => {navigate('/register')}}>Don't have an account? Register here</button>
        </div>
    )
};

export default Login;