import React  from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';


function Login() {
    const navigate = useNavigate();

    const handellogin = async () => {
       
        const email = document.getElementById("email").value;
        const createpassword = document.getElementById("createpassword").value;
        const postData = {
            email: email,
            createpassword: createpassword
        };

        try {
            const res = await fetch("http://localhost:3001/api/users/login", {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();
            console.log(result);

            if (result.logged_in) {
                localStorage.setItem("token", result.token);
                alert('Logged in');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        }
    };
    return (
        <div className={styles.main}>
    
                <div className={styles.about} onClick= {() => navigate("/about")} >
                    About
                </div>
            
            <div className={styles.cards}>
                <p className={styles.text}>Login</p>
                <div className={styles.password}>
                    <input id="email" type="text" placeholder="Email" />
                </div>
                <div className={styles.password}>
                    <input id="createpassword" type="password" placeholder="Password" />
                </div> 
                <div className={styles.login_button}>
                    <input type="submit" value="Register" onClick={handellogin} />
                </div>
            </div>

        </div>
    );

}


export default Login;
