const axios = require('axios');

/**
 * GET /getTeamsCurrentGame
 * returns data on the present day game
 */
exports.getTeamsCurrentGame = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamID}`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting teams current game')));
};

/**
 * getTeamsNextMatchup returns a teams next matchup
 */
exports.getTeamsNextMatchup = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/teams?teamId=${teamID}&expand=team.schedule.next`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting teams next matchup')));
};

/**
 * getCurrentStatsOfLiveGame returns live stats of a game in action
 */
exports.getCurrentStatsOfLiveGame = (teamLiveURL) => {
  console.log('getCurrentStatsOfLiveGame');
  const url = `https://statsapi.web.nhl.com${teamLiveURL}`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting getCurrentStatsOfLiveGame')));
};
