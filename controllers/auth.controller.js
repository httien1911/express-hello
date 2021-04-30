var db = require('../db');
var md5 = require('md5')
// var cookieParser = require('cookie-parser');
// var shortid = require('shortid');

module.exports.login = function(req, res){
	res.render('auth/login')
}

module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var pass = req.body.pass;

	var user = db.get('users').find({email: email}).value();
	if(!user){
		res.render('auth/login', {
			errors: [
			'User does not exist'
			],
			values: req.body
		});
		return;
	}
	var hashedPass = md5(pass)

	if(md5(user.pass)!==hashedPass){
		res.render('auth/login', {
			errors: [
			'Wrong password.'
			],
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');

}