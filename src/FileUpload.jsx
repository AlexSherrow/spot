import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./firebaseConfig";

function FileUpload(props) {
    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file, e.target[1].value, e.target[2].value);
        props.setRefresh(true);
        };

    const uploadFiles = (file, name, artist) => {
            // State to store uploaded file
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on("state_changed", (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(prog + '%');
        }, (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
              const song={name, artist, url};
              //fetch("https://alexsherrowspotify.herokuapp.com/song/add",{
              fetch("http://localhost:8080/song/addSong",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(song)
            }).then(()=>{
              console.log("New song added");
              props.setRefresh(false);
            })

            const artistPost = {name: artist};
            console.log(artist);

            fetch("http://localhost:8080/artist/addArtist",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(artistPost)
          }).then(()=>{
            console.log("New artist added");
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
        </div>
      );

}
export default FileUpload;