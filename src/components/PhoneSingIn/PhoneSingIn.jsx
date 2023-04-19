import { auth } from "../../firebase";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithPhoneNumber } from "firebase/auth";
// import { toast } from "react-toastify";

export const PhoneSingIn = ()=> {
const [number, setNumber] = useState("")
const [verCode, setVerCode] = useState("")

// const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
// recaptchaVerifier.render()
const recaptchaVerifierconnt = new RecaptchaVerifier('recaptcha-container', {}, auth);
const appVerifier = recaptchaVerifierconnt();
signInWithPhoneNumber(auth, number, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log("Success")
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
    return <>
    <form> 

    <PhoneInput
    defaultCountry="PL"
    placeholder="Enter phone number"
    value={number}
    onChange={setNumber}/>
  
      <button type="submit"  >Send parol</button>
    </form>

      <Link to="/">
        <button>Cancel</button>
      </Link>
      <input type="number" onChange={setVerCode}/>
      <button onClick={signInWithPhoneNumber}>
        Send parol
      </button>
    </>
}