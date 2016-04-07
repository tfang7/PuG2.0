// public/js/controllers/NerdCtrl.js
angular.module('EventCtrl', []).controller('EventController', function($scope) {

    $scope.range = function(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
        input.push(i);
    }
    return input;
};

});

