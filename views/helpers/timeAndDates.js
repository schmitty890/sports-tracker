const moment = require('moment');
/**
 * getYear returns the current year
 */
exports.getYear = () => new Date().getFullYear();

/**
 * momentFromTimeNow returns time from now - past or future
 */
exports.momentFromTimeNow = (time) => moment(time).fromNow();
