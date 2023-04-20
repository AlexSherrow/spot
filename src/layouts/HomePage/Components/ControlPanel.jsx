import { useState } from "react";
import FileUpload from "../../../FileUpload";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { App, SongList } from "./SongList";
import { SongColumnsBar } from "./SongColumnsBar";
import { useLocation } from 'react-router-dom'

export function ControlPanel() {
  const location = useLocation().pathname;
  const [refresh, setRefresh] = useState(false);
  if(refresh == false)
  {
    return (
      <>
      <SongColumnsBar/>
      <SongList path = {location}/>
      <FileUpload setRefresh = {setRefresh}/>
      </>
    );
  }
  else
  {
    return (
      <>
        <SpinnerLoading/>
        <FileUpload setRefresh = {setRefresh}/>
      </>
    );
  }
  
}
