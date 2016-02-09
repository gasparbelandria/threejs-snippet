'use strict';
require.config({
    baseUrl: '.',
    waitSeconds: 100,
    paths: {
        'jquery': 'https://code.jquery.com/jquery-2.2.0.min',
        'angular': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min',
        'ngAnimate': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min',
        'ngAria': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min',
        'ngMessage': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min',
        'ngMaterial': 'http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min',
        'domReady': 'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
        'uiRouter': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.17/angular-ui-router.min',
        'uiBootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.1.2/ui-bootstrap-tpls.min',
        'threejs': 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.min',
        'orbitControls': 'http://threejs.org/examples/js/controls/OrbitControls',
        'threexResize': 'js/threex.windowsresize',
        'threexKeyboard': 'js/threex.keyboardstate',
        'threexFirstpersoncontrol': 'js/firstpersoncontrols',
        'cannon': 'https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min',
        'domEvents': 'js/threex.domevents',
        'variables': 'js/services/variables',
        'modernizr': 'js/modernizr-custom',

        // Controller
        'appctrl': 'js/controllers/appCtrl',
        'headerctrl': 'js/controllers/headerCtrl',
        'cannonctrl': 'js/controllers/cannonCtrl',
        'quaternionctrl': 'js/controllers/quaternionCtrl',

        // Application
        'app': 'js/app',
        'appconfig': 'js/appconfig'

    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter': {
            deps: ['angular']
        },
        'uiBootstrap': {
            deps: ['angular']
        },
        'ngAria': {
            deps: ['angular'],
            exports: 'ngAria'
        },
        'ngAnimate': {
            deps: ['angular'],
            exports: 'ngAnimate'
        },
        'ngMaterial': {
            deps: ['angular', 'ngAnimate', 'ngAria'],
            exports: 'ngMaterial'
        },
        'threejs': {
            exports: 'THREE'
        },
        'threexFirstpersoncontrol': {
            deps: ['threejs'],
            exports: 'threexFirstpersoncontrol'
        },
        'orbitControls': {
            deps: ['threejs'],
            exports: 'orbitControls'
        }
    }
});
define("main", [
    'require',
    'angular',
    'app',
    'uiRouter'
], function (require, ng, app) {
    require(['appconfig'], function () {
        require(['domReady!'], function (document) {
            ng.bootstrap(document, ['app']);
        });
    });
});
