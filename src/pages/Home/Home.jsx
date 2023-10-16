
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged} from "firebase/auth";
import { auth, db } from '../../firebase';
import styles from "./Home.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/Header/Header';
import { collection, doc, setDoc, query, getDocs, updateDoc, deleteDoc, } from "firebase/firestore"; 
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { Footer } from '../../components/Footer/Footer';
import { Avatar } from '../../components/Avatar/Avatar';
import { getFriends } from '../../API/getFriends';

import { getStorage, ref, deleteObject } from "firebase/storage";

export const Home =({ myFriendsList}) =>{

 const [name, setName] = useState('')
 const uid = localStorage.getItem("userUid")
 const [friendNumber, setFriendNumber]=useState('')
 const [friendName, setFriendName] = useState('')

 const [myFriends, setMyFriends] = useState(myFriendsList)
 const storage = getStorage();
console.log(myFriends)
 useEffect(()=>{
 }, [myFriends])
   
useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
            if (user) {
             
             setName(user.email)
            
             } else {
              setName("")
             }
          });
         
    }, [])



 if(uid){
try{
  const users = doc(db, "users", uid);
 let myFriend = {
  name: {name},
  // plase : ["home"],
  // testfor:[1,2,3,4,]
 }
  setDoc(users, myFriend);

  
  }catch(e){
    toast.error(e.message)
  }
    }

 
   const adFriend = async ()=>{
    if(!friendName || !friendNumber) {
      toast.error("Please write phone number and friends name")
    }
if(uid){
  try {
const friend =  await doc(db, `users/${uid}/friend`, friendName);


  setDoc(friend, {
    name: friendName,
    phone:friendNumber,
    
       }); 
      //  setDoc(friend, {
      //  test: "mytest",
      //  focus: "for1234567890",
      //  erororor: [1, 1, 1, 1, 1, 1, 2]
        
      //      }); 

    // setDoc(friend, {
    //   name: friendName,
    //   phone:friendNumber,
      
    //      }); 
    //      setDoc(friend, {
    //      test: "mytest",
    //      focus: "for1234567890",
    //      erororor: [1, 1, 1, 1, 1, 1, 2]
          
    //          }); 
         
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
 setFriendNumber('')
 setFriendName('')
//  getFriends(uid)
//  setMyFriends( getFriends(uid))
await getFriends(uid).then(function(result) {
      return setMyFriends(result);
    })

   }

   const handleDelete = async (name)=>{
    
    await deleteDoc(doc(db, `users/${uid}/friend`, name));
    const deletetRef = ref(storage, `avatars/${uid}/${name}`);
    deleteObject(deletetRef)
    // console.log({uid})
    await getFriends(uid).then(function(result) {
      return setMyFriends(result);
    })
  }
// const getFriends = async () =>{
//   const friend =  await doc(db, `users/${uid}/friend`, friendName);
//   // console.log(friend)
//   const friendList = []

//   const q = query(collection(db, `users/${uid}/friend`));

//   const querySnapshot = await getDocs(q);
//   // console.log(querySnapshot)
//   querySnapshot.forEach((doc) => {
//     console.log(doc.data())

//     const friendIteam = {
//       name: (doc.data().name),
//       phone:(doc.data().phone),
//       // avatar:(doc.data().avatar)
//     }
  
//     friendList.push(friendIteam) 
//   });
//   setMyFriends(friendList)
//   console.log(friendList)
// }
//////////////////


// import { collection, doc, setDoc, query, getDocs, } from "firebase/firestore"; 

// {
//   "rules": {
//     ".read": "now < 1899898800000",  // March 16, 2030 14:40:00
//     ".write": "now < 1899898800000",  // March 16, 2030 14:40:00
//   }
// }




// getFriends(uid)



  return (
    <section className={styles.container}>        
<Header name = {name}/>

<nav>
   <h1 className={styles.text}>Welcome to your PhoneBook</h1>
  
  <div className={styles.inputBlock}>
    <MDBInput
    label='Enter Phone number'
    id='typePhone' 
    type="tel"
    value={friendNumber}
    onChange={(e)=>{
      {setFriendNumber(e.target.value)}}}/>

     <MDBInput
     id='form1'
     label="Enter name"
    // placeholder="Enter name"
    value={friendName}
    onChange={(e)=>{setFriendName(e.target.value)}}/>


<Avatar friendName={friendName} uid={uid}/>
<MDBBtn color='success' onClick={adFriend}>
Add contact
      </MDBBtn>
  
</div>


<div>
 <FriendsList contacts={myFriends} uid={uid} getFriends={getFriends} handleDelete={handleDelete} />

</div>
</nav>
<Footer uid={uid}/>
</section>
  )
}