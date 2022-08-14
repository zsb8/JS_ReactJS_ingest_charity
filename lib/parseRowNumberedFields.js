import parseNumber from "./parseNumber";
const NUMBERS_ONLY = /^[0-9]+$/;
module.exports = (row) =>
  Object.entries(row)
    .filter(([key]) => NUMBERS_ONLY.exec(key))
    .reduce((acc, [key, value]) => {
      acc[key] = parseNumber(value);
      return acc;
    }, {});
