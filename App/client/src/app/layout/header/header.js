(function(){
    'use strict';

    var appServices = require('services/app.services');
    require('./header.scss');

    var MODULE_NAME = 'app.layout.header';

    angular.module(MODULE_NAME,[
        appServices
    ]).controller('HeaderCtrl',Controller);

    /* @ngInject */
    function Controller($scope,AppServices) {

        $scope.logout = function () {
            AppServices.auth.logout();
        };

    };

    module.exports = MODULE_NAME;

})();