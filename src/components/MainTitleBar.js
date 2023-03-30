import React from "react";
import './MainTitleBar.css';


export default function MainTitleBar( { onButtonClick } ) {
    return <div className="main-bar">
        <div className='main-title'>利润表可视化工具</div>
        <button className='sl-button' onClick={onButtonClick} id='sl-button'>记录</button>
    </div>
}