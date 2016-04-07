// public/js/app.js
angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'EventCtrl', 'NerdService', 'app-directives']);

$(function(){   $("#login-modal-wrapper").load("/views/modal/login.html");  });
$(function(){   $("#signup-modal-wrapper").load("/views/modal/signup.html");  });
$(function(){   $("#view-modal-wrapper").load("/views/modal/view-event.html");  });

