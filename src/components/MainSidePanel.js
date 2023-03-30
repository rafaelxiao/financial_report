import React, { useEffect, useState } from "react";
import './MainSidePanel.css';

function SideBarTitle({ title, type, stateManager, toggleSideBar}) {
    return (<div className="side-bar-title">
        <div>{title}</div>
        <button className="side-bar-save-button" onClick={()=> {
            stateManager.save(type)
            toggleSideBar();
        }}>保存</button>
    </div>)
}

function SideBarItem( {name, stateManager, type, toggleSideBar} ) {
    return (<div>
        <button className="side-bar-load-button" onClick={()=>{
            stateManager.load(type, name);
            toggleSideBar();
        }}>{name}</button>
    </div>)
}

export default function MainSidePanel({ isShow, stateManager, toggleSideBar }){
    var showOrNot = isShow ? ' side-bar-open' : '';

    const [itemNames, setItemNames] = useState({
        reportData: stateManager.getItemName("reportData"),
        styleData: stateManager.getItemName("styleData")
    });

    useEffect(()=>{
        setItemNames({
            reportData: stateManager.getItemName("reportData"),
            styleData: stateManager.getItemName("styleData")
        })
    }, [stateManager, stateManager.key]);

    return (<div className={`side-bar${showOrNot}`} id='main-side-panel'>
        <SideBarTitle title={"财报数据"} stateManager={stateManager} type='reportData' toggleSideBar={toggleSideBar}/>
        {
            itemNames.reportData.map((item) => <SideBarItem name={item} stateManager={stateManager} toggleSideBar={toggleSideBar} type='reportData' key={'sideBarReport'+item}/>)
        }
        <div style={{height: '20px'}} />
        <SideBarTitle title={"风格"} stateManager={stateManager} type='styleData' toggleSideBar={toggleSideBar}/>
        {
            itemNames.styleData.map((item) => <SideBarItem name={item} stateManager={stateManager} toggleSideBar={toggleSideBar} type='styleData' key={'sideBarStyle'+item}/>)
        }
    </div>)
}