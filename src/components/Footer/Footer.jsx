import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

export const Footer =()=>{
    return <>
    <div className={styles.footer}>
    <Link to="team">
    developer
            </Link>
    </div>
    </>
}