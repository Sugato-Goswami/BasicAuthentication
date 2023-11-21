import { useEffect } from "react";
import React  from "react";
import { useNavigate } from "react-router-dom";
//import {Link} from "react-router-dom";


function Protected(props) {
    const{Component}=props
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate('/');
        }
    })
    
    return (
        <div>
            <Component />
        </div>
    );

}


export default Protected;
