// LoginForm.js
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import baseUrl from "../../config";
const Login = ({ handleLoginSuccess, handleUser, levels,userID }) => {
    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const ref = useRef();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { userId, password }; // Pass data as an object
        try {
            const response = await axios.post(`${baseUrl}/api/user/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                handleLoginSuccess();
                // Do something upon successful login
                alert("Welcome Back!, You have successfully Loged in.");
                handleUser(response.data.user.name);
                levels(response.data.user.levels);
                userID(response.data.user.userId);
                console.log(levels)
                setuserId("");
                setPassword("");
            } else {
                console.error(response.data.message); // Handle login error
                alert("UserName or password are invalid!");
                setuserId("");
                setPassword("");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Internal Server Error!");
        }
    };

    const handleClick = () => {
        setShow(!show)
        if (ref.current) {

            ref.current.type = show ? "password" : "text";
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
                            value={userId}
                            onChange={(e) => setuserId(e.target.value)}
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
                        <button type='submit' className='button bg-blue-500 text-white hover:bg-slate-400 flex items-center justify-center'>Login <CiLogin /></button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
