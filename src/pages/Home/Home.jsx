
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/Header/Header';
import { collection, doc, setDoc, query, getDocs, } from "firebase/firestore"; 
import { MDBBtn } from 'mdb-react-ui-kit';

import PhoneInput from 'react-phone-number-input';
import { FriendsList } from '../../components/FriendsList/FriendsList';
import { Footer } from '../../components/Footer/Footer';
// import { Header } from '../../components/Navigation/Navigation';

export const Home =() =>{
    const navigate = useNavigate();
 const [name, setName] = useState('')
 const [uid, setUid] = useState(localStorage.getItem("userUid"))
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
             const uid = user.uid;
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
console.log(e.message)
      }
    }

const handleLogout = () => {               
    signOut(auth).then(() => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userUid")
    localStorage.removeItem("userEmail")
    setMyFriends([])
    setUid('')
    navigate("/");
    toast.success("Loged out successfully")
        }).catch((error) => {
        
        });
    }

   const adFriend = async ()=>{
if(uid){
  try {
const friend =  await doc(db, `users/${uid}/friend`, friendName);
    
    setDoc(friend, {
      name: friendName,
      phone:friendNumber
         });
    

    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
 setFriendNumber('')
 setFriendName('')
   }

const getFriends = async () =>{
  const friendList = []

  const q = query(collection(db, `users/${uid}/friend`));

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {

    const friendIteam = {
      name: (doc.data().name),
      phone:(doc.data().phone)
    }
  
    friendList.push(friendIteam)
  
   
  });
  setMyFriends(friendList)
}

getFriends(uid)



  return (
    <section className={styles.container}>        
<Header name = {name}/>

<nav>
   <h1>Welcome to your PhoneBook</h1>
  
  <div>
<button onClick={handleLogout} className={styles.outBtn}>
    Logout
    </button>
    <PhoneInput
    defaultCountry="PL"
    placeholder="Enter phone number"
    value={friendNumber}
    onChange={setFriendNumber}/>
     <input
    // type="text"
    placeholder="Enter name"
    value={friendName}
    onChange={(e)=>{setFriendName(e.target.value)}}/>


<MDBBtn color='success' onClick={adFriend}>
Add contact
      </MDBBtn>
  
</div>

{/* <MDBBtn outline color='warning' onClick={getFriends()}>
update friend list
      </MDBBtn> */}

<div>
 <FriendsList contacts={myFriends} uid={uid}/>

</div>
</nav>
<Footer/>
</section>
  )
}