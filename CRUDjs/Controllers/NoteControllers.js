const mongoose = require('mongoose');
const Notes = mongoose.model('notes');

exports.baseRoute = async (req,res)=>{
	res.send('Server up and running');
}

exports.getNotes = async (req,res)=>{
	const data = await Notes.find();
	res.json(data);
}
