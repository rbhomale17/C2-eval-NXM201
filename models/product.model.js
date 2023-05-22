const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number },
    rating: { type: Number }
});


const ProductModel = mongoose.model('product', ProductSchema);

module.exports = {
    ProductModel
};
