export function StatusBar(props)
{
    return(
        <>
            <div>{props.songName}</div>
            <div>{props.artistName}</div>
            <div>{props.albumName}</div>
        </>
    );
}