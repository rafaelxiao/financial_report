import ChartArea from "./components/ChartArea";
import FormArea from "./components/FormArea";
import React, { useState, useEffect } from "react";
import ContentManager from "./models/ContentManager";
import defaultStyle from "./models/DefaultStyle";
import defaultReport from "./models/DefaultReport";
import MainTitleBar from "./components/MainTitleBar";
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

    const [_graphWidth, _setGraphWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        function handleResize(){
            _setGraphWidth(document.body.clientWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <MainTitleBar />
            <FormArea reportManager={reportManager} styleManager={styleManager}/>
            <div style={{height: '10px'}} />            
            <ChartArea reportManager={reportManager} styleManager={styleManager} graphWidth={_graphWidth}/>
        </div>
    );
}