var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email: String,
  friendName: String,
  friendEmail: String,
  taskCompleted: {type: Number, default: 0}
});

UserSchema.methods.complete = function(cb) {
  this.taskCompleted += 1;
  this.save(cb);
};

mongoose.model('User', UserSchema);
