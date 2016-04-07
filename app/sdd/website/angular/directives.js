// Directives store commonly used templates

(function(){
  var app = angular.module('directives', []);

    app.directive("login", function() {
    return {
      restrict: 'E',
      templateUrl: "login.html"
    };
  });




};