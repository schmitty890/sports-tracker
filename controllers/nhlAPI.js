const axios = require('axios');

/**
 * GET /gameToday
 * Determine if a team is playing today
 * returns true or false
 */
exports.gameToday = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamID}`;
  return axios.get(url)
    .then(({ data }) => {
      let gameToday = data.totalGames;

      if (gameToday === 1) {
        gameToday = true;
      } else {
        gameToday = false;
      }

      return gameToday;
    })
    .catch(() => Promise.reject(new Error('There was an error while getting player summary')));
};

/**
 * nextMatchup returns a teams next matchup
 */
exports.teamsNextMatchup = (teamID) => {
  const url = `https://statsapi.web.nhl.com/api/v1/teams?teamId=${teamID}&expand=team.schedule.next`;
  return axios.get(url)
    .then(({ data }) => data)
    .catch(() => Promise.reject(new Error('There was an error while getting player summary')));
};
