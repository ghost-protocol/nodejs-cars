//declare PORT for connection or use default host port
var PORT = process.env.PORT||3000;
var express = require('express');
var bodyParser= require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');

//application root/home
app.get('/', function(request, response){
	var cars = {};
	db.car.findAll({}).then(function (cars) {
		response.render('pages/index.ejs', {cars});
	});
});

app.post('/addCar', function(request, response) {
	var body = _.pick(request.body, 'name', 'manufacturer', 'details');
	//console.log(body);
	db.car.create(body).then(function (car) {
		console.log('Records saved to database');
		response.redirect('/');
	});
});

app.put('/edit/:id', function(request, response){
	//console.log('XXXXXX');
	//response.render('pages/edit');
	// var carId = parseInt(request.params.id, 10);
	// var body = _.pick(request.body, 'name', 'manufacturer', 'details');
	// var attributes = {};

	// db.car.findOne({
	// 	where: {
	// 		id: carId
	// 	}
	// }).then(function (car) {
	// 	if(car){
	// 		car.update(attributes).then(function(car){
	// 			response.json(car.toJSON());
	// 		});
	// 	}

	// 	//console.log(carId);


	// });
});

//DELETE /:id
app.get('/deleteCar/:id', function(request, response){
	var carId = parseInt(request.params.id, 10);
	//response.render('pages/deleteCar');
	//console.log(carId);

	db.car.destroy({
		where: { id: carId }
	}).then(function (rowsDeleted){
		if(rowsDeleted === 0) {
			console.log("No rows")
		}
	});
	console.log("car removed");
	response.redirect("/");
});


// app.get('/edit', function(request, response) {
// 	console.log('EDIT!!');
// 	response.render(pages/edit);
// });

// app.post('/', function(request, response) {
// 	db.car.save(request.body, (result) {
// 		var carname = request.body.carname;
// 		var manufacturer = request.body.manufacturer;
// 		var detail = request.body.detail;
// 	// if (err) return(console.log(err));
// 		console.log(carname + " " + manufacturer + " " + detail);
// 	//response.send(request.body.name);
// 	//response.redirect('/');
	
// 	});
// });

// app.post('/car', (request, response){
// 	db.car.save(request.body, (err, response){
// 		//if(err)	return(console.log(err));
// 		console.log('saved to database');
// 		response.redirect('/');
// 	});
// });


//sync:true(always recreate table), sql logging and add promise callback the listen on defined PORT for connections
db.sequelize.sync({logging: console.log}).then(function (){
//db.sequelize.sync({force: true, logging: console.log}).then(function (){
	app.listen(PORT, function () {
		console.log('server started on port ' + PORT + '!');
		});
	});

// //manual test
// //create car table+columns, using sequelize ORM syntax
//  var Car = db.sequelize.define('car', {
//  	name: db.Sequelize.STRING,
//  	manufacturer: db.Sequelize.STRING,
//  	details: db.Sequelize.STRING
//  	});

// //manual test
// db.sequelize.sync().then(function() {
// 	return Car.create({
// 		name: 'Rio Lx',
// 		manufacturer: 'Kia',
// 		details: 'saloon, 1.6cc'
// 	});
// }).then (function (mycar) {
// 	console.log(mycar.get({
// 		plain: true
// 	}));
// });