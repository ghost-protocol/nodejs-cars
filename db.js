//require sequelize ORM
var Sequelize = require('sequelize');
//initialize sqlitedb, create/store database
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/cars.sqlite'
});

var db = {};
db.car = sequelize.import(__dirname + '/models/car.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.car.belongsTo(db.car);

module.exports = db;


//manual test
//create car table+columns, using sequelize ORM syntax
// var Car = sequelize.define('car', {
// 	name: Sequelize.STRING,
// 	manufacturer: Sequelize.STRING,
// 	details: Sequelize.STRING
// 	});

// //manual test
// sequelize.sync().then(function() {
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