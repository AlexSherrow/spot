import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import storage from "./firebaseConfig";

function FileUpload() {
    const [progress, setProgress] = useState(0);
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file, e.target[1].value, e.target[2].value)
        };

    const uploadFiles = (file, name, artist) => {
            // State to store uploaded file
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on("state_changed", (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
        }, (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
              console.log(url);
              const song={name, artist, url};
              fetch("http://localhost:8080/song/add",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(song)
            }).then(()=>{
              console.log("New song added")
            })
            });

        } );
      }
      return(
        <div className="App">
            <form onSubmit={formHandler}>
                <input type="file" className="file"/>
                <input type="text" name="songName" defaultValue='Song Name'/>
                <input type="text" name="artistName" defaultValue='Artist Name'/>
                <button type="submit">Upload</button>
            </form>
            <hr/>
            <h3>Uploaded {progress} %</h3>
        </div>
      );

}
export default FileUpload;