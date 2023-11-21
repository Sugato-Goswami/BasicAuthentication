import React from "react";
import styles from './Registration.module.css';
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate= useNavigate();
    const handelRegister = async () => {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirmpassword").value;

        if(password!==confirmpassword){
            document.getElementById("error_message").innerText = "Password does not match";
            return;
        }
        const userData = {
            first_name:firstname,
            last_name:lastname,
            email:email,
            createpassword:password,
            confirmpassword:confirmpassword,
            
        };
        console.log(JSON.stringify(userData));
        try{
              await fetch('http://localhost:3001/api/users',{
                method:'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) =>{
                if(response.status===200){
                    alert("Registration Successfull");
                }else{
                    alert("Registrtion Failed");
                }
                console.log(response);
               return response.json()

            })
             
            // Displaying results to console
            .then(json => console.log(json));;
            
             
            
        }
        catch(error){
            console.error('Error while Registration',error);

        }

    };
    return (
        <div className={styles.main}>
        <button className={styles.logins} onClick= {() => navigate("/Login")}>Login</button>
            <div className={styles.card}>
                <div className={styles.titlearea}>
                    <div className={styles.title}>Register</div>
                    <p className={styles.text}>Stay updated on your professional world</p>
                </div>
                <div className={styles.email}>
                    <input id="firstname" type="text"  placeholder="FirstName" />
                </div>
                <div className={styles.password}>
                    <input id="lastname" type="text" placeholder="LastName" />
                    
                </div>  
                <div className={styles.password}>
                    <input id="email" type="text" placeholder="email" />
                    
                </div>
                <div className={styles.password}>
                    <input id="password" type="password" placeholder="Create Password" />
                    <div className={styles.show}>Show</div>
                </div> 
                <div className={styles.password}>
                    <input id="confirmpassword" type="password" placeholder="Confirm Password" />
                    <div className={styles.show}>Show</div>
                </div>              
                
                <div className={styles.login_button}>
                    <input type="submit" value="Register" onClick={handelRegister} />
                </div>
                <div id="error_message" className={styles.error_message}></div>
                

                
            </div>
           
        </div>
    );
}



export default Registration;
