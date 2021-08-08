const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
	title:{
		type:String
	},
	content:{
		type:String
	}
});

let Notes = mongoose.model('notes',notesSchema);

module.exports = Notes;
