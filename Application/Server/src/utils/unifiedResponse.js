/**
 * Returns unified response object
 * @param {string | number} code - Http status code
 * @param {string} message - Message to be sent
 * @param {Object} [data] - Response data
 * @returns {Object}
 */
const success = (code, message, data = {}) => {
  return { code, message, data, error: null };
};

export default { success };
