(function(){
    'use strict';

    var MODULE_NAME = 'app.views.dashboard';

    angular.module(MODULE_NAME,[
        require('angular-ui-router')
    ]).config(Config).controller('DashboardCtrl',Controller);

    /* @ngInject */
    function Controller($log) {

        var init = function () {

        }

        init();

    };

    /* @ngInject */
    function Config($stateProvider) {
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'container@': {
                        template: require('./dashboard.html'),
                        controller: 'DashboardCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    };

    module.exports = MODULE_NAME;

})();