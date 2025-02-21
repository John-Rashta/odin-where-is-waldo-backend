import { query, body, param } from "express-validator";

const gameIdValidator = [
  param("gameid").isUUID().withMessage("Must be an UUID"),
];

const imageIdValidator = [
  query("imageid")
    .optional({ values: "falsy" })
    .toInt()
    .isInt()
    .withMessage("Must be an Integer"),
];

const charInfoValidator = [
  body("coordX").toFloat().isFloat().withMessage("Must be a Number"),
  body("coordY").toFloat().isFloat().withMessage("Must be a Number"),
  body("char").isUUID().withMessage("Must be an UUID"),
];

const usernameValidator = [
  body("username").isAlphanumeric().withMessage("Only letters and numbers"),
];

export {
  gameIdValidator,
  imageIdValidator,
  charInfoValidator,
  usernameValidator,
};
