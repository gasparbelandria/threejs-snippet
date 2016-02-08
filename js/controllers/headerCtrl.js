define('headerctrl', ['app'], function (app) {

    'use strict';

    app.controller('headerController', ['$window', '$location', '$scope', '$state', function($window, $location, $scope, $state){

        $scope.options = ['cannon', 'basics'];

        $scope.gotooption = function(option){
            switch (option) {
                case 'basics':
                    $state.go('app');
                    break;
                case 'cannon':
                    $state.go('app.cannon');
                    break;
            }

        }

    }]);

});