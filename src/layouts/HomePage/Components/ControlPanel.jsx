import { useState } from "react";
import FileUpload from "../../../FileUpload";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { App, SongList } from "./SongList";

export function ControlPanel() {
  const [refresh, setRefresh] = useState(false);
  if(refresh == false)
  {
    return (
      <>
      <SongList/>
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
