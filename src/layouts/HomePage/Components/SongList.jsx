import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StatusBar } from "./Footer/StatusBar";
import { Sound, getCurrentSongName, start, pause, play, restart } from "./Sound";

export function SongList(props) {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [songsList, setSongsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    //let devURL = "http://localhost:8080";
    let devURL = "https://alexsherrowspotify.herokuapp.com"
    let mainPath = '';

    if(props.path.includes('/album/'))
    mainPath = "/song/getAllSongsByAlbum?albumName=" + props.path.replace("/album/", "");
    else if(props.path.includes('/artist/'))
    mainPath = "/song/getAllSongsByArtist?artistName=" + props.path.replace("/artist/", "");
    else
    mainPath = "/song/getAllSongs";

    fetch(devURL + mainPath,
    {
      method:"GET",
      headers:{"Content-Type":"application/json"},
    }
    )
  .then(res=>res.json())
  .then((result)=>{
    setIsLoading(true);
    result = JSON.stringify(result);
    result = JSON.parse(result);
    console.log(result);
    for(const key in result)
    {
      songsList.push(
      <Sound key = {result[key].id}
      path = {result[key].url}
      name = {result[key].name}
      artist = {result[key].artist}
      album = {result[key].album}
      setSongName = {setSongName}
      setArtistName = {setArtistName}
      setAlbumName = {setAlbumName}/>);
    }
    setSongsList(songsList);
    setIsLoading(false);
  }
)
}, [songsList]);

  if (isLoading) {
    return (
      <SpinnerLoading/>
    )
  }
    return (
    <>
    {songsList}
    <div>
    <StatusBar
    songName={songName} 
    artistName={artistName}
    albumName = {albumName}
    />
    <PreviousButton setSongName = {setSongName} setArtistName = {setArtistName}/>
    <PauseButton/>
    <PlayButton/>
    <NextButton setSongName = {setSongName} setArtistName = {setArtistName}/>
    </div>
    </>
    );

    
     function NextButton() {
      return <button onClick={handleNextButtonClick}>Next</button>;
    }
    
    function handleNextButtonClick() {
      getNextSong();
    }

    function PauseButton() {
      return (
          <button onClick={handlePauseButton}>Pause</button>
      );
    }
    
    function handlePauseButton() {
          pause();
    }

    function PlayButton() {
      return (
          <button onClick={handlePlayButton}>Play</button>
      );
    }
    
    function handlePlayButton() {
        play();
        initializeApp();
    }

    function PreviousButton() {
      return <button onClick={handlePreviousButtonClick}>Prev</button>;
    }
    
    function handlePreviousButtonClick() {
      getPreviousSong();
    }

    function getNextSong() 
{
  for(let i = 0; i < songsList.length; i++)
  {
    if(songsList[i].props.name === getCurrentSongName())
    {
      restart();
      if(i === songsList.length - 1)
      start(songsList[0].props);
      else
      start(songsList[i + 1].props);
      break;
    }
  }
}

function getPreviousSong() 
{
  for(let i = 0; i < songsList.length; i++)
  {
    if(songsList[i].props.name === getCurrentSongName())
    {
      restart();
      if(i === 0)
      start(songsList[songsList.length - 1].props);
      else
      start(songsList[i - 1].props);
      break;
    }
  }
}

}