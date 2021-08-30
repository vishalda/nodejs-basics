const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const patientModel = new mongoose.Schema({
	description:{
		type:String
	},
	isAccepted:{
		type:Boolean,
		default:false
	},
	_did:{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'volunteer'
	},
	_uid:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('patient',patientModel);
