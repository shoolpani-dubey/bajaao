import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import appStyle from './App.module.css';
import Header from './components/header';
import Playlist from './components/playlist';
import { PlaylistIntf, PlaylistIntfData } from './globalTypes';

enum OrientationType{
  Portrait=0,
  Landscape=1
}

function App() {
  const [screenOrientation, setScreenOrientation] = useState<OrientationType|null>(null);
  
  const [playerWidth, setPlayerWidth] = useState<number>(0);
  const [playerHeight, setPlayerHeight] = useState<number>(0);
  const [playlist, setPlaylist] = useState<PlaylistIntf[]>([]);
  const [urlToPlay, setUrlToPlay] = useState('https://www.youtube.com/watch?v=m3m1dXmTrJU');
  const [ifPlayerPlaying, setIfPlayerPlaying] = useState(false);

  const playerRef = useRef(null);
  const headerRef = useRef(null);

  const screenOrientationChangeListener = () => {
    console.log(window.screen.orientation.type);
    const orientationType = window?.screen?.orientation?.type;
    if(orientationType === 'landscape-primary'
      || orientationType === 'landscape-secondary'){
        setScreenOrientation(OrientationType.Landscape);
    } else if (orientationType === 'portrait-primary'
      || orientationType === 'portrait-secondary'){
        setScreenOrientation(OrientationType.Portrait);
    }
  };
  const loadPlaylistFromLS = () => {
    const playlist = localStorage.getItem('bajaaoPlaylist');
    if(!playlist || playlist.length<=0){
      return;
    }
    try{
      const parsedPlaylist:PlaylistIntf[] = JSON.parse(playlist);
      setPlaylist(parsedPlaylist);
    }catch(e){
      // Error parsing the playlist
    }
  };
  const onCreatePlaylist = (data:PlaylistIntf) => {
    if(!data){
      return;
    }
    data.key = new Date().getTime();
    setPlaylist([
      ...playlist,
      data
    ]);
    // updating it to loacalstorage
    localStorage.setItem('bajaaoPlaylist',JSON.stringify([
      ...playlist,
      data
    ]));
  };

  const onAddYTUrlToPlaylist = async (data:{
    playlist:number,
    url: string
  })=>{
    if(!data){
      return;
    }
    // find the playlist from list
    // const selPL:PlaylistIntf|undefined = playlist.find((e)=>e.key===data.playlist);
    const foundPlaylistIndex:number = playlist.findIndex((obj => obj.key === data.playlist));
    if(foundPlaylistIndex<0){
      return;
    }
    
    const foundPlaylist = playlist[foundPlaylistIndex];
    if(!foundPlaylist?.data){
      foundPlaylist.data = [];
    }
    try{
      const _data = await fetch(`https://www.youtube.com/oembed?url=${data.url}&format=json`);
      const parsedResp = await _data.json();
      const dataToPush:PlaylistIntfData = {
          name: parsedResp.title,
          url: data.url,
          thumbnail: parsedResp.thumbnail_url
      };
      foundPlaylist.data.push(dataToPush);
      setPlaylist([
        ...playlist
      ]);
      // update in localstorage
      localStorage.setItem('bajaaoPlaylist',JSON.stringify([
        ...playlist
      ]));
    }catch(e){
      // Error fetching the data for the yt url
    }
  }
  const onPlayItem = (data:PlaylistIntfData) => {
    if(!data?.url){
      return;
    }
    setUrlToPlay(data.url);
    setIfPlayerPlaying(true);
  };

  useEffect(()=>{
    if(screenOrientation!==OrientationType.Landscape
      && screenOrientation!== OrientationType.Portrait){
        return;
    }
    if(!playerRef?.current 
      || !headerRef?.current){
      return;
    }
    setPlayerWidth(playerRef?.current["offsetWidth"] || 0);
    console.log(playerRef.current["offsetHeight"],headerRef?.current["offsetHeight"]);
    setPlayerHeight((playerRef.current["offsetHeight"]) || 0)

  },[screenOrientation, playerRef, headerRef]);
  useEffect(()=>{
    loadPlaylistFromLS();
    window.screen.orientation.addEventListener("change", screenOrientationChangeListener);
    screenOrientationChangeListener();
    return(()=>{
      window.screen.orientation.removeEventListener("change",screenOrientationChangeListener);
    })
  },[])

  return (
    <div className={appStyle.app}>
      <Header refVal={headerRef}/>
      <section className={appStyle.bodySection}>
        <div id="playlist"
          className={`${appStyle.playlist} 
            ${(screenOrientation === OrientationType.Landscape
            ? appStyle.widthThirtyPercent
            : appStyle.widthHundredPercent)}`}>
          <Playlist
            onAddYTUrlToPlaylist={onAddYTUrlToPlaylist}
            onCreatePlaylist={onCreatePlaylist}
            onPlayItem={onPlayItem}
            playlist={playlist} />
        </div>
        <div id="player"
          ref={playerRef}
          className={`${appStyle.player} 
          ${(screenOrientation === OrientationType.Landscape
          ? appStyle.widthSeventyPercent
          : appStyle.widthHundredPercent)}`}>
          <ReactPlayer
            playing={ifPlayerPlaying}
            width={playerWidth}
            height={playerHeight}
            controls={true}
            url={urlToPlay} />
        </div>
      </section>
    </div>
  );
}

export default App;
