/**
 * Created by vincilbishop on 1/21/16.
 */
(function () {
    'use strict';

    require('angular-resource');

    var MODULE_NAME = 'api.widgets';

    angular.module(MODULE_NAME,[
        'ngResource'
    ]).service('WidgetsService', Service);

    /** @ngInject */
    function Service($resource) {
        var path = '/widgets';
        var base_path = AppConfig.urls.api + path;
        var url = base_path + '/:id';
        var model =  $resource(url, {id: '@id'}, {
            get_default: {method:'GET', url:base_path + '/default'},
            get_default_audits: {method:'GET', url:base_path + '/default/audits',isArray:true}
        });
        return model;
    };

    module.exports = MODULE_NAME;

}());
