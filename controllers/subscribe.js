const User = require('../models/User');
const Subscribe = require('../models/Subscribe');

/**
 * POST /subscribeToTeam
 * Subscribe to a sports team
 */
exports.postSubscribeToTeam = (req, res, next) => {
  console.log('postSubscribeToTeam');
  console.log(req.body);
  // Create a new comment and pass the req.body to the entry
  Subscribe.create(req.body)
    .then(function(dbSubscribe) {
      // if comment creation success, find article with req.params.id match, associate it with the comment body sent from app.js by pushing it to comments array
      // new true returns updated article
      return User.findOneAndUpdate({ _id: req.params.id }, { $push: { nhl: dbSubscribe._id } }, { new: true });
    })
    .then(function(dbUser) {
      // we were able to successfully update an Article, send it back, otherwise send the error
      res.json(dbUser);
    })
    .catch(function(err) {
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
  .populate("nhl")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
};
