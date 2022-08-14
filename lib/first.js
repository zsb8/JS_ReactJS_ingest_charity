module.exports = (object, keys = []) => {
  const loweredKeys = keys.map((k) => k.toLowerCase());
  return Object.entries(object)
    .filter(([key]) => loweredKeys.includes(key.toLowerCase()))
    .reduce((acc, [, value]) => {
      if (acc !== undefined) {
        return acc;
      }
      return value;
    }, undefined);
};
