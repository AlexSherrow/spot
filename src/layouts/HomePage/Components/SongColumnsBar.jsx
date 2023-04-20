
import './SongsColumnsBar.css'; // Tell webpack that Button.js uses these styles

export function SongColumnsBar()
{
    return(
<div>
  <div class = "left">Title</div>
  <div class = "left">Album</div>
  <div class = "left">Artist</div>
  <div class = "left">Add</div>
</div>
    );
}