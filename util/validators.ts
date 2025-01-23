import { query, body, param } from "express-validator";

const gameIdValidator = [
    param("gameid")
        .isUUID().withMessage("Must be an UUID.")
];

const imageIdValidator = [
    query("imageid")
        .optional({values: "falsy"})
        .toInt().isInt().withMessage("Must be an Integer.")
];

const charInfoValidator = [
    body("coordX")
        .toFloat().isFloat().withMessage("Must be an a Number."),
    body("coordY")
        .toFloat().isFloat().withMessage("Must be an a Number."),
    body("char")
        .isUUID().withMessage("Must be an UUID.")
]

export {
    gameIdValidator,
    imageIdValidator,
    charInfoValidator
};