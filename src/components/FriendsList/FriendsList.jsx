
import { getStorage, ref, deleteObject } from "firebase/storage";

import { ContactItem } from "./ContactItem";
import { db } from "../../firebase";
import {  doc,deleteDoc } from "firebase/firestore"; 

export const FriendsList =({contacts, uid, getFriends})=>{
  const storage = getStorage();
  
  
  const handleDelete = async (name)=>{
    
    await deleteDoc(doc(db, `users/${uid}/friend`, name));
    const deletetRef = ref(storage, `avatars/${uid}/${name}`);
    deleteObject(deletetRef)
    getFriends(uid)
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
              uid={uid}
            />
            
            
            
          );
        }) : (<h3>your friends list empty  yeat! Add your first friend! :)</h3>)}
    </ul>
    
        </>

   
}