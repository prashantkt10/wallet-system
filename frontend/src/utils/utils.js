export const roundAccurately = (number, decimalPlaces = 4) => {
    return Number(Math.round((number + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
};