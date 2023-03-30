import getRandomKey from "../utils/GetRandomKey";

class FRItem {

    static seperator = '[&!?]';

    constructor({id, name, value, type, dataType, uid} = {}){
        this.id = id;
        this.uid = uid??getRandomKey();
        this.name = name;
        this.value = value;
        this.valueShow = `${value}`;
        this.type = type;
        this.dataType = dataType;
    }

    nullToString(value) {
        if(value === null) {
            return "";
        } else {
            return value;
        }
    }

    saveToString() {
        var strings = [
            this.nullToString(this.id),
            this.nullToString(this.uid),
            this.nullToString(this.name),
            this.dataType === 'float' ? this.value.toString() : this.nullToString(this.value),
            this.nullToString(this.valueShow),
            this.nullToString(this.type),
            this.nullToString(this.dataType)
        ];
        return strings.join(FRItem.seperator);
    }

    static loadFromString(string) {
        var loaded = string.split(this.seperator);
        return new FRItem({
            id: loaded[0],
            uid: loaded[1],
            name: loaded[2],
            value: loaded[6] === 'float' ? parseFloat(loaded[3]) : loaded[3],
            valueShow: loaded[4],
            type: loaded[5],
            dataType: loaded[6]
        });
    }

    validator(newValue) {
        if(this.dataType === 'string') {
            return true;
        } else if(this.dataType === 'float' && !isNaN(parseFloat(newValue))) {
            return true;
        } else if(this.dataType === 'color' && newValue.length === 7 && newValue.charAt(0) === '#') {
            return true;
        } else {
            return false;
        }
    }

    setValue(newValue) {
        if(this.validator(newValue)) {
            this.value = newValue;
            this.valueShow = `${newValue}`;
        } else {
            this.valueShow = newValue;
        }
    }

    setName(newName) {
        this.name = newName;
    }

    get valueTwoDigits() {
        var result = 0;
        if(!isNaN(parseFloat(this.value))){
            result = parseFloat(this.value);
        }
        return Math.round(result * 100) / 100;
    }

    get nodeName() {
        return this.name + '#' + this.uid;
    }
}

export default FRItem;
