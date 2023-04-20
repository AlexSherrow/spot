import React, { useState } from "react";
import './Sound.css';

var constants = require('../../../constants');

let currentAudio;
let currentSongName;

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
        <a href= {constants.hostURL + '/album/' + props.album}>{props.album}</a>
        </div>

        <div class = 'left'
        style={style}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        >
        <a href= {constants.hostURL + '/artist/' + props.artist}>{props.artist}</a>        
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

      fetch(constants.postURL + "/artist/addArtist",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(artistPost)
    }).then(()=>{
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
