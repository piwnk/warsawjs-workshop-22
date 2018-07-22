export const areValuesPositive = array => {
  return array.filter(item => item < 1).length > 0;
};

export const areValuesStrings = array => {
  return array.filter(item => !(item instanceof String)) > 0;
};


export const areCodesUnique = data => {
  const codes = data.map(item => item['code']);
  const codesSet = Array.from(new Set(codes));
  return codes.length !== codesSet.length;
};

export const allItemsContainKey = (array, key) => {
  return array.filter(item => Object.keys(item).includes(key)).length === 0;
};
