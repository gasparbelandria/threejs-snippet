define('mainctrl', ['app', 'modernizr'], function (app, modernizr) {
    'use strict';
    app.controller('mainController', ['$scope', function($scope){
        if (Modernizr.canvas){
            $scope.mainMessage = '';
        }else{
            $scope.mainMessage = 'Canvas not supported';
        }
    }]);
});

