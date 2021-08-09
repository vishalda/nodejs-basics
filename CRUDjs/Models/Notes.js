const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const notesSchema = new mongoose.Schema({
	title:{
		type:String
	},
	content:{
		type:String
	}
});

module.exports = mongoose.model('notes',notesSchema);
