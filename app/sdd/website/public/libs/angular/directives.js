// Directives store commonly used templates


(function(){
  var app = angular.module('app-directives', []);

 /* app.directive("login", function() {
    return {
      restrict: 'E',
      templateUrl: "login.html"
    };
  });
*/
  app.directive("headerWrapper", function() {
  	return {
  		restrict: 'E',
  		templateUrl: "views/header.html"
  	};
  });




})();