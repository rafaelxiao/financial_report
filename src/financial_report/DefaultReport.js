import FRItem from "./FRItem";

const defaultReport = [
    new FRItem({
        id: 'revenue',
        name: '营收',
        value: 0,
        type: 'main',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'grossProfit',
        name: '毛利润',
        value: 0,
        type: 'main',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'operatingProfit',
        name: '运营利润',
        value: 0,
        type: 'main',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'netProfit',
        name: '净利润',
        value: 0,
        type: 'main',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'revenue01',
        name: '营收项目1',
        value: 0,
        type: 'revenue',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'revenue02',
        name: '营收项目2',
        value: 0,
        type: 'revenue',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'revenue03',
        name: '营收项目3',
        value: 0,
        type: 'revenue',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'revenue04',
        name: '营收项目4',
        value: 0,
        type: 'revenue',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'revenue05',
        name: '营收项目5',
        value: 0,
        type: 'revenue',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'cogs01',
        name: '主营业务成本',
        value: 0,
        type: 'cogs',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'cogs02',
        name: '主营业务成本项目2',
        value: 0,
        type: 'cogs',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'cogs03',
        name: '主营业务成本项目3',
        value: 0,
        type: 'cogs',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'cogs04',
        name: '主营业务成本项目4',
        value: 0,
        type: 'cogs',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'cogs05',
        name: '主营业务成本项目5',
        value: 0,
        type: 'cogs',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'expense01',
        name: '财务费用',
        value: 0,
        type: 'expense',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'expense02',
        name: '销售费用',
        value: 0,
        type: 'expense',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'expense03',
        name: '管理费用',
        value: 0,
        type: 'expense',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'expense04',
        name: '研发费用',
        value: 0,
        type: 'expense',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'expense05',
        name: '折旧',
        value: 0,
        type: 'expense',
        validator: (value) => !isNaN(parseFloat(value)),
    }),

    new FRItem({
        id: 'others01',
        name: '税收',
        value: 0,
        type: 'others',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'others02',
        name: '投资',
        value: 0,
        type: 'others',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'others03',
        name: '营业外03',
        value: 0,
        type: 'others',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'others04',
        name: '营业外04',
        value: 0,
        type: 'others',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
    new FRItem({
        id: 'others05',
        name: '营业外05',
        value: 0,
        type: 'others',
        validator: (value) => !isNaN(parseFloat(value)),
    }),
];

export default defaultReport;