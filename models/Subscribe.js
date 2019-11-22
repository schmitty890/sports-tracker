const mongoose = require("mongoose");

// Using the Schema constructor, create a new SubscribeSchema object
const SubscribeSchema = new mongoose.Schema({
  // `body` is of type String
  body: {
    team: {
      type: String,
      validate: [
        function(input) {
          return input.length >= 1;
        },
        "Subscribe should not be blank."
      ]
    },
    date: Number
  }
});

// This creates our model from the above schema, using mongoose's model method
const Subscribe = mongoose.model("Subscribe", SubscribeSchema);

// Export the Subscribe model
module.exports = Subscribe;