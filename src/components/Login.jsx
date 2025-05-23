// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { forms, loginUser } from './API';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        if (email && password ) {
            const {success, user} = loginUser(email,password)
            if(success){
                localStorage.setItem("USER", JSON.stringify(user));
                if(!JSON.parse(localStorage.getItem("FORMS"))){
                    localStorage.setItem("FORMS", JSON.stringify(forms));
                }
                if(!JSON.parse(localStorage.getItem("RESPONSES"))){
                    localStorage.setItem("RESPONSES", JSON.stringify([]));
                }
                navigate("/");
            }else{
                setError("Invalid email or password")
            }
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
