const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinDate: { type: Date, default: Date.now() },
  favourites: { type: [Schema.Types.ObjectId], ref: 'Recipe' }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next(error);
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next;
    }

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }

      this.password = hash;

      return next();
    })
  });
})

module.exports = mongoose.model('User', UserSchema);
