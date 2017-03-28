(function () {
    'use strict';

    angular
        .module('app.sample')
        .config(function ($stateProvider) {
            $stateProvider
                .state('app.sample', {
                    url: "/",
                    views: {
                        'content@app': {
                            templateUrl: "app/sample/sample.template.html",
                            controller: "SampleController",
                            controllerAs: "sample"
                        }
                    }
                });
        });
})();
