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
		location = req.body.location;
		console.log(title);
		parameterize = function (s) {
			return s.trim().replace(/[^a-zA-Z0-9-\s]/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
		}
		var permalink = parameterize(title);
		console.log(title+location+permalink);    
		var newData = new DriveModel({
			title: title,
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
	}
};