import ChartArea from "./components/ChartArea";
import FormArea from "./components/FormArea";
import React, { useState, useEffect, useCallback } from "react";
import ContentManager from "./models/ContentManager";
import StateManager from "./models/StateManager";
import defaultStyle from "./models/DefaultStyle";
import defaultReport from "./models/DefaultReport";
import MainTitleBar from "./components/MainTitleBar";
import MainSidePanel from "./components/MainSidePanel";
// import './check.css'

export default function FinancialReport() {



    const [_style, _setStyle] = useState(defaultStyle);
    const [styleManager] = useState(
        new ContentManager({
            state: _style,
            setState: _setStyle,
        })
    );

    const [_report, _setReport] = useState(defaultReport);
    const [reportManager] = useState(
        new ContentManager({
            state: _report,
            setState: _setReport,
        })
    );

    const [stateManager] = useState(
        new StateManager({
                reportManager: reportManager,
                styleManager: styleManager,
            }
        )
    );


    const [_graphWidth, _setGraphWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        function handleResize() {
            _setGraphWidth(document.body.clientWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [_showSideBar, _setShowSideBar] = useState(false);
    const toggleSideBar = useCallback(() => _setShowSideBar(!_showSideBar), [_showSideBar]);
    useEffect(() => {
        const handleClick = (event) => {
            if (_showSideBar 
                && !document.getElementById("main-side-panel").contains(event.target)
                && !document.getElementById("sl-button").contains(event.target)
                ) {
                toggleSideBar();
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [_showSideBar, toggleSideBar]);

    return (
        <div>
            <MainTitleBar
                onButtonClick={toggleSideBar}
            />
            <div style={{ height: '80px' }} />
            <FormArea reportManager={reportManager} styleManager={styleManager} />
            <div style={{ height: '10px' }} />
            <ChartArea reportManager={reportManager} styleManager={styleManager} graphWidth={_graphWidth} />

            <MainSidePanel isShow={_showSideBar} stateManager={stateManager} toggleSideBar={toggleSideBar}/>
        </div>
    );
}