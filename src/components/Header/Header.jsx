import PropTypes from 'prop-types';
import styles from "./Header.module.css"
import { Link } from 'react-router-dom';

export const Header = ({name})=>{

    return (
        <>

         <div className={styles.header}>
            <p className={styles.headerText}>
            Helo my friend! {name}
            </p>
            {/* <Link to="/statistics">Statistics</Link> */}
            </div></>
    )
}

Header.propTypes = {
    name: PropTypes.string,
  };