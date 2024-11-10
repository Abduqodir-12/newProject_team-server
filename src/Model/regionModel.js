const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
 {
  title: {
   type: String,
   required: true
  }
 },
 {
  timestamps: true
 }
)

module.exports = mongoose.model('Region', regionSchema)