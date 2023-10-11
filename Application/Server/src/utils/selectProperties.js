/* eslint-disable no-param-reassign */
/**
 * Create an object composed of the selected object properties
 * @param {Object} object - Object to copy from
 * @param {string[]} keys - Properties to copy
 * @returns {Object}
 */
const selectProperties = (object, keys) =>
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});

export default selectProperties;
