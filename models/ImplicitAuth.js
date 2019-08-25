const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImplicitAuthSchema = new Schema({
  clientID: {
    type: String,
    require: true
  },
  applicationName: {
    type: String,
    required: true
  },
  redirectURI: {
    type: String,
    required: true
  }
});

module.exports = ImplicitAuth = mongoose.model(
  'implicitAuth',
  ImplicitAuthSchema
);
