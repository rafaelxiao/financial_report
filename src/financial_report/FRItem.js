class FRItem {
    constructor({id, name, value, type, validator} = {}){
        this.id = id;
        this.uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.name = name;
        this.value = value;
        this.valueShow = `${value}`;
        this.type = type;
        this.validator = validator;
    }

    _setValue(newValue) {
        this.value = newValue;
    }

    _setValueShow(newValueText) {
        this.valueShow = newValueText;
    }

    setValue(newValue) {
        if(this.validator(newValue)) {
            this.value = newValue;
            this.valueShow = newValue;
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
