
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { MDBFile } from 'mdb-react-ui-kit';


export const Avatar =({friendName, uid})=>{
    const [avatar, setAvatar] = useState({
        image: undefined
      });
      
useEffect (()=>{
    if (!friendName) {setAvatar({image: undefined})}
}, [friendName]
)

      const onChangeImage = event => {
          setAvatar( () => ({
              image: event.target.files[0]
            }));
        }
        
       
    const storage = getStorage();


if (avatar.image !== undefined && friendName){


    const storageRef = ref(storage, `avatars/${uid}/${friendName}`);
    uploadBytesResumable(storageRef, avatar.image);

   
}
    



return <>
<MDBFile id='customFile' type="file" placeholder="load friend photo" defaultValue={undefined} onChange={ (e) => onChangeImage(e)}/>

</>

}





