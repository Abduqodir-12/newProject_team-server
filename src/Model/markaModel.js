const mongoose = require('mongoose');

const markaSchema = new mongoose.Schema(
 {
  title: {
   type: String,
   required: true
  },
  models: {
   type: Array
  }
 }
)

module.exports = mongoose.model('Marka', markaSchema)