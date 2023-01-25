import { initializeApp } from "firebase/app";
import { useEffect, useState, useRef } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StatusBar } from "./Footer/StatusBar";
import { Sound, getCurrentSongName, start, pause, play, restart } from "./Sound";

export function SongList() {
  const [songName, setSongName] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [songsList, setSongsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //fetch("http://localhost:8080/song/getAll")
    fetch("https://alexsherrowspotify.herokuapp.com/song/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setIsLoading(true);
    result = JSON.stringify(result);
    result = JSON.parse(result);

    for(const key in result)
    {
      songsList.push(
      <Sound key = {result[key].id}
      path = {result[key].url}
      name = {result[key].name}
      artist = {result[key].artist}
      setSongName = {setSongName}
      setArtistName = {setArtistName}/>);
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
    artistName={artistName}/>
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