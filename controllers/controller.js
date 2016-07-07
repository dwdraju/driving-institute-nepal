var DriveModel = require('../models/model');

module.exports = {	
	index: function(req, res, next){
		DriveModel.find({}, function(err, data) {
			if (err) { throw err; }
			else{
				console.log(data)
				res.render('index', {result:data});
			}
		});

	},

	add: function(req, res, next){
		var title = req.body.title,
		phone = req.body.phone,
		mobile = req.body.mobile,
		bike = req.body.bike,
		car = req.body.bike,
		other = req.body.other,
		bike_num = req.body.bike_num,
		car_num = req.body.car_num,
		bike_cost = req.body.bike_cost,
		car_cost = req.body.car_cost,
		other_sp = req.body.other_sp,
		coordinate = req.body.coordinate,
		location = req.body.location,
		description = req.body.description
		;
		parameterize = function (str) {
			return str.trim().replace(/[^a-zA-Z0-9-\s]/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
		}
		var permalink = parameterize(title);   
		var newData = new DriveModel({
			title: title,
			phone: phone,
			mobile: mobile,
			bike: bike,
			car: car,
			other: other,
			bike_num: bike_num,
			car_num: car_num,
			bike_cost: bike_cost,
			car_cost: car_cost,
			other_sp: other_sp,
			coordinate: coordinate,
			location: location,
			permalink: permalink
		});
		newData.save(function(err, data) {
			if(err){
				res.json(err);
			}
			else{
				res.redirect('/centres/'+permalink);
			}
		});
	},
	single: function(req, res, next){
		DriveModel.findOne({permalink:req.params.permalink},function(err, data){
			res.render('single',{result:data});
		});
	},

	edit:function(req,res,next){


		
		DriveModel.findOne({permalink:req.params.permalink},function(err, data){
			res.render('edit',{result:data});
		});
		

	},

	save:function(req,res,next){
		var title = req.body.title,
		phone = req.body.phone,
		mobile = req.body.mobile,
		bike = req.body.bike,
		car = req.body.bike,
		other = req.body.other,
		bike_num = req.body.bike_num,
		car_num = req.body.car_num,
		bike_cost = req.body.bike_cost,
		car_cost = req.body.car_cost,
		other_sp = req.body.other_sp,
		coordinate = req.body.coordinate,
		location = req.body.location,
		description = req.body.description,
		permalink = req.params.permalink
		;
		
		
		DriveModel.findOne({permalink: permalink}, function(err, data) {
			if (err)
				res.send(err);
			var newData = new DriveModel({
				title: title,
				phone: phone,
				mobile: mobile,
				bike: bike,
				car: car,
				other: other,
				bike_num: bike_num,
				car_num: car_num,
				bike_cost: bike_cost,
				car_cost: car_cost,
				other_sp: other_sp,
				coordinate: coordinate,
				location: location,
			});
			DriveModel.update({_id:data._id}, newData, function(err, result) {
				if (err)
					res.send(err);
				else{res.redirect('/centres/'+permalink);}                
			});
		});
	}
};

