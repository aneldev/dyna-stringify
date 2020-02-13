"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynaStringify = function (value, options) {
    var _a = options || {}, _b = _a.spaces, spaces = _b === void 0 ? 0 : _b, _c = _a.circularText, circularText = _c === void 0 ? '[CircularRef]' : _c;
    return JSON.stringify(value, getCircularReplacer(circularText), spaces);
};
var getCircularReplacer = function (circularText) {
    var scanned = [];
    return function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (scanned.indexOf(value) > -1) {
                if (typeof circularText === "string")
                    return circularText;
                return circularText(value);
            }
            scanned.push(value);
        }
        return value;
    };
};
//# sourceMappingURL=dynaStringify.js.map