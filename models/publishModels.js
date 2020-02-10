const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    feedback: {
      type: Number,
      default: 0
    },
    last_edition_date: {
      type: String,
      default: 'NULL'
    }
});

const Publish = mongoose.model('publish', schema);
module.exports = Publish;