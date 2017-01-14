(function () {
    'use strict';

    require('angular-ui-router');

    require('services/api/api.services');
    var auditsDirective = require('directives/audits/audits.directive');

    var MODULE_NAME = 'app.views.widgets';

    angular.module(MODULE_NAME, [
        'ui.router',
        'app.services',
        auditsDirective
    ]).config(Config).controller('WidgetsCtrl', Controller);

    /* @ngInject */
    function Controller($rootScope, $scope, $log,AppServices,widgets) {

        $scope.audits = [];
        $scope.widgets = widgets;

        function Init() {

            //$log.debug('user_scac_data: ' + JSON.stringify(user_scac_data,null,2));
            $rootScope.showActivity = true;

            /*
            AppServices.api.widgets.get_default_audits({}, function (result) {

                $scope.audits = result;
                $rootScope.showActivity = false;
            })
            */

        };


        Init();
    };

    /* @ngInject */
    function Config($stateProvider) {
        $stateProvider
            .state('app.widgets', {
                url: '/widgets',
                views: {
                    'container@': {
                        template: require('./widgets.html'),
                        controller: 'WidgetsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    widgets: function (AppServices) {
                        //return AppServices.api.widgets.get_default({}).$promise;
                    }
                }
            });
    };

    module.exports = MODULE_NAME;

})();