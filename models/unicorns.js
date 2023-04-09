const mongoose = require('mongoose');
const unicornSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    loves: [String],
    weight: Number,
    gender: String,
    vampires: Number
  });

const unicornModel = mongoose.model('unicorns', unicornSchema);

module.exports = unicornModel;