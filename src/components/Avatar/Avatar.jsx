
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { MDBFile } from 'mdb-react-ui-kit';
// import Compress from "compress.js";


export const Avatar =({friendName, uid})=>{
    const [avatar, setAvatar] = useState({
        image: undefined
      });
      
useEffect (()=>{
    if (!friendName) {setAvatar({image: undefined})}
}, [friendName]
)

      const onChangeImage = event => {
        console.log(event.target.files[0])
          setAvatar( () => ({
              image: event.target.files[0]
            }));
        }
        
        // const compress = new Compress()
        // async function resizeImageFn(file) {

        //     const resizedImage = await compress.compress([file], {
        //       size: 2, // the max size in MB, defaults to 2MB
        //       quality: 0.75, // the quality of the image, max is 1,
        //       maxWidth: 300, // the max width of the output image, defaults to 1920px
        //       maxHeight: 300, // the max height of the output image, defaults to 1920px
        //       resize: true // defaults to true, set false if you do not want to resize the image width and height
        //     }).then((data)=> {
        //     const img = data[0];
        //     const base64str = img.data
        //     const imgExt = img.ext
        //     const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
        //     console.log(resizedFiile)
        // }
        //     )
            
        //   }









    const storage = getStorage();


if (avatar.image !== undefined && friendName){


    const storageRef = ref(storage, `avatars/${uid}/${friendName}`);
    uploadBytesResumable(storageRef, avatar.image);

   
}
    



return <>
<MDBFile id='customFile' type="file" placeholder="load friend photo" defaultValue={undefined} onChange={ (e) => onChangeImage(e)}/>

</>

}





