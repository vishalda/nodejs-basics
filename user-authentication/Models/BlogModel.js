const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const BlogModel = new mongoose.Schema({
	title:{
		type:String
	},
	description:{
		type:String
	},
	body:{
		type:String
	},
	_uid:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user'
	},
});

module.exports = mongoose.model('blog',BlogModel);
