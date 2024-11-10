const mongoose = require('mongoose');

const markaModelsSchema = new mongoose.Schema(
 {
  markaId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Marka',
   required: true
  },
  position: {
   type: Array
  }
 }
)

module.exports = mongoose.model('MarkaModels', markaModelsSchema)