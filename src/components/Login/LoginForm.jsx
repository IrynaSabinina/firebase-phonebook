import React, {useState} from 'react';
import {  signInAnonymously, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import styles from "./LoginForm.module.css"
import { toast } from 'react-toastify';
import { GoogleAuth } from '../GoogleAuth/GoogleAuth';
// import { An } from './An';


export const LoginForm =()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const onLogin = (e) => {
        e.preventDefault();

       
        if (email === "" || !email.includes("@")) {
            toast.error("Your email should includes symbol -@ ")
        }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            // console.log(user.uid);
            localStorage.userToken=user.accessToken
            localStorage.userUid=user.uid
           if(user){
            // const friends = getFriends(user.uid)
            navigate("/home")
           }
           
        })
        .catch((error) => {
            throw error 
            console.log("111")
            if(!error.message){
                console.loge("all is ok")
            } else{

                const errorMessage = error.message;
                toast.error(errorMessage)
                console.log("gjfgfjhjhj")
            }
        });
       
    }


  
 
    return(
        <>
            <main className={styles.dropBox}>        
                <section className={styles.registrationBox}>                                            
                        <h2> Please, login first</h2>                       
                                                       
                            <GoogleAuth/>
                        <form className={styles.formContainer}>  
                            <div className={styles.inputBox}>
                            
                                <label className={styles.formText}>
                                    Email address
                                <input className={styles.formInput}
                                    
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </label>
                            

                            {/* <div className={styles.inputRightBox}> */}
                                <label >
                                    Password
                                
                                <input className={styles.formInput}
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </label>
                            {/* </div> */}
                                                
                                    </div>                                            
                            <div>
                                <button   className={styles.lBtn}                                 
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>  
                            <div>
                                {/* <Link to="phonesingup">
                                <button className={styles.lBtn} type="submit"                              
                                    // onClick={onLogin}                                        
                                    >      
                                    Sing in with Phone                                                                  
                                </button>
                                    </Link> */}
                            </div>                                       
                        </form>
                        <p className="text-sm text-black text-center">
                            No account yet? -  
                            <NavLink to="/singin">
                                Sign in
                            </NavLink>
                        </p>
                        {/* <An/> */}
                        
                </section>
            </main>
        </>
    )
}