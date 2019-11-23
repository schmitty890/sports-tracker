const axios = require('axios');

/**
 * GET /getTeamsCurrentGame
 * returns data on the present day game
 */
exports.getTeamsCurrentGame = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamID}`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting player summary')));
};

/**
 * getTeamsNextMatchup returns a teams next matchup
 */
exports.getTeamsNextMatchup = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/teams?teamId=${teamID}&expand=team.schedule.next`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting player summary')));
};
