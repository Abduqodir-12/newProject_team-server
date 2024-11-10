const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
 {
  title: {
   type: String,
   required: true
  },
  regionId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Region',
   required: true
  }
 },
 {
  timestamps: true
 }
)

module.exports = mongoose.model('City', citySchema)