
import { getStorage, ref, deleteObject } from "firebase/storage";
// import { collection, doc, setDoc } from "firebase/firestore"; 

import { ContactItem } from "./ContactItem";
import { db } from "../../firebase.js";
import {  doc, deleteDoc, arrayUnion, updateDoc, FieldValue, collection } from "firebase/firestore"; 
import { useEffect, useState } from "react";


export const FriendsList =({contacts, uid, getFriends, handleDelete})=>{
  // const [myFriends, setMyFriends] = useState(contacts)
  // const storage = getStorage();
  // useEffect(()=>{
  // }, [myFriends])

//  const addArrayItem = async () =>{
//   const washingtonRef = db.collection('numbers').doc('array');

// // Atomically add a new region to the "regions" array field.
//  await washingtonRef.update({
//   numbersArray: FieldValue.arrayUnion(300)
// });
// }
  


  // const handleDelete = async (name)=>{
    
  //   await deleteDoc(doc(db, `users/${uid}/friend`, name));
  //   const deletetRef = ref(storage, `avatars/${uid}/${name}`);
  //   deleteObject(deletetRef)
  //   // console.log({uid})
  //   await getFriends(uid).then(function(result) {
  //     return setMyFriends(result);
  //   })
  // }
  // getFriends(uid)
    return <>
    
    <ul key={uid}>

{contacts? contacts.map((friend, index) => {

          return (
    
           <ContactItem
              key={index}
              id={friend.phone}
              name={friend.name}
              number={friend.phone}
              contactDelete={handleDelete}
              uid={uid}
            />
            
            
            
          );
        }) : (<h3>your friends list empty  yeat! Add your first friend! :</h3>)}
    </ul>
    {/* <button type="button" onClick={addArrayItem}>add item to array</button> */}
    
        </>

   
}