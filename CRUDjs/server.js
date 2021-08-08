
const mongoose = require('mongoose');

require('dotenv').config({path: 'env'});

mongoose.connect(process.env.DATABASE,
	{
	useUnifiedTopology:true,
	useNewUrlParser:true
	}
);

mongoose.Promise = global.Promise;
mongoose.connection.on('error':(err) =>{
	console.error(`Database connection error = ${err}`);
});

const app = require('./app');

const server = app.listen(3000, ()=>{
	console.log(`Express server is up and running on ${server.address().port}`);
})
