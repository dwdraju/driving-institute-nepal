var DriveModel = require('../models/model');

module.exports = {	
	index: function(req, res, next){
		DriveModel.find({}, function(err, data) {
			if (err) { throw err; }
			else{
				res.json(data);
			}
		});

	},
	add: function(req, res, next){
		var title = req.body.title,
		description = req.body.description;
		console.log(title);
		parameterize = function (s) {
			return s.trim().replace(/[^a-zA-Z0-9-\s]/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
		}
		var permalink = parameterize(title);
		console.log(title+description+permalink);    
		var newData = new DriveModel({
			title: title,
			description: description,
			permalink: permalink
		});
		newData.save(function(err, data) {
			if(err){
				res.json(err);
			}
			else{
				res.json(data);
			}
		});
	},
	each: function(req, res, next){
		DriveModel.findOne({permalink:req.params.id},function(err, data){
			res.send(data);
		});
	}
};