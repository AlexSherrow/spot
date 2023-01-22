import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StatusBar } from "./Footer/StatusBar";
import { Sound, getCurrentSongName, start, pause, play, restart } from "./Sound";

export function SongList() {
  const [songName, setSongName] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {fetch("http://localhost:8080/song/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result);
    result = JSON.stringify(result);
    result = JSON.parse(result);
    const loadedSongs = [];

    for(const key in result)
    {
      loadedSongs.push({
        id: result[key].id,
        name: result[key].name,
        artist: result[key].artist,
        url: result[key].url
      });
    }

    let songList = [];
    loadedSongs.forEach((song,index)=>{
    console.log(song);
    songList.push(<Sound key = {song.id} path = {song.url} name = {song.name} artist = {song.artist} setSongName = {setSongName} setArtistName = {setArtistName}/>)
    })
    setSongs(songList);
    setIsLoading(false);
  }
)
},[]);

  if (isLoading) {
    return (
      <SpinnerLoading/>
    )
  }
    return (
    <>
    {songs}
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
  for(let i = 0; i < songs.length; i++)
  {
    if(songs[i].props.name === getCurrentSongName())
    {
      restart();
      if(i === songs.length - 1)
      start(songs[0].props);
      else
      start(songs[i + 1].props);
      break;
    }
  }
}

function getPreviousSong() 
{
  for(let i = 0; i < songs.length; i++)
  {
    if(songs[i].props.name === getCurrentSongName())
    {
      restart();
      if(i === 0)
      start(songs[songs.length - 1].props);
      else
      start(songs[i - 1].props);
      break;
    }
  }
}

};
