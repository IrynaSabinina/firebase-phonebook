import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export const getFriends = async (uid) =>{
    const friendList = []
  
    const q = query(collection(db, `users/${uid}/friend`));
  
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
  
      const friendIteam = {
        name: (doc.data().name),
        phone:(doc.data().phone),
        avatar:(doc.data().avatar)
      }
    
      friendList.push(friendIteam)
    
     
    });
    
    return friendList
  }
