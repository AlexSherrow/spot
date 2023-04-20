import React, { useState } from "react";
import './Sound.css';

let currentAudio;
let currentSongName;
// let devURL = "http://localhost:8080";
// let devURL2 = "http://localhost:3000";

let devURL = "http://www.soundslounge.com/"
let devURL2 = "http://www.soundslounge.com/"


    export function Sound(props) {
    const [background, setBackground] = useState('white');
    let [textColor, setTextColor] = useState('black');
    let [style, setStyle]  = useState({
      background: background,
      color: textColor
    });

    return (      
      <div
        onClick={handleSongClick}
      > 
  
        <div class = 'left'
        style={style}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        >{props.name} </div>

        <div class = 'left'
        style={style}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        >
        <a href= {devURL2 + '/album/' + props.album}>{props.album}</a>
        </div>

        <div class = 'left'
        style={style}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        >
        <a href= {devURL2 + '/artist/' + props.artist}>{props.artist}</a>        
        </div>

        <div class = 'left'>
        <button
        onClick={handleAddClick}>Hi</button>
        </div>
        
      </div>
    );

    function handleAddClick()
    {
      const artistPost = {name: 'hi'};

      fetch(devURL + "/artist/addArtist",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(artistPost)
    }).then(()=>{
      console.log("New artist added");
    })
    }
    
    function handleSongClick() 
    {
      start(props);
      props.setSongName(props.name);
    }
  
    function handleMouseEnter() {
      setStyle({background: 'green', color:'white'})
    }
  
    function handleMouseExit() {
      setStyle({background: 'white'})    
    }
  }

export async function start(props) {
  let audio = new Audio(props.path);
  currentSongName = props.name;
  props.setSongName(props.name);
  props.setArtistName(props.artist);
  props.setAlbumName(props.album);

  try {
    restart();
    await audio.play();
    currentAudio = audio;
  } catch (err) {}
};

export function pause()
{
  if(currentAudio != null)
  currentAudio.pause();
}

export function restart()
{
  if(currentAudio != null)
  {
  currentAudio.pause();
  currentAudio.load();
  }
}

export function play()
{
  if(currentAudio != null)
  currentAudio.play();
}


export function getCurrentSongName() {
  return currentSongName;
}
