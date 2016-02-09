define('headerctrl', ['app'], function (app) {

    'use strict';

    app.controller('headerController', ['$window', '$location', '$scope', '$state', function($window, $location, $scope, $state){
        console.clear();

        //console.log($location);
        //console.log($location.$$absUrl);
        //var t = $location.$$absUrl.replace($location.$$url, '/');
        //console.warn(t);

        $scope.options = [
            {name:'cannon', link: $location.$$absUrl.replace($location.$$url, '/') + 'cannon'},
            {name:'quaternion', link: $location.$$absUrl.replace($location.$$url, '/') + 'quaternion'},
            {name:'basics', link: $location.$$absUrl.replace($location.$$url, '/') + 'basics'}
            ];

        console.log($scope.options);
    }]);

});