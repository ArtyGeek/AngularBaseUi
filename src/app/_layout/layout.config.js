(function () {
    'use strict';

    angular
        .module('app.layout')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('app', {
                abstract: true,
                views: {
                    '@': {
                        templateUrl: "app/_layout/layout.template.html",
                        controller: "LayoutController"
                    },
                    'header@app': {
                        templateUrl: 'app/_header/header.template.html',
                        controller: 'HeaderController'
                    },
                    'footer@app': {
                        templateUrl: 'app/_footer/footer.template.html'
                    }
                }
            });
        });
})();
