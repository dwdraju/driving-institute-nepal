var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DrivingSchema = new Schema({
    title: { type: String, required: true },
    permalink: {type: String, required: true},
    phone: {type: Number, required: true},
    mobile: {type: Number},
    bike: {type: Boolean, default: false },
    car: {type: Boolean, default: false },
    other: {type: Boolean, default: false },
    bike_num: {type: Number},
    car_num: {type: Number},
    bike_cost: {type: Number},
    car_cost: {type: Number},
    other_sp: {type: String},
    coordinate: {type: String},
    location: { type: String, required: true },
    description: {type: String},
});
module.exports = mongoose.model('Driving', DrivingSchema);