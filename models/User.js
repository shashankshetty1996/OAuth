const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  contact: {
    type: Number,
    require: true
  },
  country: {
    type: String,
    default: 'India'
  },
  authorizationServerID: {
    type: Schema.Types.ObjectId,
    ref: 'implicitAuth'
  }
});

module.exports = User = mongoose.model('users', UserSchema);
