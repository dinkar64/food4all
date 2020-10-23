const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  donations: [{
    type: Schema.Types.ObjectId,
    ref: 'Donation'
  }],

  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  noFed: {
    type: Number
  },
  noPeople: {
    type: Number
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  certificates: [{
    type: String
  }],
  profilePic: {
    type: String
  },
  avatar: {
    type: String
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  donations: [{
    type: Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  history: [{
    color: String,
    icon: String,
    text: String
  }]

});

userSchema.index({ location: "2dsphere" });

module.exports = User = mongoose.model("User", userSchema);
