(function () {
    'use strict';
    require('services/app.services');
    require('angular-ui-router');

    require('./sign-in.scss');

    var MODULE_NAME = 'app.views.sign-in';

    angular.module(MODULE_NAME, [
        'ui.router',
        'app.services'
    ]).config(Config).controller('SignInCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $state, $log, AppServices) {

        $scope.user = {};

        $scope.signIn = function () {
            AppServices.auth.login($scope.user.username, $scope.user.password).then(function () {
                //$log.debug('AppServices.auth.login.then()')
                $state.go('app.dashboard');
            }).catch(function () {
                $log.debug('not authenticated');
            });
        }

    };

    /* @ngInject */
    function Config($stateProvider) {
        $stateProvider
            .state('public', {
                url: '',
                abstract: true
            })
            .state('public.sign-in', {
                url: '/sign-in',
                views: {
                    'container@': {
                        template: require('./sign-in.html'),
                        controller: 'SignInCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    };

    module.exports = MODULE_NAME;

})();