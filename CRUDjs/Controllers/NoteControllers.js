const mongoose = require('mongoose');
const Notes = mongoose.model('notes');

exports.baseRoute = async (req,res)=>{
	res.send('Server up and running');
}

exports.getNotes = async (req,res)=>{
	const data = await Notes.find();
	res.json(data);
}

exports.createNotes = async (req,res) =>{
	await new Notes(req.body).save((err,data)=>{
		if(err){
			res.status(500).json({
				message:'Database connection error'
			});
		}else{
			res.status(200).json({
				message:'Notes created',
				data,
			});
		}
	});
};

exports.getSingleNote = async (req,res)=>{
	const noteId = req.params.id;
	await Notes.findById({_id:noteId},(err,data)=>{
		if(err){
			res.status(500).json({
				message:'Something went wrong',
			});
		}else{
			res.status(200).json({
				message:"Single note",
				data,
			});
		}
	});
}

exports.updateNote = async (req,res) =>{
	const postId = req.params.id;
	await Notes.findByIdAndUpdate({_id:postId},{$set : req.body},(err,data)=>{
		if(err){
			res.status(500).json({
				message:"Something went wrong",
			});
		}else{
			res.status(200).json({
				message:"Post updated",
				data,
			});
		}
	});
};

exports.deleteNote = async (req,res) =>{
	const postId = req.params.id;
	await Notes.deleteOne({_id:postId},(err,data)=>{
		if(err){
			res.status(500).json({
				message:'Something went wrong',
			});
		}else{
			res.status(200).json({
				message:'Deleted Pose',
				data,
			});
		}
	});
};
