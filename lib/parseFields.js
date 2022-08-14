import parseRowKeyFields from "./parseRowKeyFields";
import parseRowNumberedFields from "./parseRowNumberedFields";
module.exports = (row) => ({
  fields: parseRowNumberedFields(row),
});
