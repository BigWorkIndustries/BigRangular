/**
 * Created by vincilbishop on 1/21/16.
 */
(function () {
    'use strict';

    require('./audits/audits.service');
    require('./widgets/widgets.service');

    var MODULE_NAME = 'api.services';

    angular.module(MODULE_NAME, [
        'api.widgets',
        'api.audits'
    ]).service('ApiServices', Service);

    /** @ngInject */
    /**
     * @ngdoc service
     * @name ApiServices
     * @overview Consolidates various API services.
     * @requires WidgetsService
     * @requires AuditsService
     * @constructor
     */
    function Service(WidgetsService,AuditsService) {

        /**
         * @ngdoc property
         * @name widgets
         * @propertyOf ApiServices
         */
        this.widgets = WidgetsService;

        /**
         * @ngdoc property
         * @name audits
         * @propertyOf ApiServices
         */
        this.audits = AuditsService;

    };

    module.exports = MODULE_NAME;

}());
