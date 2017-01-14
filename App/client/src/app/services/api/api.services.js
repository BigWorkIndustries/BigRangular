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
    function Service(WidgetsService,AuditsService) {

        this.widgets = WidgetsService;
        this.audits = AuditsService;

    };

    module.exports = MODULE_NAME;

}());
