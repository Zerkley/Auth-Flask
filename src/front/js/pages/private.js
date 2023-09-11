import React from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () =>{

    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    }
return(

<div>
    <h1>Private Page</h1>
    <button onClick={()=>{handleLogout()}}>Logout</button>
</div>
)}