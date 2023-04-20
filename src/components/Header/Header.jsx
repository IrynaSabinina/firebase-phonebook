import PropTypes from 'prop-types';
import styles from "./Header.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

export const Header = ({name})=>{
    const navigate = useNavigate();
    const handleLogout = () => {               
        signOut(auth).then(() => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("userUid")
        localStorage.removeItem("userEmail")
        // setMyFriends([])
        // setUid('')
        navigate("/");
        toast.success("Loged out successfully")
            }).catch((error) => {
            toast.error(error.message)
            });
        }

    return (
        <>

         <div className={styles.header}>
         <button onClick={handleLogout} className={styles.outBtn}>
    Logout
    </button>
   <p className={styles.headerText}>
            Helo my friend! - 
            <span className={styles.name}>  {name}</span>
            </p>
    
            {/* <Link to="/statistics">Statistics</Link> */}
            </div></>
    )
}

Header.propTypes = {
    name: PropTypes.string,
  };