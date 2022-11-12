export default function ObjKeysToLowerCase (input) {
    if (typeof input !== 'object') return input;
    if (Array.isArray(input)) return input.map(ObjKeysToLowerCase);
    return Object.keys(input).reduce(function (newObj, key) {
        let val = input[key];
        let newVal = (typeof val === 'object') && val !== null ? ObjKeysToLowerCase(val) : val;
        newObj[key.toLowerCase()] = newVal;
        return newObj;
    }, {});
};