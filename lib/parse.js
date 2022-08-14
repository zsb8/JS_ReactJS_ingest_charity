import first from "./first";
import { parseDate } from "./parseDate";
import parseRowKeyFields from "./parseRowKeyFields";
import parseFields from "./parseFields";

const parseAddress = (row) => {
  const street = first(row, ["Mailing Address"]);
  const city = first(row, ["City"]);
  const province = first(row, ["Province"]);
  const postalCode = first(row, ["Postal Code"]);
  const country = first(row, ["Country Code", "Country"]);

  if (!street && !city && !province && !postalCode && !country) {
    return undefined;
  }

  return {
    street,
    city,
    province,
    postalCode,
    country,
  };
};

const fixUrl = (url) => {
  if (!url) {
    return undefined;
  }
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    return `http://${url}`;
  }
  return url;
};

module.exports = (row) => ({
  ...parseRowKeyFields(row),
  designationCode: first(row, ["Designation Code"]),
  categoryCode: first(row, ["Category Code"]),
  subCategoryCode: first(row, ["Sub-category code"]),
  legalName: first(row, ["Legal Name"]),
  accountName: first(row, ["Account Name"]),
  registrationDate: parseDate(first(row, ["Registration Date"])),
  address: parseAddress(row),
  contactName: first(row, ["Public Contact Name"]) || undefined,
  contactPhone: first(row, ["Contact Phone"]) || undefined,
  contactEmail:
    first(row, ["Contact Email"])?.trim().toLowerCase() || undefined,
  contactUrl:
    fixUrl(first(row, ["Contact URL"])?.trim().toLowerCase()) || undefined,
  fields: parseFields(row).fields,
});
