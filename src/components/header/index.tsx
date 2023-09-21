import React from "react";
import headerStyle from "./index.module.css";
// import { IoMdHelp } from "react-icons/io";
import { GiMusicalNotes } from "react-icons/gi";

interface PropsType {
  refVal: React.MutableRefObject<any>;
}

const Header = (props: PropsType) => {
  return (
    <div ref={props.refVal} className={headerStyle.header}>
      <img
        className={headerStyle.headerImg}
        src="./bajaao.png"
        alt="bajaao homepage"
      />
      <label className={headerStyle.headerLabel}>Bajaaoo</label>
      <GiMusicalNotes />
    </div>
  );
};

export default Header;
