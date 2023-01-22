import React, { useState } from "react";

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
        style={style}
        onClick={handleSongClick}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseExit}
      >
        <a>{props.name} </a>
        <a>{props.artist}</a>
      </div>
    );

    function handleSongClick() 
    {
      start(props);
      props.setSongName(props.name);
    }
  
    function handleMouseEnter() {
      setStyle({background: 'green'})
    }
  
    function handleMouseExit() {
      setStyle({background: 'white'})    }
  }



export async function start(props) {
  let audio = new Audio(props.path);
  currentSongName = props.name;
  props.setSongName(props.name);
  props.setArtistName(props.artist);
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
