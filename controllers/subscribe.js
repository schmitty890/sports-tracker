const User = require('../models/User');
const Subscribe = require('../models/Subscribe');

/**
 * POST /subscribeToTeam
 * Subscribe to a sports team
 */
exports.postSubscribeToTeam = (req, res, next) => {
  Subscribe.create(req.body)
    .then((dbSubscribe) => User.findOneAndUpdate({ _id: req.params.id }, { $push: { nhl: dbSubscribe._id } }, { new: true }))
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
  console.log('getSubscribedTeams');
  console.log(req.body);
  User.findOne({ _id: req.params.id })
    .populate('nhl')
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
};
