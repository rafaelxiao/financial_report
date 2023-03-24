import React from "react";

function InputArea({ value, setValue, inputWidth }) {
    var inputStyle = {
        width: inputWidth === undefined ? 120 : inputWidth,
        height: 20,
    };
    return <input value={value}
        style={inputStyle}
        onChange={({ target: { value } }) => {
            setValue(value);
        }
    } />;
}



function TextArea({ label, value, setValue, inputWidth, textStyle }) {
    var blockStyle = {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '5px',

    }

    var defaultTextStyle = {
        fontSize: '12px',
        lineHeight: '20px',
        textAlign: 'left',
        paddingRight: '30px',
    }

    if(textStyle !== undefined) {
        textStyle = {
            ...defaultTextStyle,
            ...textStyle
        }
    } else {
        textStyle = defaultTextStyle;
    }



    return (
        <div style={blockStyle}>
            <div style={textStyle}>{label}</div>
            <InputArea value={value} setValue={setValue} inputWidth={inputWidth} />
        </div>
    )
}


function DoubleTextArea({ name, setName, value, setValue, inputWidth }) {
    var blockStyle = {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '5px',
    }

    return (
        <div style={blockStyle}>
            <InputArea value={name} setValue={setName} inputWidth={inputWidth} />
            <div style={{ width: '10px' }}></div>
            <InputArea value={value} setValue={setValue} inputWidth={inputWidth} />
        </div>
    )
}

function SectionTitle({ name }) {
    var style = {
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        fontSize: '14px',
        fontWeight: 'bold',
    }
    return (
        <div style={style}>
            {name}
        </div>

    )
}

export default function FormArea({ reportManager, styleManager }) {

    var areaStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    }

    var areaStyleHorizontal = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

    var areaBlockStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        width: '300px',
        paddingLeft: '20px',
        paddingBottom: '20px',

    }

    return (
        <div style={areaStyle}>
            {/* <div style={{ ...areaBlockStyle, flexDirection: 'row' }}> */}
            <div style={areaStyleHorizontal}>
                <div style={areaBlockStyle}>
                    <TextArea
                        label={styleManager.getItem('title').name}
                        value={styleManager.getItem('title').value}
                        setValue={styleManager.getUpdateCallback('title')}
                        inputWidth={190}
                        textStyle={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    />
                </div>

                <div style={areaBlockStyle}>
                    <TextArea
                        label={styleManager.getItem('waterMark').name}
                        value={styleManager.getItem('waterMark').value}
                        setValue={styleManager.getUpdateCallback('waterMark')}
                        inputWidth={190}
                        textStyle={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    />
                </div>

            </div>

            <div style={areaStyleHorizontal}>
                <div style={areaBlockStyle}>
                    <SectionTitle name={'经营收入'} />

                    {
                        ['revenue01', 'revenue02', 'revenue03', 'revenue04', 'revenue05'].map((e) => {
                            return <DoubleTextArea
                                name={reportManager.getItem(e).name}
                                setName={reportManager.getChangeNameCallback(e)}
                                value={reportManager.getItem(e).valueShow}
                                setValue={reportManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }

                </div>

                <div style={areaBlockStyle}>
                    <SectionTitle name={'主营业务支出'} />

                    {
                        ['cogs01', 'cogs02', 'cogs03', 'cogs04', 'cogs05'].map((e) => {
                            return <DoubleTextArea
                                name={reportManager.getItem(e).name}
                                setName={reportManager.getChangeNameCallback(e)}
                                value={reportManager.getItem(e).valueShow}
                                setValue={reportManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }
                </div>

                <div style={areaBlockStyle}>
                    <SectionTitle name={'运营支出'} />
                    {
                        ['expense01', 'expense02', 'expense03', 'expense04', 'expense05'].map((e) => {
                            return <DoubleTextArea
                                name={reportManager.getItem(e).name}
                                setName={reportManager.getChangeNameCallback(e)}
                                value={reportManager.getItem(e).valueShow}
                                setValue={reportManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }
                </div>


                <div style={areaBlockStyle}>
                    <SectionTitle name={'税费及投资'} />

                    {

                        ['others01', 'others02', 'others03', 'others04', 'others05'].map((e) => {
                            return <DoubleTextArea
                                name={reportManager.getItem(e).name}
                                setName={reportManager.getChangeNameCallback(e)}
                                value={reportManager.getItem(e).valueShow}
                                setValue={reportManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }

                </div>

                <div style={areaBlockStyle}>
                    <SectionTitle name={'颜色设定'} />

                    {
                        ['backgroundColor', 'incomeColor', 'profitColor', 'expenseColor'].map((e) => {
                            return <TextArea
                                label={styleManager.getItem(e).name}
                                value={styleManager.getItem(e).valueShow}
                                setValue={styleManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }

                </div>

                <div style={areaBlockStyle}>
                    <SectionTitle name={'样式设定01'} />

                    {
                        [
                            'height', 'graphPaddingV', 'graphPaddingH',
                            'titlePaddingTop', 'curveness', 'exportRatio'
                        ].map((e) => {
                            return <TextArea
                                label={styleManager.getItem(e).name}
                                value={styleManager.getItem(e).valueShow}
                                setValue={styleManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }
                </div>

                <div style={areaBlockStyle}>
                    <SectionTitle name={'样式设定02'} />

                    {
                        [
                            'titleFontSize', 'labelFontSize', 'valueFontSize', 
                            'waterMarkSize', 'unit', 'secretToken'
                        ].map((e) => {
                            return <TextArea
                                label={styleManager.getItem(e).name}
                                value={styleManager.getItem(e).valueShow}
                                setValue={styleManager.getUpdateCallback(e)}
                                key={e}
                            />
                        })
                    }
                </div>

            </div>




        </div>
    );
}