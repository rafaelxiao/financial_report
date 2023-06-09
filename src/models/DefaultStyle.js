import FRItem from "./FRItem";

const defaultStyle = [
    new FRItem({
        id: 'waterMark',
        name: '水印',
        value: '',
        type: null,
        dataType: 'string',
    }),
    new FRItem({
        id: 'expenseColor',
        name: '支出颜色',
        value: '#17A954',
        type: null,
        dataType: 'color',
    }),
    new FRItem({
        id: 'incomeColor',
        name: '收入颜色',
        value: '#CCCCCC',
        type: null,
        dataType: 'color',
    }),
    new FRItem({
        id: 'profitColor',
        name: '利润颜色',
        value: '#EC700C',
        type: null,
        dataType: 'color',
    }),
    new FRItem({
        id: 'backgroundColor',
        name: '背景颜色',
        value: '#F3F3F3',
        type: null,
        dataType: 'color',
    }),
    new FRItem({
        id: 'titleFontSize',
        name: '标题大小',
        value: 80,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'titlePaddingTop',
        name: '标题上距%',
        value: 10,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'labelFontSize',
        name: '标签大小',
        value: 26,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'valueFontSize',
        name: '数值大小',
        value: 20,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'waterMarkSize',
        name: '水印大小',
        value: 60,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'aspectRatio',
        name: '长宽比',
        value: 1.5,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'graphPaddingV',
        name: '上下边距%',
        value: 20,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'graphPaddingH',
        name: '左右边距%',
        value: 10,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'curveness',
        name: '节点间距',
        value: 100,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'unit',
        name: '数值单位',
        value: '万',
        type: null,
        dataType: 'string',
    }),
    new FRItem({
        id: 'exportRatio',
        name: '导出倍数',
        value: 1,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'width',
        name: '导出宽度',
        value: 3000,
        type: null,
        dataType: 'float',
    }),
    new FRItem({
        id: 'styleTitle',
        name: '风格名称',
        value: '默认模板',
        type: null,
        dataType: 'string',
    }),
    new FRItem({
        id: 'secretToken',
        name: '神秘代码',
        value: '',
        type: null,
        dataType: 'string',
    }),
];

export default defaultStyle;