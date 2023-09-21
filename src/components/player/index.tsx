import React from "react";
import ReactPlayer from "react-player";
import playerStyle from "./index.module.scss";

const Player = (props: any) => {
  if (!props.urlToPlay) {
    return (
      <div className={playerStyle.noPlayerWrapper}>
        <img
          className={playerStyle.noPlayerLogo}
          src="./bajaao.png"
          alt="bajaao homepage"
        />
        <div className={playerStyle.noPlayerSetup}>
          <h3 className={playerStyle.noPlayerSetupHeading}>BAJAAOO</h3>
          <ol>
            <li>Create a Playlist</li>
            <li>Add song urls to playlist</li>
            <li>Click a song to play or just play the whole playlist</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <ReactPlayer
      playing={props.ifPlayerPlaying}
      width={props.playerWidth}
      height={props.playerHeight}
      controls={true}
      onEnded={props.onEnded}
      url={props.urlToPlay}
    />
  );
};

export default Player;
