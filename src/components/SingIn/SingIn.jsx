import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import reCAPTCHA from "react-google-recaptcha"
import Reaptcha from 'reaptcha';

import { auth } from "../../firebase";

import "react-toastify/dist/ReactToastify.css";
import loginStyles from "../Login/LoginForm.module.css"

export const SingIn = () => {
  // const captchaRef = useRef(null)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const token = captchaRef.current.getValue();
  const [captchaToken, setCaptchaToken] = useState(null);
const captchaRef = useRef(null);

  
  const onSubmit = async (e) => {
    e.preventDefault();

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
  };

  const verify = () =>{
    captchaRef.current.getResponse().then(res => {
        setCaptchaToken(res)
    })

}

  return (
    <main className={loginStyles.dropBox}>        
    <section className={loginStyles.registrationBox}>  
        <h1> Registration </h1>
        <form>
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
<Reaptcha sitekey="6LeCwLwlAAAAAL5xIA78yiIe4iTf7VyYYvFjT99W" ref={captchaRef} onVerify={verify} />
          <button className={loginStyles.lBtn} type="submit" onClick={onSubmit}>
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
