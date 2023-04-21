
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged} from "firebase/auth";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, db } from '../../firebase';
// import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/Header/Header';
import { collection, doc, setDoc, query, getDocs, } from "firebase/firestore"; 
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

import PhoneInput from 'react-phone-number-input';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { Footer } from '../../components/Footer/Footer';
import { Avatar } from '../../components/Avatar/Avatar';


export const Home =() =>{
// const navigate = useNavigate();
 const [name, setName] = useState('')
 const uid = localStorage.getItem("userUid")
 const [friendNumber, setFriendNumber]=useState('')
 const [friendName, setFriendName] = useState('')

 const [myFriends, setMyFriends] = useState([])

 useEffect(()=>{
  const contacts = getFriends(uid)

setMyFriends(contacts)
 }, [uid])
   
useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
            if (user) {
             
             setName(user.email)
            
             } else {
              setName("")
             }
          });
         
    }, [myFriends])



 if(uid){
try{
  const users = doc(db, "users", uid);
    setDoc(users, {
      name: {name}});
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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
 setFriendNumber('')
 setFriendName('')
 getFriends(uid)
//  setAvatar('')
//  console.log(avatar)

   }

const getFriends = async () =>{
  const friendList = []

  const q = query(collection(db, `users/${uid}/friend`));

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {

    const friendIteam = {
      name: (doc.data().name),
      phone:(doc.data().phone),
      // avatar:(doc.data().avatar)
    }
  
    friendList.push(friendIteam) 
  });
  setMyFriends(friendList)
}

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
    type='tel'
    value={friendNumber}
    onChange={setFriendNumber}/>
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
 <FriendsList contacts={myFriends} uid={uid} getFriends={getFriends} />

</div>
</nav>
<Footer/>
</section>
  )
}