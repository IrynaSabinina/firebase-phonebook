import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'


export const GoogleAuth =()=>{
    const [userLog, setUserLog] = useState(false)
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();
    const GoogleSingin = async ()=>{
        await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          navigate("/home");
          setUserLog(true)
          localStorage.userUid=user.uid
          console.log(user.uid)
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
       
    }
    
return <>
<GoogleButton
  onClick={GoogleSingin}
/>
</>

}