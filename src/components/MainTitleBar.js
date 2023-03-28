import React from "react";

export default function MainTitleBar() {
    return <div style={{
        height: 80,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        paddingLeft: '5vw',
        fontSize: 35,
        letterSpacing: '5px',
        background: 'linear-gradient(to right, #44a08d, #093637)',
        color: 'white',
    }}>
        利润表可视化工具
    </div>
}