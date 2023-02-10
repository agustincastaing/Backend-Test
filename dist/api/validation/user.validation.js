"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotPassword = exports.isNotDate = exports.isNotEmail = exports.isNotName = void 0;
const isNotString = (param) => typeof param !== "string";
const containsNumbers = (param) => Boolean(param.split("").find((elem) => !isNaN(Number(elem))));
const isNotName = (name) => {
    if (isNotString(name))
        return true;
    if (containsNumbers(name))
        return true;
    if (name.length < 3)
        return true;
    return false;
};
exports.isNotName = isNotName;
const isNotEmail = (email) => {
    if (isNotString(email))
        return true;
    if (!email.includes("@"))
        return true;
    const lastArroba = email.split("@")[1].split("").length > 3;
    if (!lastArroba)
        return true;
    return false;
};
exports.isNotEmail = isNotEmail;
const isNotDate = (date) => {
    const dateForm = new Date(date);
    if (!dateForm.getDate())
        return true;
    return false;
};
exports.isNotDate = isNotDate;
const isNotPassword = (password) => {
    if (isNotString(password))
        return true;
    if (password.length < 7)
        return true;
    const numberReg = /[0-9]/gm;
    if (!numberReg.test(password))
        return true;
    const UpperCase = /[A-Z]/gm;
    if (!UpperCase.test(password))
        return true;
    return false;
};
exports.isNotPassword = isNotPassword;
function IsNotClient(client) {
    return (0, exports.isNotName)(client.firstName)
        ? true
        : (0, exports.isNotEmail)(client.email)
            ? true
            : (0, exports.isNotDate)(client.birth_date)
                ? true
                : (0, exports.isNotPassword)(client.password)
                    ? true
                    : false;
}
exports.default = IsNotClient;
