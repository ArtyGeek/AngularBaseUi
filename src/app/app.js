(function() {
    'use strict';

    var appDependencies = [
        'ui.router',
        'app.layout',
        'app.header',
        'app.footer',
        'app.components',
        'app.sample'
    ];
    angular.module('app', appDependencies); // TODO: change application name to project name
})();
