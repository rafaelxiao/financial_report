import EchartsReact from "echarts-for-react";
import React, { useEffect } from "react";
import isGoldFinger from "../utils/GoldFingers";

export default function ChartArea({reportManager, styleManager, graphWidth}) {

    useEffect(()=>{
        styleManager.updateValue('exportRatio', (styleManager.getItem('width').value / graphWidth).toFixed(2));
    }, [graphWidth, styleManager, styleManager.valueString])

    // styleManager.updateValue('exportRatio', (styleManager.getItem('width').value / graphWidth).toFixed(2));
    function getWaterMark(waterMarkText) {
        const size = styleManager.getItem('waterMarkSize').valueTwoDigits * 10;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.height = size;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 1;
        ctx.fillStyle = styleManager.getItem('backgroundColor').value;
        ctx.font = `${styleManager.getItem('waterMarkSize').value}px Microsoft YaHei`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = styleManager.getItem('incomeColor').value;
        ctx.translate(size / 2, size / 2);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(waterMarkText, 0, 0);
        return canvas;
    }

    var financialReport = {

        get totalRevenue() {
            return reportManager.sumByType('revenue');
        },

        get grossProfit() {
            return this.totalRevenue - reportManager.sumByType('cogs');
        },

        get operatingProfit() {
            return this.grossProfit - reportManager.sumByType('expense');
        },

        get operatingGap() {
            return this.operatingProfit - reportManager.sumByTypeAndNegative('expense');
        },

        get netProfit() {
            return this.operatingProfit - reportManager.sumByType('others');
        },

        get netGap() {
            return this.netProfit - reportManager.sumByTypeAndNegative('others');
        },

    }

    function getReportSeries(report) {
        var series = [];

        if(report.totalRevenue > 0) {
            series.push({
                'name': reportManager.getItem('revenue').nodeName,
                'itemStyle': {
                    'color': styleManager.getItem('incomeColor').value,
                },
                'value': report.totalRevenue.toFixed(2),
            });

            series.push({
                'name': reportManager.getItem('grossProfit').nodeName,
                'itemStyle': {
                    'color': styleManager.getItem(report.grossProfit >= 0 ? 'profitColor': 'expenseColor').value,
                },
                'value': report.grossProfit.toFixed(2),
            });

            series.push({
                'name': reportManager.getItem('operatingProfit').nodeName,
                'itemStyle': {
                    'color': styleManager.getItem(report.operatingProfit >= 0 ? 'profitColor': 'expenseColor').value,
                },
                'value': report.operatingProfit.toFixed(2),
            });

            series.push({
                'name': reportManager.getItem('netProfit').nodeName,
                'itemStyle': {
                    'color': styleManager.getItem(report.netProfit >= 0 ? 'profitColor': 'expenseColor').value,
                },
                'value': report.netProfit.toFixed(2),
            });
        }


        const cogsItems = reportManager.filterByType('cogs');
        for (let key in cogsItems) {
            if(cogsItems[key].value > 0) {
                series.push({
                    'name': cogsItems[key].nodeName,
                    'itemStyle': {
                        'color': styleManager.getItem('expenseColor').value,
                    },
                    'value': cogsItems[key].valueTwoDigits
                });
            }
        }

        const revenueItems = reportManager.filterByType('revenue');
        for (let key in revenueItems) {
            if(revenueItems[key].value > 0) {
                series.push({
                    'name': revenueItems[key].nodeName,
                    'itemStyle': {
                        'color': styleManager.getItem('incomeColor').value,
                    },
                    'value': revenueItems[key].valueTwoDigits
                });
            }
        }

        const expenseItems = reportManager.filterByType('expense');
        for (let key in expenseItems) {
            if(expenseItems[key].value !== 0) {
                series.push({
                    'name': expenseItems[key].nodeName,
                    'itemStyle': {
                        'color':  expenseItems[key].value >= 0 ? styleManager.getItem('expenseColor').value : styleManager.getItem('incomeColor').value,
                    },
                    'value': expenseItems[key].value >= 0 ? expenseItems[key].valueTwoDigits : -expenseItems[key].valueTwoDigits,
                    'depth': expenseItems[key].value >= 0 ? 3 : 2,
                });
            }
        }

        const otherItems = reportManager.filterByType('others');
        for (let key in otherItems) {
            if(otherItems[key].value !== 0) {
                series.push({
                    'name': otherItems[key].nodeName,
                    'itemStyle': {
                        'color':  otherItems[key].value >= 0 ? styleManager.getItem('expenseColor').value : styleManager.getItem('incomeColor').value,
                    },
                    'value': otherItems[key].value >= 0 ? otherItems[key].valueTwoDigits : -otherItems[key].valueTwoDigits,
                    'depth': otherItems[key].value >= 0 ? 4 : 3,
                });
            }
        }

        return series;
    }

    function getReportLinks(report) {
        var links = [];

        const revenueItems = reportManager.filterByType('revenue');
        for (let key in revenueItems) {
            links.push({
                source: revenueItems[key].nodeName,
                target: reportManager.getItem('revenue').nodeName,
                value: revenueItems[key].value,
            })
        }

        links.push({
            source: reportManager.getItem('revenue').nodeName,
            target: reportManager.getItem('grossProfit').nodeName,
            value: report.grossProfit
        })

        const cogsItems = reportManager.filterByType('cogs');
        for (let key in cogsItems) {
            links.push({
                source: reportManager.getItem('revenue').nodeName,
                target: cogsItems[key].nodeName,
                value: cogsItems[key].value,
            })
        }



        links.push({
            source: reportManager.getItem('grossProfit').nodeName,
            target: reportManager.getItem('operatingProfit').nodeName,
            value: report.operatingGap
        })

        const expenseItems = reportManager.filterByType('expense');
        for (let key in expenseItems) {
            if(expenseItems[key].value >= 0) {
                links.push({
                    source: reportManager.getItem('grossProfit').nodeName,
                    target: expenseItems[key].nodeName,
                    value: expenseItems[key].value
                });
            } else {
                links.push({
                    source: expenseItems[key].nodeName,
                    target: reportManager.getItem('operatingProfit').nodeName,
                    value: -expenseItems[key].value
                });
            }

        }

        const otherItems = reportManager.filterByType('others');
        for (let key in otherItems) {
            if(otherItems[key].value >= 0) {
                links.push({
                    source: reportManager.getItem('operatingProfit').nodeName,
                    target: otherItems[key].nodeName,
                    value: otherItems[key].value
                });
            } else {
                links.push({
                    source: otherItems[key].nodeName,
                    target: reportManager.getItem('netProfit').nodeName,
                    value: -otherItems[key].value
                });
            }

        }

        links.push({
            source: reportManager.getItem('operatingProfit').nodeName,
            target: reportManager.getItem('netProfit').nodeName,
            value: report.netGap
        })

        return links;
    }

    function getCopyMarkFontSize() {
        var copyMarkFontSize = 12;

        if(styleManager.getItem('titleFontSize').valueTwoDigits / 5 > copyMarkFontSize) {
            copyMarkFontSize = styleManager.getItem('titleFontSize').valueTwoDigits / 5;
        };

        return copyMarkFontSize;
    }

    function getOption() {
        var option = {
            title: [
                {
                    text: reportManager.getItem('title').value,
                    textStyle: {
                        fontSize: styleManager.getItem('titleFontSize').value,
                    },
                    left: 'center',
                    color: '#545454',
                    top: `${styleManager.getItem('titlePaddingTop').value}%`,
                    show: true,
                },
                {
                    text: '七海原创',
                    textStyle: {
                        fontSize: getCopyMarkFontSize(),
                        fontWeight: 100,
                    },
                    padding: getCopyMarkFontSize() / 2,
                    itemGap: getCopyMarkFontSize() / 2,
                    subtextStyle: {
                        fontSize: getCopyMarkFontSize() / 2,
                        fontWeight: 800,
                        color: '#545454',
                    },
                    textAlign: 'center',
                    subtext: '小红书 | 抖音 | Bilibili',
                    right: '0%',
                    bottom: '1%',
                    show: !(isGoldFinger(styleManager.getItem('secretToken').value) || financialReport.totalRevenue === 0) ,
                    borderColor: '#545454',
                    borderRadius: 5,
                    borderWidth: 0.3,
                }
            ],
            
    
            toolbox: {
                show: true,
                left: 'center',
                top: 'bottom',
                feature: {
                    saveAsImage: {
                        pixelRatio: styleManager.getItem('exportRatio').valueTwoDigits,
                    },
                },
                itemSize: 30,
            },
            backgroundColor: {
                type: 'pattern',
                image: getWaterMark(styleManager.getItem('waterMark').value),
                repeat: 'repeat',
            },
            series: {
                type: 'sankey',
                layoutIterations: 0,
                nodeGap: styleManager.getItem('curveness').valueTwoDigits,
                label: {
                    show: true,
                    textBorderColor: 'transparent',
                    formatter: function({data: {name, value}}) {
                        name = name.split("#")[0];
                        return `{name|${name}}\n{value|${value}${' '+styleManager.getItem('unit').value}}`;
                    },
                    rich: {
                        name: {
                            fontSize: styleManager.getItem('labelFontSize').value,
                            fontWeight: 'bold',
                            color: 'black',
                        },
                        value: {
                            fontSize: styleManager.getItem('valueFontSize').value,
                            color: 'black',
                            lineHeight: styleManager.getItem('valueFontSize').value * 1.5,
                        }
                    }
                },
                nodeAlign: 'left',
                data: getReportSeries(financialReport),
                links: getReportLinks(financialReport),
                top: `${styleManager.getItem('graphPaddingV').value}%`,
                bottom: `${(styleManager.getItem('graphPaddingV').value - styleManager.getItem('titlePaddingTop').value )}%`,
                right: `${styleManager.getItem('graphPaddingH').value}%`,
                left: `${styleManager.getItem('graphPaddingH').value}%`,
                emphasis: {
                    focus: 'adjacency'
                },
                lineStyle: {
                    color: 'gradient',
                    curveness: 0.5
                },
            },
    
        }
        return option;
    }






    return (
        <EchartsReact 
            option={getOption()} 
            style={{ height: `${graphWidth / styleManager.getItem('aspectRatio').value}px`, width: `${graphWidth}px`}} 
        />
    );
}