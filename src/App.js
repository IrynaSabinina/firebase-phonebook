
import { Navigate, BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Gallery } from './components/Gallery/Gallery';
import { SingIn } from './components/SingIn/SingIn';
import {  RegistrationPage } from './pages/LogIn/LogInPage';
import './App.css';
import { Home } from './pages/Home/Home';

import { useEffect, useState } from 'react';
import { getFriends } from './API/getFriends';
import { db } from './firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
// import { getFriends } from '../../API/getFriends';

function App() {
  const [uid, setUid] = useState("")
  const [myFriends, setMyFriends] = useState([])
  // useState(getFriends(uid).then(async function(result) {
  //   return setMyFriends(result);
  // }))
  const [email, setEmail] = useState("test")
  console.log(myFriends)
  // const [myFriends, setMyFriends] = useState(getFriends(uid).then(function(result) {
  //   return setMyFriends(result);
  // }))
// console.log(myFriends)
  // useEffect(()=>{
  //   for (let i=0; i<1000; i++){
  //     setDoc(doc(db, "cities", `${i}`), {
  //       name: "Los Angeles",
  //       state: "CA",
  //       country: "USA"
  //     });
      // const docReads = doc(db, "docReads");
      // // console.log(i)
  //     // setDoc(docReads,"2")
  //   }
  // },[])
  useEffect(()=>{
    
    setUid(localStorage.getItem("userUid"))
    getFriends(uid).then(function(result) {
        return setMyFriends(result);
      })
    // setMyFriends(getFriends(uid))
    
    
  }, [uid])


  return (

    <Router>
    <div>
      <section>                              
          <Routes> 
          <Route path="/" element={<RegistrationPage/>}/>  
          {/* <Route path="/phonesingup" element={<PhoneSingIn/>}/>                                   */}
             <Route path="/singin" element={<SingIn/>}/>
             <Route path="/home" element={<Home myFriendsList={myFriends}/>}/>
              <Route path="/team" element={<Gallery uid={uid} email={email}/>}/>
             <Route path="*" element={<Navigate to="/" replace />} />
          </Routes> 
                            
      </section>
      <ToastContainer/>
    </div>
  </Router>
  );
}

export default App;
