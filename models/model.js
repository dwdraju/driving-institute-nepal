var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DrivingSchema = new Schema({
    title: { type: String },
    description: { type: String },
    permalink: {type: String},
});
module.exports = mongoose.model('Driving', DrivingSchema);