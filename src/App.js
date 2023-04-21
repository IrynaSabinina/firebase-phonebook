
import { Navigate, BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Gallery } from './components/Gallery/Gallery';
import { SingIn } from './components/SingIn/SingIn';
import {  RegistrationPage } from './pages/LogIn/LogInPage';
import './App.css';
import { Home } from './pages/Home/Home';
import { PhoneSingIn, PhoneSingUp } from './components/PhoneSingIn/PhoneSingIn';
import { useEffect, useState } from 'react';
import { getFriends } from './API/getFriends';

function App() {
  const [uid, setUid] = useState("")
  const [myFriends, setMyFriends] = useState([])
  useEffect(()=>{
   
    setUid(localStorage.getItem("userUid"))
   setMyFriends(getFriends(uid))
   

 }, [uid ])
 
  return (

    <Router>
    <div>
      <section>                              
          <Routes> 
          <Route path="/" element={<RegistrationPage/>}/>  
          {/* <Route path="/phonesingup" element={<PhoneSingIn/>}/>                                   */}
             <Route path="/singin" element={<SingIn/>}/>
             <Route path="/home" element={<Home myFriends={myFriends}/>}/>
              <Route path="/team" element={<Gallery/>}/>
             <Route path="*" element={<Navigate to="/" replace />} />
          </Routes> 
                            
      </section>
      <ToastContainer/>
    </div>
  </Router>
  );
}

export default App;
