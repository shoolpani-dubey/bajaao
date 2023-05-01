import React from 'react';
import  headerStyle from './index.module.css';
import { IoMdHelp } from 'react-icons/io';

interface PropsType{
    refVal:React.MutableRefObject<any>
}

const Header = (props:PropsType) => {
    return (
        <div ref={props.refVal} className={headerStyle.header}>
            <img className={headerStyle.headerImg} src='./bajaao.png' alt='bajaao homepage' />
            <button className={headerStyle.headerOption}>
                <p>Help</p>
                <IoMdHelp />
            </button>
        </div>
    );
};

export default Header;