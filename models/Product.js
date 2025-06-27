const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  category: { type: String },
  isNew: { type: Boolean, default: false },
  colors: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
