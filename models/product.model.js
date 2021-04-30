var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	images: String,
	name: String,
	description: String
});
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;