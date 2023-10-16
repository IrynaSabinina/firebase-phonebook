import React, {useState} from 'react';

import { useEffect } from 'react';

import { Home } from '../Home/Home';
import {LoginForm} from "../../components/Login/LoginForm"
import { FieldValue, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';



export const RegistrationPage =()=>{


 
  const [loged, setLoged] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("userUid")){
      setLoged(true)
      } else {setLoged(false)
      }
      
  },[loged])
  // const washingtonRef = doc(db, "numbers", "array");

  // const arrayValue =async() =>{
  //   const docSnap = await getDoc(washingtonRef);
  
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data().numbersArray);
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }


  // Array add same items
//   const addArrayItem = async () =>{
//   await updateDoc(washingtonRef, {
//     numbersArray: arrayUnion("1", "2", "3", "4")

    
// });

  // }

  // arrayValue()

  // const docRef = doc(db, "numbers", "array");
// const docSnap = await getDoc(docRef);




  // Firebase.firestore().collection("users/gGfShU50P4MF1gE0L5aHo9SFS0h2/stables").get()



  // const getCollectionQuery = async() => {
  //   console.log('here')
  //   const q = query(collection(db, "users/gGfShU50P4MF1gE0L5aHo9SFS0h2/stables"));
  //   console.log(q)
  
  //   const querySnapshot = await getDocs(q);
  // console.log(querySnapshot)
  
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id)
  //   })
  // }
  // getCollectionQuery()







  
    return <>
{loged? <Home/> : <LoginForm/> }
{/* <button type="button" onClick={addArrayItem}>add item to array</button> */}
     
    </>
    
}