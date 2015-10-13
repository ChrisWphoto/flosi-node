var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username:    String,
  email:       String,
  friendName:  String,
  friendEmail: String,
  task:        String,
  taskCompleted: {type: Number, default: 0},

  facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

UserSchema.methods.complete = function(cb) {
  this.taskCompleted += 1;
  this.save(cb);
};

mongoose.model('User', UserSchema);
