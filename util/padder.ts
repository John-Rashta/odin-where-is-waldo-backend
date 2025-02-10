const paddTo2Digits = function paddNumberTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
};

const paddTo3Digits = function padNumberTo3Digets(num: number) {
    return num.toString().padStart(3, "0");
}

export { paddTo2Digits, paddTo3Digits };