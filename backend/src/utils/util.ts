/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const roundAccurately = (number, decimalPlaces): number => {
  return Number(Math.round(<any>(number + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
};

export const getSkipLimit = (skip: number, limit: number) => {
  const data = { skip, limit };
  if (isNaN(skip) || skip < 0) {
    data.skip = 0;
  }
  if (isNaN(limit) || limit < 0) {
    data.limit = 10;
  } else if (limit > 50) {
    data.limit = 50;
  }
  console.log(data);
  return data;
};
