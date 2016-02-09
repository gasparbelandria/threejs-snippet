define('appconfig', [
    'app',
	'appctrl',
	'headerctrl',
	'cannonctrl',
	'quaternionctrl',
	'variables'
], function (app) {
    'use strict';
    setTimeout(function () {
    	app.config(['$stateProvider', '$urlRouterProvider',
				function ($stateProvider, $urlRouterProvider) {

					$stateProvider.state('app', {
						url: '/',
						cache: false,
						views: {
							'header': {
								templateUrl: 'tpl/header.tpl.html',
								controller: 'headerController'
							},
							'content': {
								templateUrl: 'tpl/content_basics.tpl.html',
								controller: 'appController'
							},
							'footer': {
								templateUrl: 'tpl/footer.tpl.html'
							}
						}
                	}).state('app.cannon', {
						url: 'cannon',
						cache: false,
						views: {
							'header@': {
								templateUrl: 'tpl/header.tpl.html',
								controller: 'headerController'
							},
							'content@': {
								templateUrl: 'tpl/content_cannon.tpl.html',
								controller: 'cannonController'
							},
							'footer@': {
								templateUrl: 'tpl/footer.tpl.html'
							}
						}
					}).state('app.quaternion', {
						url: 'quaternion',
						cache: false,
						views: {
							'header@': {
								templateUrl: 'tpl/header.tpl.html',
								controller: 'headerController'
							},
							'content@': {
								templateUrl: 'tpl/content_quaternion.tpl.html',
								controller: 'quaternionController'
							},
							'footer@': {
								templateUrl: 'tpl/footer.tpl.html'
							}
						}
					});



					$urlRouterProvider.otherwise('/');
					}]);
    });
});
