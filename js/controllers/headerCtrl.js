define('headerctrl', ['app'], function (app) {

    'use strict';

    app.controller('headerController', ['$window', '$location', '$scope', '$state', function($window, $location, $scope, $state){

        $scope.options = ['cannon', 'quaternion', 'basics'];

        $scope.gotooption = function(option){
            switch (option) {
                case 'basics':
                    $state.go('app', {}, {reload: true});
                    break;
                case 'cannon':
                    $state.go('app.cannon', {}, {reload: true});
                    break;
                case 'quaternion':
                    $state.go('app.quaternion', {}, {reload: true});
                    break;
            }

        }

    }]);

});