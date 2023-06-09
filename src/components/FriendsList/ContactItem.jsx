import PropTypes from 'prop-types';
import { MDBBtn } from 'mdb-react-ui-kit';
import styles from './ContactIteam.module.css'
import { AvatarContact } from './avatarContact';



export const ContactItem = ({ id, name, number, uid, contactDelete }) => {
  return (
    <>
<li className={styles.contactItem}
    key={id}>
    <AvatarContact friendName={name} uid={uid}/>
    <h6> {name} : {number}</h6>

    <MDBBtn className='me-2' color='danger' onClick={() => contactDelete(name)}>
        Delete
      </MDBBtn>
    
</li>
    </>
)};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  contactDelete: PropTypes.func.isRequired,
};