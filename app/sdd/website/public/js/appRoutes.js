// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'EventController'
        })
        .when('/viewprofile',{
            templateUrl: 'views/profile/view.html'
        })
        .when('/manageprofile',{
            templateUrl: 'views/profile/manage.html'
        })
        .when('/contact',{
            templateUrl: 'views/profile/contact.html'
        })
        .when('/faq',{
            templateUrl: 'views/profile/faq.html'
        })
        .when('/login',{
            templateUrl: '/views/modal/login.html'
        })


    $locationProvider.html5Mode(true);

}]);
