const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: Number,
    required: true,
    minlength: 7
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donation'
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
