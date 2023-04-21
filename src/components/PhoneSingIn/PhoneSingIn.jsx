import { auth } from "../../firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const PhoneSingIn = ()=> {
const [number, setNumber] = useState(null)
const [verCode, setVerCode] = useState(null)

auth.languageCode = 'it';


window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
window.recaptchaVerifier.render()

const appVerifier = window.recaptchaVerifier;


signInWithPhoneNumber(auth, number, appVerifier)
    .then((confirmationResult) => {
      confirmationResult.confirm(verCode).then((result) => {
     const user = result.user;
        console.log(user)
    }).catch((error) => {
      console.log(error.message)
     
    });
  })


    return <>
    <form> 

    <PhoneInput
    defaultCountry="PL"
    placeholder="Enter phone number"
    defaultValue={number}
    onChange={setNumber}/>
  
      <button type="submit"  >Send parol</button>
    </form>
    {/* <div
      id="recaptcha-container"
      class="justify-center flex"
 ></div>    */}
      <Link to="/">
        <button>Cancel</button>
      </Link>
      {/* <input type="number" onChange={setVerCode}/> */}
      {/* <button onClick={signInWithPhoneNumber}> */}
        {/* Send parol */}
      {/* </button> */}
    </>
}