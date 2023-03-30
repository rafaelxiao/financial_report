import getRandomKey from "../utils/GetRandomKey";
import FRItem from "./FRItem";

class StateManager {

    _storageName = 'financial_report_storage';
    _maxStyleDataCount = 5;
    _maxReportDataCount = 10;

    constructor({ reportManager, styleManager }) {
        this._reportManager = reportManager;
        this._styleManager = styleManager;
        this.key = getRandomKey();
    }

    get state() {
        const storage = sessionStorage.getItem(this._storageName);
        if(storage) {
            return JSON.parse(storage)
        } else {
            return {
                'styleData': [],
                'reportData': [],
            }
        }
    }

    _forceUpdate() {
        this.key = getRandomKey();
    }

    _getMaxAllowed(type) {
        if(type === 'styleData') {
            return this._maxStyleDataCount
        } else if (type === 'reportData') {
            return this._maxReportDataCount;
        } else {
            return 0;
        }
    }

    _getDataToSave(type) {
        if(type === 'styleData') {
            return {
                name: this._styleManager.getItem('styleTitle').value,
                data: this._createOneRecord(this._styleManager.state)
            };
        } else if(type === 'reportData') {
            return {
                name: this._reportManager.getItem('title').value,
                data: this._createOneRecord(this._reportManager.state)
            };
        } else {
            return {};
        }
    }

    _createOneRecord(data) {
        return data.map((item) => item.saveToString());
    }

    save(type) {
        const dataToSave = this._getDataToSave(type);
        var data = this.state[type];
        if(data.length === 0) {
            data = [dataToSave]
        } else {
            for(let idx in data) {
                if(data[idx].name === dataToSave.name) {
                    data.splice(idx, 1);
                }
            }
            data = [...data, dataToSave];
            var maxAllowed =  this._getMaxAllowed(type);
            if(data.length > maxAllowed) {
                data = data.splice(data.length - maxAllowed, maxAllowed);
            }
        }
        sessionStorage.setItem(this._storageName, JSON.stringify({
            ...this.state,
            [type]: data,
        }));
        this._forceUpdate();
    }

    load(type, name) {
        var data = this.state[type];
        for(let idx in data) {
            if(data[idx].name === name) {
                var dataLoad = data[idx].data.map((item)=>FRItem.loadFromString(item));
                if(type === 'reportData') {
                    this._reportManager.updateAll(dataLoad);
                } else if(type === 'styleData') {
                    this._styleManager.updateAll(dataLoad);
                } else {}
                return;
            }
        }
    }

    getItemName(type) {
        const data = this.state[type];
        return data.map((item) => item.name);
    }

}


export default StateManager;