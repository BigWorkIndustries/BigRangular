/**
 * Created by vincilbishop on 1/21/16.
 */
(function () {
    'use strict';

    require('angular-resource');

    var MODULE_NAME = 'api.audits';

    angular.module(MODULE_NAME,[
        'ngResource'
    ]).service('AuditsService', Service);

    /** @ngInject */
    /**
     * @ngoc service
     * @name AuditsService
     * @requires $resource
     * @param $resource
     * @returns {*}
     * @constructor
     */
    function Service($resource) {
        var path = '/audits';
        var base_path = AppConfig.urls.api + path;
        var url = base_path + '/:id';
        var model =  $resource(url, {id: '@id'}, {
            prune: {method:'DELETE', url:base_path + '/prune'}
        });
        return model;
    };

    module.exports = MODULE_NAME;

}());
