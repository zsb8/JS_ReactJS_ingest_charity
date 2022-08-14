import first from "./first";
import { parseDate, parseYear } from "./parseDate";
module.exports = (row) => {
  const businessNumber = first(row, ["BN/Registration Number"]);
  return {
    businessNumber,
    year: parseYear(first(row, ["Fiscal Period End"])),
    fiscalPeriodEnd: parseDate(first(row, ["Fiscal Period End"])),
    formId: first(row, ["Form ID"]),
  };
};
