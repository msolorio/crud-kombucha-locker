// Load required packages
// mongoose allows us to create models
const mongoose = require('mongoose');

// Define our beer schema
const KombuchaSchema = mongoose.Schema({
	name: String,
	type: String,
	quantity: Number
});

// Expot the Mongoose model
module.exports = mongoose.model('Kombucha', KombuchaSchema);