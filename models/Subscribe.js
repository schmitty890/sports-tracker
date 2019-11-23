const mongoose = require('mongoose');

// Using the Schema constructor, create a new SubscribeSchema object
const SubscribeSchema = new mongoose.Schema({
  // `body` is of type String
  body: {
    team: {
      type: String,
      validate: [
        (input) => input.length >= 1,
        'team should not be blank.'
      ]
    },
    teamID: {
      type: String,
      validate: [
        (input) => input.length >= 1,
        'teamID should not be blank.'
      ]
    },
    sport: {
      type: String,
      validate: [
        (input) => input.length >= 1,
        'sport should not be blank.'
      ]
    },
    text: {
      type: Boolean,
      default: false
    },
    currentDaysGame: mongoose.Schema.Types.Mixed,
    nextGame: mongoose.Schema.Types.Mixed,
    email: {
      type: Boolean,
      default: false
    },
    date: Number
  }
});

// This creates our model from the above schema, using mongoose's model method
const Subscribe = mongoose.model('Subscribe', SubscribeSchema);

// Export the Subscribe model
module.exports = Subscribe;
