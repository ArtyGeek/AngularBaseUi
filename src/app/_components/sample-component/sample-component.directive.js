(function(){
    'use strict';

    angular
        .module('app.components.sample-component')
        .directive('sampleComponent', function(){
            return {
                restrict: 'AE',
                scope: {},
                templateUrl: 'app/_components/sample-component/sample-component.template.html',
                link: function(){}
            }
        });
})();
