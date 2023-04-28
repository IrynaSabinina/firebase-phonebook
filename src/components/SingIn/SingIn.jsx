import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "react-toastify/dist/ReactToastify.css";
import loginStyles from "../Login/LoginForm.module.css"
// import reCAPTCHA from "react-google-recaptcha"
import { toast } from "react-toastify";
import Reaptcha from 'reaptcha';

export const SingIn = () => {
  const RECAPCHA_SITE_KEY = "6LfJycAlAAAAAHM7_A3ytVCUOt6qRvW-V-5_5o2c"
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);



  const verify = () =>{
    captchaRef.current.getResponse().then(res => {
        setCaptchaToken(res)
    })

}
  
  const onSubmit = async (e) => {
    e.preventDefault();
if(captchaToken){

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user.id);
      localStorage.userUid = user.uid;
      localStorage.userEmail = user.email;
        navigate("/home");
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
} else {
  toast.error("you are robot :)")
}
  };


// console.log(RECAPCHA_SITE_KEY)


  return (
    <main className={loginStyles.dropBox}>        
    <section className={loginStyles.registrationBox}>  
        <h1> Registration </h1>
        <form onSubmit={onSubmit}> 
        <div className={loginStyles.inputBox}>
          <div>
            <label>
              Email address
              <input className={loginStyles.formInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </label>
          </div>

          <div>
            <label>
              Password
              <input className={loginStyles.formInput}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
          </div>
</div>

<Reaptcha 
       sitekey={ RECAPCHA_SITE_KEY}
       ref={captchaRef}
       onVerify={verify} 
      ></Reaptcha>






          <button className={loginStyles.lBtn} type="submit" >
            Sign in
          </button>
        </form>

        <p>
          Already have an account? <NavLink to="/">Login</NavLink>
        </p>
      </section>
    </main>
  );
};
