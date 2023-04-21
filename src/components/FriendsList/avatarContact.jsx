import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import styles from "./ContactIteam.module.css"
// import { toast } from "react-toastify";

export const AvatarContact =({uid,friendName})=>{
const [avatarUrl, seAvatarUrl]=useState('')
useEffect(()=>{
    
    const storage = getStorage()
    const avatarRef = ref(storage, `avatars/${uid}/${friendName}`);
        getDownloadURL(avatarRef)
        .then((url) => {
            if(url){

                seAvatarUrl(url)
            }
        })
        .catch((error) => {
            seAvatarUrl("https://firebasestorage.googleapis.com/v0/b/hello-test-16984.appspot.com/o/avatars%2Funknown-512.webp?alt=media&token=25fa8c7f-c55a-4b2e-97da-3929fab699f2")
        });
}, [uid,friendName])

return <>
<div>
<img className={styles.avatarContact} src={avatarUrl} alt="sorry something wrong" width='35px' height="35px"/>
    </div></>
}

