import "./login.css";

import React, {useState} from 'react'
import httpClient from "../../httpClient";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../helpers";
import { element } from "prop-types";

const Login = (props) => {
    const user = props.user;
    const setUser = props.setUser;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const [isSubmitted, setIsSubmitted] = useState(false);


    const navigate = useNavigate();

    // const setError = (element, message) => {
    //     const inputContainer = element.parentElement;
    //     const errorDisplay = inputContainer.querySelector('.error');

    //     errorDisplay.innerText = message;
    //     inputContainer.classList.add('error');
    //     inputContainer.classList.remove('success');
    // }

    // const setSuccess = element => {
    //     const inputContainer = element.parentElement;
    //     const errorDisplay = inputContainer.querySelector('.error');

    //     errorDisplay.innerText = '';
    //     inputContainer.classList.add('success');
    //     inputContainer.classList.remove('error');
    // }

    // const validateInputs = () => {
    //     const emailValue = email.value.trim();
    //     const passwordValue = password.value.trim();

    //     if(emailValue === '') {
    //         setError(email, 'Email is required');
    //     } else {
    //         setSuccess(email);
    //     }
    // }

    
    // const regex = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')

    // if(!email) {
    //     setEmailError("Please enter your email")
    // } else {
    //     setValidEmail(true)
    // }

    // if(!password) {
    //     setPasswordError("Please enter password")
    // } else {
    //     setValidPassword(true)
    // }

    const logInUser = async () => {
        const data = {
            email_address: email,
            password: password
        }

        if(email.length==0||password.length==0){
            setLoginError(true)
        } else { 
            httpClient.post('/login', data)
            .then(response => {
            getUser(setUser).then(r => {
                navigate("/home");
            })
            })
            .catch(error => {
            console.log(error.response.data);
            if (error.response && error.response.status === 401) {
                alert(error.response.data.msg);
            }
            });
        }

        // if (email === '' || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(String(email))){
        //     setLoginError({emailError: "Please enter your email"})
        // } else {
        //     setValidInput({validEmail: true})
        // }
        
        // if (password === ''){
        //     setLoginError({passwordError: "Please enter password"})
        // } else {
        //     setValidInput({validPassword})
        // }        

    };

    return (
        <div className='box'>
            <h1>LOGIN</h1>
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
                {loginError&&email.length<=0?
                <span className="error">Please enter an Email</span>:""}
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
                {loginError&&password.length<=0?
                <span className="error">Please enter a Password</span>:""}
            </div>
            <div className='button-container'>
                <button className='submit-button' onClick={() => {logInUser()}}>Submit</button>
            </div>
        <button className='link-button' onClick={() => {navigate('/register')}}>Don't have an account? Register here</button>
    </div>
    )
};

export default Login;