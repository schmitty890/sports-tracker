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
          res.render('index', {
            hbsObject
          });
        };

        /**
         * doTeamsHaveGamesToday takes users subscribed nhl teams and fetches if they have a game today or not
         *
         */
        const doTeamsHaveGamesToday = async () => {
          const subscribers = hbsObject.user.subscribed;
          const subscribersTeamIDArr = [];
          for (let i = 0; i < subscribers.length; i++) {
            subscribersTeamIDArr.push(nhlAPI.gameToday(subscribers[i].body.teamID));
          }
          Promise.all(subscribersTeamIDArr)
            .then((results) => {
              for (let i = 0; i < results.length; i++) {
                subscribers[i].body.gameToday = results[i];
              }
              renderDashboard();
            }).catch((err) => {
              console.log(err);
            });
        };

        doTeamsHaveGamesToday();
      }
    });
};
