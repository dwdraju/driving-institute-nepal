process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
chai = require('chai'),
chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should(),
assert = chai.assert,
expect = chai.expect;

var server = require('../app'),
Model = require('../models/model');
describe('Drivings', function(){
	Model.collection.drop();
	beforeEach(function(done){
		var newData = new Model({
			title: 'Kantipur Driving',
			permalink: 'kantipur-driving',
			phone: '018746575',
			mobile: '9848576874',
			bike: 'true',
			car: 'false',
			other: 'true',
			bike_num: '4',
			car_num: '8',
			bike_cost: '400',
			other_sp: 'Truck',
			coordinate: '27.434, 43.232',
			location: 'Baneshwor',
			description: 'This is very good'
		});
		newData.save(function(err) {
			done();
		});
	});
	afterEach(function(done){
		Model.collection.drop();
		done();
	});

	it('should return status 200 on homepage GET', function(done){
		chai.request(server)
		.get('/')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		})
	});

	it('should list one post on /centres/<permalink> GET', function(done) {
		var newData = new Model({
			title: 'Himalaya Driving',
			permalink: 'himalaya-driving',
			location: 'Baneshwor',
			phone: '9847576'
		});
		newData.save(function(err, data) {
			chai.request(server)
			.get('/centres/'+data.permalink)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('_id');
				res.body.should.have.property('title');
				res.body.should.have.property('permalink');
				res.body.should.have.property('location');
				res.body.should.have.property('phone');
				assert.typeOf(res.body.title, 'string', 'title is string');
				assert.typeOf(res.body.phone, 'number', 'phone is number');
				res.body.title.should.equal('Himalaya Driving');
				res.body.location.should.equal('Baneshwor');
				res.body._id.should.equal(data.id);
				done();
			});
		});
	});

	it('should list all centres on /centres GET', function(done) {
		chai.request(server)
		.get('/')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body[0].should.have.property('_id');
			res.body[0].should.have.property('phone');
			expect(res.body[0]).to.have.property('title');
			expect(res.body[0].title).to.be.a('string');
			expect(res.body[0].phone).to.be.a('number');
			res.body[0].title.should.equal('Kantipur Driving');
			done();
		});
	});
	it('should add a centre on /add POST', function(done) {
		chai.request(server)
		.post('/centres')
		.send({'title': 'Himalaya Driving Institute',
			'permalink': 'himalaya-driving-institute',
			'phone': "948934934",
			'location': 'Jorpati'})
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('Success');
			res.body.Success.should.be.a('object');
			res.body.Success.should.have.property('title');
			res.body.Success.should.have.property('location');
			res.body.Success.should.have.property('phone');
			res.body.Success.should.have.property('_id');
			expect(res.body.Success.title).to.equal('Himalaya Driving Institute');
			Number.isInteger(res.body.Success.phone).should.be.true;
			done();
		});
	});  
	it('should update a centre on /centres/edit<id> PUT', function(done) {
		chai.request(server)
		.get('/centres')
		.end(function(err, res){
			chai.request(server)
			.post('/centres/edit/'+res.body[0].permalink)
			.send({'title': 'Test Title',
				'permalink': 'test-title',
				'phone': '948934934',
				'location': 'Jorpati'})
			.end(function(error, response){
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.a('object');
				response.body.should.have.property('UPDATED');
				response.body.UPDATED.should.be.a('object');
				response.body.UPDATED.should.have.property('title');
				response.body.UPDATED.should.have.property('_id');
				expect(response.body.UPDATED.title).to.equal('Test Title');
				expect(response.body.UPDATED.location).to.equal('Jorpati');
				done();
			});
		});
	});  
	it('should delete a post on /centres/delete/<permalink> DELETE', function(done) {
		chai.request(server)
		.get('/centres')
		.end(function(err, res){
			chai.request(server)
			.get('/centres/delete/'+res.body[0].permalink)
			.end(function(error, response){
				should.not.exist(error);
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.an('object');
				response.body.should.have.property('REMOVED');
				response.body.REMOVED.should.be.a('object');
				response.body.REMOVED.should.have.property('title');
				response.body.REMOVED.should.have.property('_id');
				response.body.REMOVED.should.have.property('phone');
				response.body.REMOVED.should.have.property('location');
				response.body.REMOVED.title.should.equal('Kantipur Driving');
				done();
			});
		});
	});   

});