import { useState } from "react";
import playlistStyle from "./index.module.css";
import { AiFillCloseSquare } from "react-icons/ai";

interface ICreatePlaylist {
  onCreatePlaylistName: (playlistName: string) => void;
  onClose: () => void;
}
export default function CreatePlaylist(props: ICreatePlaylist) {
  const [playlistName, setPlaylistName] = useState("");
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onCreatePlaylistName(playlistName);
  };
  const closePopup = () => {
    props.onClose();
  };
  return (
    <div className={playlistStyle.playlistWrapper}>
      <div className={playlistStyle.playlistContainer}>
        <form
          onSubmit={onFormSubmit}
          className={playlistStyle.playlistCreateBox}
        >
          <button
            type={"button"}
            className={playlistStyle.playlistCreateBoxClose}
            onClick={closePopup}
          >
            <AiFillCloseSquare />
          </button>
          <label className={playlistStyle.playlistCreateBoxTitle}>
            Enter Playlist Name
          </label>
          <input
            id={"playlistInput"}
            autoFocus={true}
            value={playlistName}
            onChange={(evt) => {
              setPlaylistName(evt.target.value);
            }}
            type="text"
            className={playlistStyle.playlistCreateBoxInput}
          />
          <button
            type="submit"
            className={playlistStyle.playlistCreateBoxButton}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
