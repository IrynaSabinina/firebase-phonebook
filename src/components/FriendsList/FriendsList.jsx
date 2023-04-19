import { useEffect, useState } from "react";
import { ContactItem } from "./ContactItem";
import { db } from "../../firebase";
import { collection, addDoc, doc, updateDoc, setDoc, getDoc, query, getDocs, deleteDoc } from "firebase/firestore"; 

export const FriendsList =({contacts, uid})=>{

const handleDelete = async (name)=>{
   
    await deleteDoc(doc(db, `users/${uid}/friend`, name));
  }
    return <>
    <ul key={uid}>

{contacts[0]? contacts.map((friend, index) => {

          return (
    
           <ContactItem
              key={index}
              id={friend.phone}
              name={friend.name}
              number={friend.phone}
              contactDelete={handleDelete}
            />
            
            
            
          );
        }) : (<h3>your friends list empty  yeat! Add your first friend! :)</h3>)}
    </ul>
    
        </>

   
}