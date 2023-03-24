import ChartArea from "./ChartArea";
import FormArea from "./FormArea";
import React, { useState } from "react";
import ContentManager from "./ContentManager";
import defaultStyle from "./DefaultStyle";
import defaultReport from "./DefaultReport";
import MainTitleBar from "./MainTitleBar";


export default function FinancialReport() {

    const [_style, _setStyle] = useState(defaultStyle);

    const styleManager = new ContentManager({
        state: _style,
        setState: _setStyle,
    })

    const [_report, _setReport] = useState(defaultReport);

    const reportManager = new ContentManager({
        state: _report,
        setState: _setReport,
    })


    return (
        <div>
            <MainTitleBar />
            <div style={{height: '20px'}} />            
            <FormArea reportManager={reportManager} styleManager={styleManager}/>
            <ChartArea reportManager={reportManager} styleManager={styleManager}/>

        </div>
    );
}