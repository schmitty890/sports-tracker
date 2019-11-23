const moment = require('moment');
/**
 * getYear returns the current year
 */
exports.getYear = () => new Date().getFullYear();

exports.momentFromTimeNow = (time) =>  moment(time).fromNow();