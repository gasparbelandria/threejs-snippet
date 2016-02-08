define('app', [
    'angular',
    'uiRouter',
    'uiBootstrap'
], function (ng) {
    'use strict';
    return ng.module('app', ['ui.router', 'ui.bootstrap']);
});
