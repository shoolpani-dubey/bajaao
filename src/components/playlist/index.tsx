import React, { useEffect, useState } from 'react';
import playlistStyle from './index.module.css';
import { PlaylistIntf, PlaylistIntfData } from '../../globalTypes';

const Playlist = (props:any) => {
    const [playlistName, setPlaylistName] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState<number|undefined>(undefined);
    const [selectedPlaylistData, setSelectedPlayListData] = useState<PlaylistIntfData[]|null>(null);
    const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);
    const [toAddYTUrl, setToAddYTUrl] = useState('');

    const _hanldeCreatePlaylist = () => {
        if(!playlistName){
            return;
        }
        const newPlaylistObject = {
            name: playlistName,
            data: null
        };
        props.onCreatePlaylist(newPlaylistObject);
        setOpenCreatePlaylist(false);
    };
    const _handlePlaylistChange = (event:React.ChangeEvent<any>) => {
        if(!event?.target?.value){
            return;
        }
        const value = Number(event.target.value);
        console.log("Ch:",typeof(value));
        setSelectedPlaylist(value);
        console.log("PP:",props.playlist);
        const selectedPlaylistFiltered:PlaylistIntf = props.playlist.find((e:PlaylistIntf)=>e.key===value);
        console.log("Found:",selectedPlaylistFiltered);
        setSelectedPlayListData(selectedPlaylistFiltered?.data);
    };
    const _openCreatePlaylist = () => {
        setOpenCreatePlaylist(true);
    };
    const _handleOnAddYTUrl = () => {
        props.onAddYTUrlToPlaylist({
            playlist:selectedPlaylist,
            url: toAddYTUrl
        });
        setToAddYTUrl('');
    };
    const _handleItemPlay = (data:PlaylistIntfData) => {
        props.onPlayItem(data);
    };

    useEffect(()=>{
        if((props.playlist && Array.isArray(props.playlist) && props.playlist.length>0)){
            setOpenCreatePlaylist(false);
            if(!selectedPlaylist){
                const selectedPlaylistFiltered:PlaylistIntf = props.playlist[0];
                setSelectedPlaylist(selectedPlaylistFiltered.key);
                setSelectedPlayListData(selectedPlaylistFiltered.data);
            }
        }else{
            setOpenCreatePlaylist(true);
        }
    },[props.playlist, selectedPlaylist]);

    if((!props?.playlist
        || props.playlist.length<=0)
        || openCreatePlaylist){
        return (
            <div className={playlistStyle.playlistWrapper}>
                <div className={playlistStyle.playlistContainer}>
                    <div className={playlistStyle.playlistCreateBox}>
                        <label className={playlistStyle.playlistCreateBoxTitle}>Enter Playlist Name</label>
                        <input
                            id={'playlistInput'}
                            value={playlistName}
                            onChange={(evt)=>{setPlaylistName(evt.target.value)}}
                            type='text' className={playlistStyle.playlistCreateBoxInput}/>
                        <button className={playlistStyle.playlistCreateBoxButton} onClick={_hanldeCreatePlaylist}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={playlistStyle.playlistDropDownContainerWrapper}>
            <div className={playlistStyle.playlistDropDownContainer}>
                <button
                    className={playlistStyle.playlistDropDownContainerButton}
                    onClick={_openCreatePlaylist}>Create Playlist</button>
                <div className={playlistStyle.playlistDropDownContainerSelectBox}>
                    <label>Select a Playlist to play
                    </label>
                    <select
                        className={playlistStyle.playlistDropDownContainerSelect}
                            onChange={_handlePlaylistChange}
                            value={selectedPlaylist}>
                        {props.playlist.map((ele:PlaylistIntf)=>{
                            return (
                                <option key={ele.key} value={ele.key}>{ele.name}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label>Add youtube url:</label>
                    <div className={playlistStyle.playlistDropDownContainerInputWrapper}>
                        <input
                            className={playlistStyle.playlistDropDownContainerInput}
                            value={toAddYTUrl} onChange={(event:React.ChangeEvent<any>)=>{setToAddYTUrl(event.target.value)}} />
                        <button
                            className={playlistStyle.playlistDropDownContainerInputButton}
                            onClick={_handleOnAddYTUrl}>Submit</button>
                    </div>
                </div>
                {selectedPlaylistData
                && Array.isArray(selectedPlaylistData)
                && selectedPlaylistData.length>0
                && <div>
                    {selectedPlaylistData.map(e=>{
                        return (
                            <button
                                key={e.key}
                                onClick={()=>{_handleItemPlay(e)}}
                                className={playlistStyle.playlistDropDownContainerList}>
                                <img
                                    className={playlistStyle.playlistDropDownContainerListImg}
                                    src={e?.thumbnail}
                                    alt=""/>
                                <label
                                    title={e?.name}
                                    className={playlistStyle.playlistDropDownContainerListLabel}>{e?.name?.toUpperCase()}</label>
                            </button>
                        )
                    })
                    }
                </div>}
            </div>
        </div>
    );
        

};

export default Playlist;