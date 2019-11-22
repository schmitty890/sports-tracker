const User = require('../models/User');
const Subscribe = require('../models/Subscribe');

/**
 * POST /subscribeToTeam
 * Subscribe to a sports team
 */
exports.postSubscribeToTeam = (req, res, next) => {
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
  console.log('getSubscribedTeams');
  console.log(req.body);
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
exports.index = async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
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
        const hbsObject = {
          user: subscriptions
        };
        console.log(hbsObject);
        res.render('index', {
          title: 'Home',
          hbsObject
        });
      }
    });
};
