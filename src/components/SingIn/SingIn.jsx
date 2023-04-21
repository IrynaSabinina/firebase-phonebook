import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import { Toast } from 'react-toastify/dist/components';
// import { ToastContentProps } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import loginStyles from "../Login/LoginForm.module.css"

export const SingIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
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
