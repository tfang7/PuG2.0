function(){
	var app = angular.module('PUG', ['directives']);

	app.controller('userController', function(){
		this.profile = profileData;
	});

	app.controller('eventController', function(){
		this.events = eventData;
	});

	app.controller('ReviewController', function(){
		this.review = {};
		this.addReview = function(event) {
     		event.reviews.push(this.review);
     	}
      	this.review = {};
	});

	var profileData = {};
	var eventData = {};
	var profileData = {};

};