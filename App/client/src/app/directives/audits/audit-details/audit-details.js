(function () {
    'use strict';
    require('angular-ui-router');
    require('services/api/api.services');

    var MODULE_NAME = 'app.views.audit-details';

    angular.module(MODULE_NAME, [
        'ui.router',
        'app.services'
    ]).config(Config).controller('AuditDetailsCtrl', Controller);

    /* @ngInject */
    function Controller($rootScope, $scope, $log, audit_data, AppServices) {

        $scope.audit = audit_data;
        $log.debug('$scope.audit: ' + JSON.stringify($scope.audit, null, 2));

        function Init() {

        };


        Init();

    };

    /* @ngInject */
    function Config($stateProvider) {
        $stateProvider
            .state('app.audit-details', {
                url: '/audits/:id',
                views: {
                    'container@': {
                        template: require('./audit-details.html'),
                        controller: 'AuditDetailsCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    audit_data: function ($log, $stateParams, AppServices) {

                        //$log.debug('$stateParams: ' + JSON.stringify($stateParams,null,2));
                        return AppServices.api.audits.get({id: $stateParams.id}).$promise;
                    }
                }
            });
    };

    module.exports = MODULE_NAME;

})();