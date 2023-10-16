
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Gallery.module.css"
import { MDBBtn } from "mdb-react-ui-kit";

import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase";



export const Gallery = ({uid, email}) =>{
    const [myUrl, setMyUrl] = useState('')
    const firebaseApp = getApp()
    const storage = getStorage()
    const starsRef = ref(storage, 'my logo/photo_2023-03-27 11.48.41.jpeg');
    
    getDownloadURL(starsRef)
  .then((url) => {
setMyUrl(url)
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
toast.message("not found, try again")
        break;
      case 'storage/unauthorized':
        toast.message("sorry, you should sing in first")
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });

async function addOnclick(){
  const fakepath = "dhsgjdhsgdjhsd/jhabdhadjhajsdha444444444"
  // let newuid=toString(uid)
  await setDoc(doc(db, fakepath), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
  

  }
  
//   console.loge(myUrl)
    
    // const gallery = 'hello-test-16984.appspot.com/my logo/photo_2023-03-27 11.48.41.jpeg'
    return (<>
    <div className={styles.container}>

<h3> Your developer</h3>
<img className={styles.imgDeveloper} src={myUrl} alt="sorry something wrong" />
<h4> thank you for using Phonebook
</h4>
<button
type="button" onClick={addOnclick}>
add collection
</button>

<Link to="/home">

<MDBBtn type="button" color='warning'>Back home</MDBBtn>


</Link>
    </div>
 </>)
}