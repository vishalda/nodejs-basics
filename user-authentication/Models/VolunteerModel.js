const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const volunteerModel = new mongoose.Schema({
	experience:{
		type:String
	},
	isAccepted:{
		type:Boolean,
		default:false
	},
	isAvailable:{
		type:Boolean,
		default:true
	},
	_uid:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user'
	},
	_pid:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('volunteer',volunteerModel);
