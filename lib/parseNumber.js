module.exports = (value) => {
  if (value === undefined) {
    return undefined;
  }
  if (value.includes("$")) {
    return Number.parseFloat(value.replace("$", ""), 10);
  }
  const numValue = Number.parseFloat(value, 10);
  return Number.isNaN(numValue) ? value : numValue;
};
