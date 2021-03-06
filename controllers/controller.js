var DriveModel = require('../models/model');

module.exports = {	
	index: function(req, res, next){
		DriveModel.find({}, function(err, data) {
			if (err) { throw err; }
			else{
				if(process.env.NODE_ENV == 'test'){
					res.json(data);
				}else{
					res.render('index', {result:data});
				}
			}
		});

	},

	add: function(req, res, next){
		var title = req.body.title,
		phone = req.body.phone,
		mobile = req.body.mobile,
		bike = req.body.bike,
		car = req.body.car,
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
				if(process.env.NODE_ENV == 'test'){
					res.json({'Success':data});
				}else
					res.redirect('/centres/'+permalink);
			}
		});
	},
	single: function(req, res, next){
		DriveModel.findOne({permalink:req.params.permalink},function(err, data){
			if(process.env.NODE_ENV == 'test'){
				res.json(data);
			}else{
				res.render('single',{result:data});
			}
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
		car = req.body.car,
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
			if (err){
				res.send(err);
			}
			data.title = title;
			data.phone = phone;
			data.mobile = mobile;
			data.bike = bike;
			data.car = car;
			data.other = other;
			data.bike_num = bike_num;
			data.car_num = car_num;
			data.bike_cost = bike_cost;
			data.car_cost = car_cost;
			data.other_sp = other_sp;
			data.coordinate = coordinate;
			data.location = location;
			data.description = description;

			data.save(function(err, result) {
				if (err){
					res.send(err);
				}
				else{
					if(process.env.NODE_ENV == 'test'){
						res.json({'UPDATED':result});
					}else{
					res.redirect('/centres/'+permalink);
				}
				}       
			});
		});
	},
	delete: function(req, res, next){
		var permalink = req.params.permalink;
		DriveModel.findOne({permalink: permalink}, function(err, data) {
			if (err)
				res.send(err);
			DriveModel.remove({_id:data._id}, function(err, result) {
				if (err)
					res.send(err);
				else{
					if(process.env.NODE_ENV == 'test'){
						res.json({'REMOVED':data});
					}else{
						req.flash('success', 'The centre was successfully deletedd');
						res.redirect("/");
					}
				}                
			});
		});

	}
};

