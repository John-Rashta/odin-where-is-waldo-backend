const paddTo2Digits = function paddNumberTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
};

export {paddTo2Digits};