import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../styles/login.css";
import swal from 'sweetalert'



export const Login = () => {
   
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate();




    


    //   FUNCION RESETEO INPUT

    const handleRegisterFormClick = () => {
        setEmail("");
        setPassword("");
    };

    // FUNCIÓN BOTON REGISTRO

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            swal("Please", "Fields cannot be empty", "warning", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
            return;
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            swal("Please", "enter a valid email address, mail can only contain letters numbers periods hyphens and the underscore", "error", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
            return;
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{4,8})/.test(password)) {
            swal("Please", "Password must be 4 to 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.", "error", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
            return;
        }

        let response = await actions.signup(email, password);

        // Condicional para ocultar menú register una vez realizado.

        if (response) {
            swal("Good job!", "successfully created user.", "success", {
                buttons: {
                    confirm: {
                        text: "OK",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });

            const chk = document.getElementById("chk");
            if (chk) {
                chk.checked = false;
            }
           
            setEmail("");
            setPassword("");
            
        } else {
            swal("Sorry", "An unexpected error has occurred", "error", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
        }
    };


    // FUNCIÓN BOTON LOGÍN

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            swal("Please", "Fields cannot be empty", "warning", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
            });
            return;
        }
        let response = await actions.login(email, password);
        if (response) {
            
            
            navigate("/private")
            setEmail("");
            setPassword("");


        } else {
            swal("Please", "Incorrect email or password", "warning", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
        }
    }


    return (
        <div className="login-main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input className="input" autoFocus type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} required="" onChange={(e) => setPassword(e.target.value)} />
                    
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    
                </form>
            </div>

            <div className="register">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true" onClick={handleRegisterFormClick}>Register</label>
                    <input className="input" type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} required="" onChange={(e) => setPassword(e.target.value)} />
                    <button className="login-button" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};