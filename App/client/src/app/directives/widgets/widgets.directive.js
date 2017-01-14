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

    var MODULE_NAME = 'app.widgets.directive';

    angular.module(MODULE_NAME, [
        'api.services',
        'datatables',
        'ui.router'
    ]).directive('appWidgets', Directive);

    /* @ngInject */
    function Link(scope, element, attrs, controller) {

        // scope.$watch(attrs.shipments, function (shipments) {
        //     //console.log('value changed, new value is: ' + v);
        //
        //     //controller.updateShipments(shipments)
        // });

    }

    /* @ngInject */
    function Controller($rootScope, $scope, $log,$state, DTOptionsBuilder, DTColumnDefBuilder, AppServices) {

        // this.updateShipments = function (shipments) {
        //
        //     $scope.shipments = shipments;
        //     $log.debug('$scope.shipments: ' + JSON.stringify($scope.shipments,null,2));
        // };

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                $scope.$apply(function () {
                    $scope.onRowSelect(aData);
                });
            });
            return nRow;
        }

        $scope.onRowSelect = function (item) {
            $log.debug('item: ' + JSON.stringify(item, null, 2));

            $state.go('app.shipment-details', {id: item[0]});
        };

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('simple_numbers')
            .withOption('rowCallback', rowCallback)
            .withOption('searching', false);
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0).withOption('className', 'mdl-data-table__cell--non-numeric'),
            DTColumnDefBuilder.newColumnDef(1).withOption('className', 'mdl-data-table__cell--non-numeric'),
        ];

        function Init() {

            //$log.debug('directive: $scope.shipments: ' + JSON.stringify($scope.shipments,null,2));

            /*
            $scope.$watch('shipments', function(newValue, oldValue) {
                $log.debug('directive: $scope.shipments: ' + JSON.stringify($scope.shipments,null,2));
            });
            */
        };

        $scope.getWidgets = function(page, per_page) {
            AppServices.api.widgets.query({
                page: page || 1,
                per_page: per_page || 25
            }, function (result, responseHeaders) {

                //$log.debug('headers: ' + JSON.stringify(responseHeaders(), null, 2))

                var headers = responseHeaders();
                $scope.page = headers["x-page"];
                $scope.per_page = headers["x-per-page"];
                $scope.total = headers["x-total"];
                $scope.total_pages = headers["x-total-pages"];
                
                $scope.data = result;

            }, function (error) {

                $log.error(error);

            }).$promise.finally(function () {

                $rootScope.showActivity = false;

            })

        };

        Init();

    };

    function Directive() {
        return {
            restrict: 'E',
            template: require('./widgets.directive.html'),
            controller: Controller,
            scope: {
                shipments: '='
            },
            link:Link
        };
    };

    module.exports = MODULE_NAME;

})();