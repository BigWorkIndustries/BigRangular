(function () {
    'use strict';

    require('datatables.net');
    require('angular-datatables/dist/angular-datatables');
    require('angular-datatables/dist/css/angular-datatables.css');
    require('material-design-lite/material.css');
    require('dataTables.material');
    require('dataTables.material.css');
    require('angular-ui-router');

    require('services/api/api.services');

    require('./audit-details/audit-details');

    var MODULE_NAME = 'app.audits.directive';

    angular.module(MODULE_NAME, [
        'ui.router',
        'api.services',
        'datatables',
        'app.views.audit-details'
    ]).directive('appAudits', Directive);

    /* @ngInject */
    function Link(scope, element, attrs, controller) {

    }

    /* @ngInject */
    function Controller($rootScope, $scope, $log, $state, DTOptionsBuilder, DTColumnDefBuilder, AppServices) {

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                $scope.$apply(function () {
                    $scope.onRowSelect(aData);
                });
            });
            return nRow;
        }

        $scope.onRowSelect = function (item) {
            //$log.debug('item: ' + JSON.stringify(item, null, 2));

            $state.go('app.audit-details', {id: item[0]});
        };

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('simple_numbers')
            .withOption('rowCallback', rowCallback)
            .withOption('searching', false)
            .withOption('order', [[ 3, "desc" ]]);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).withOption('className', 'mdl-data-table__cell--non-numeric'),
            DTColumnDefBuilder.newColumnDef(2).withOption('className', 'mdl-data-table__cell--non-numeric'),
            DTColumnDefBuilder.newColumnDef(3).withOption('className', 'mdl-data-table__cell--non-numeric')
        ];

        function Init() {

            //$log.debug('directive: $scope.shipments: ' + JSON.stringify($scope.shipments,null,2));

            /*
            $scope.$watch('shipments', function(newValue, oldValue) {
                $log.debug('directive: $scope.shipments: ' + JSON.stringify($scope.shipments,null,2));
            });
            */
        };

        Init();

    };

    /**
     * @ngdoc directive
     * @name appAudits
     * @constructor
     */
    function Directive() {
        return {
            restrict: 'E',
            template: require('./audits.directive.html'),
            controller: Controller,
            scope: {
                audits: '='
            },
            link:Link
        };
    };

    module.exports = MODULE_NAME;

})();

/*
 {
 "id": 2,
 "auditable_id": 1,
 "auditable_type": "EtaUserScac",
 "associated_id": null,
 "associated_type": null,
 "user_id": null,
 "user_type": null,
 "username": null,
 "action": "create",
 "audited_changes": {
 "eta_login_id_prefix": "Tommie7553",
 "eta_user_id": null,
 "scac_id": null,
 "job_id": null
 },
 "version": 1,
 "comment": null,
 "remote_address": null,
 "request_uuid": "50134f15-ba10-443c-87f3-7aed769a5880",
 "created_at": "2017-01-04T00:49:02.378Z"
 }
* */