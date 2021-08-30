const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Volunteer = mongoose.model('volunteer');
const Patient = mongoose.model('patient');

exports.baseRoute = async(req,res)=>{
	res.send("server up and running");
}

exports.RegisterUser = async(req,res)=>{
	try{
		const {name,bio,email,username,password,phone,address} = req.body;

		if(!(email && bio && password && username && name && address && phone)){
			res.status(400).send("All input are required");
		}

		const oldUser1 = await User.findOne({email});
		const oldUser2 = await User.findOne({username});

		if(oldUser1 || oldUser2){
			return res.status(409).send("User already exist. Please Login");
		}

		enCryptedUserPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name: name,
			email: email,
			password: enCryptedUserPassword,
			username: username,
			phone: phone,
			address: address,
            bio: bio,
		});
		
		const token = jwt.sign(
			{user_id: user._id,email},
			process.env.TOKEN_KEY,
			{
				expiresIn: "5h",
			}
		);

		user.token = token;

		user.save();

		res.status(201).json(user);
	}catch(err){
		console.log(err);
	}
};

exports.GetUserDetails = async(req,res)=>{
	const data = await User.find();
	res.json(data);
}

exports.LoginUser = async(req,res)=>{
	try{
		const {email,username,password} = req.body;
		
		if(!(email,password,username)){
			res.status(400).send("All input is required");
		}
		
		const user = await User.findOne({email});
		if(user && (await bcrypt.compare(password,user.password))){
			const token = jwt.sign(
				{user_id: user._id, email},
				process.env.TOKEN_KEY,
				{
					expiresIn:"5h",
				}
			);
			user.token = token;
			user.save();
			return res.status(200).json(user);
		}
		return res.status(400).send("Invalid Credentials");
	}catch{
		return res.status(500).send("Something went wrong");
	}
}

exports.LogoutUser = async(req,res)=>{
	try{
		const {email}= req.body;
		if(!email){
			res.status(400).send("Email field missing");
		}
		
		const user = await User.findOne({email});
		if(user){
			user.token=null;
			user.save();
			return res.status(200).json(user);
		}
		return res.status(400).send("No user");
	}catch{
		return res.status(500).send("Something went wrong");
	}
}

exports.CreateVolunteer = async(req,res)=>{
	try{
		const {experience,uid} = req.body;
		if(!(experience,uid)){
			res.status(400).send("Provide every field");
		}

		const volunteer = await Volunteer.create({
			experience:experience,
			_uid:uid
		});

		if(volunteer){
			return res.status(400).json(volunteer);
		}
		return res.status(200).send("Volunteer not created");
	}catch{
		return res.status(500).send("Something went wrong");
	}
}

exports.AssignUser = async(req,res)=>{
	try{
		const {pid,uid} = req.body;
		if(!(pid,uid)){
			res.status(400).send("Provide every field");
		}

		const volunteer = await Volunteer.findOne({_uid:uid});
		if(volunteer){
			volunteer._pid = pid;
			volunteer.isAccepted = true;
			volunteer.isAvailable = false;
			volunteer.save();
			return res.status(200).json(volunteer);
		}
		return res.status(400).send("Try again");
	}catch{
		return res.status(400).send("Something went wrong");
	}
}

exports.UnAssignUser = async(req,res)=>{
	try{
		const {uid} = req.body;
		if(!(uid)){
			res.status(400).send("Provide every field");
		}
		const volunteer = await Volunteer.findOne({_uid:uid});
		if(volunteer){
			volunteer._pid = null;
			volunteer.isAccepted = false;
			volunteer.isAvailable = true;
			volunteer.save();
			return res.status(200).json(volunteer);
		}
		return res.status(400).send("Try again");
	}catch{	
		res.status(400).send("Something went wrong");
	}
}

exports.CreatePatient = async(req,res)=>{
	try{
		const {description,uid,did} = req.body;
		if(!(description,uid,did)){
			res.status(400).send("Provide every field");
		}
		const patient = await Patient.create({
			description:description,
			_uid:uid,
			_did:did,
			isAccepted:false,
		});
		if(parient){
			return res.status(200).json(patient);
		}
		return res.status(400).send("Try again");
	}catch{
		res.status(400).send("Something went wrong");
	}
}

			
