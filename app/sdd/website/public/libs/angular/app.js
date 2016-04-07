function(){
	var app = angular.module('PUG', ['directives']);

	app.controller('ProfileController', function(){
		this.profile = profileData;
	});

	app.controller('EventController', function(){
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