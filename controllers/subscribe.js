const User = require('../models/User');
const Subscribe = require('../models/Subscribe');
const nhlAPI = require('./nhlAPI');

/**
 * POST /subscribeToTeam
 * Subscribe to a sports team
 */
exports.postSubscribeToTeam = (req, res, next) => {
  // console.log(req.body);
  Subscribe.create(req.body)
    .then((dbSubscribe) => User.findOneAndUpdate({ _id: req.params.id }, { $push: { subscribed: dbSubscribe._id } }, { new: true }))
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
};

/**
 * GET /subscribedTeams
 * Subscribe to a sports team
 */
exports.getSubscribedTeams = (req, res, next) => {
  // console.log('getSubscribedTeams');
  // console.log(req.body);
  User.findOne({ _id: req.params.id })
    .populate('subscribed')
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
};

/**
 * GET /
 * Dashboard page.
 */
exports.index = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  if (req.user.subscribed.length === 0) {
    return res.redirect('/account');
  }

  let hbsObject = {
    user: req.user
  };

  User
    .findOne({ _id: req.user._id })
    .populate({
      path: 'subscribed',
      model: 'Subscribe'
    })
    .exec((err, subscriptions) => {
      if (err) {
        console.log(err);
      } else {
        hbsObject = {
          user: subscriptions
        };

        /**
         * render the dashboard page
         */
        const renderDashboard = () => {
          // console.log(hbsObject.user.subscribed);
          res.render('index', {
            hbsObject
          });
        };

        const getCurrentLiveGameStats = (currentLiveStatsURLs) => {
          console.log(currentLiveStatsURLs);
          const subscribers = hbsObject.user.subscribed;
          const subscribersTeamIDArr = [];
          for (let i = 0; i < currentLiveStatsURLs.length; i++) {
            subscribersTeamIDArr.push(nhlAPI.getCurrentStatsOfLiveGame(currentLiveStatsURLs[i]));
          }
          Promise.all(subscribersTeamIDArr)
            .then((results) => {
              // console.log(results);\
              for (let i = 0; i < results.length; i++) {
                console.log(subscribers[i].body.currentDaysGame.dates.length);
                // console.log(subscribers[i].body.currentDaysGame);
                if (subscribers[i].body.currentDaysGame.dates.length !== 0) {
                  subscribers[i].body.currentDaysGame.dates[0].games[0].liveStats = results[i];
                }
              }
            }).then(() => {
              renderDashboard();
            }).catch((err) => {
              console.log(err);
            });
          // renderDashboard();
        };

        /**
         * getNextMatchup fetches users subscribed teams next matchup by the team id
         */
        const getNextMatchUp = () => {
          const subscribers = hbsObject.user.subscribed;
          const subscribersTeamIDArr = [];
          for (let i = 0; i < subscribers.length; i++) {
            subscribersTeamIDArr.push(nhlAPI.getTeamsNextMatchup(subscribers[i].body.teamID));
          }
          Promise.all(subscribersTeamIDArr)
            .then((results) => {
              // console.log(results);
              for (let i = 0; i < results.length; i++) {
                subscribers[i].body.nextGame = results[i];
              }
              // getCurrentLiveGameStats(subscribersTeamIDArr);
              // renderDashboard();
            }).catch((err) => {
              console.log(err);
            });
        };

        /**
         * getTodaysGame takes users subscribed nhl teams and fetches if they have a game today or not
         *
         */
        const getTodaysGame = () => {
          const subscribers = hbsObject.user.subscribed;
          const subscribersTeamIDArr = [];
          const getLiveDataFeeds = [];
          for (let i = 0; i < subscribers.length; i++) {
            subscribersTeamIDArr.push(nhlAPI.getTeamsCurrentGame(subscribers[i].body.teamID));
          }
          Promise.all(subscribersTeamIDArr)
            .then((results) => {
              for (let i = 0; i < results.length; i++) {
                console.log(results[i].dates.length);
                // if current playing game array is not empty push live feed to get live data feed
                if (results[i].dates.length !== 0) {
                  getLiveDataFeeds.push(results[i].dates[0].games[0].link);
                }

                subscribers[i].body.currentDaysGame = results[i];
              }
              getCurrentLiveGameStats(getLiveDataFeeds);
              getNextMatchUp();
            }).catch((err) => {
              console.log(err);
            });
        };
        getTodaysGame();
      }
    });
};
