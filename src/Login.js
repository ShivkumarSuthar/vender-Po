// LoginForm.js
import React, { useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = ({ handleLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const ref=useRef();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                handleLoginSuccess();
                // Do something upon successful login
                alert("Welcome Back!, You have successfully Loged in.")
                setUsername("");
                setPassword("");
            } else {
                console.error(data.message); // Handle login error
                alert("UserName or password are invalid!")
                setUsername("");
                setPassword("")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleClick = () => {
        setShow(!   show)
        if(ref.current){

            ref.current.type = show ?"password" :"text"; 
        }

    }

    return (
        <section className='body'>

            <div className="wrapper">
                <div className="heading">
                    <h2>Welcome!</h2>
                    <p className='p'>Log In to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="username"
                            className="input-field bg-slate-100"
                            placeholder='UserName'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            value={password}
                            ref={ref}
                            className="input-field relative"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className='text-black absolute pt-[15px] text-[20px] ml-[-30px] cursor-pointer' onClick={handleClick}>{show ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>


                    <div className="input-group">
                        <button type='submit' className='button bg-blue-500 text-white hover:bg-slate-400'>Login <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
