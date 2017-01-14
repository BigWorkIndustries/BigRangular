(function () {
    'use strict';

    require('./auth/auth.service');
    require('./api/api.services');

    var MODULE_NAME = 'app.services';

    angular.module(MODULE_NAME, [
        'auth.service',
        'api.services'
    ]).service('AppServices', Service);

    /* @ngInject */
    function Service(AuthService,ApiServices) {
        this.auth = AuthService;
        this.api = ApiServices;
    };

    module.exports = MODULE_NAME;

})();