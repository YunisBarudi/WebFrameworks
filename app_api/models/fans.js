const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const fanSchema = new Schema({
  username: { type: String, required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },  // Reference to Club schema (favorite club)
  clubName: { type: String, required: true },
  password: { type: String, required: true },  // Make sure to hash the password before saving
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false, select: true }  // Ensure isAdmin is included
});

// Hash the password before saving the fan
fanSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
fanSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

const Fan = mongoose.model('Fan', fanSchema);
module.exports = Fan;