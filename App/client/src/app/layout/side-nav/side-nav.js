(function(){
    'use strict';

    var MODULE_NAME = 'app.layout.side-nav';

    var appServices = require('services/app.services');

    require('./side-nav.scss');
    require('angular-material-sidenav');
    require('angular-material-sidenav/angular-material-sidenav.css');

    angular.module(MODULE_NAME, [
        'sasrio.angular-material-sidenav',
        appServices
    ]).config(Config).controller('SidenavCtrl', Controller);

    /* @ngInject */
    function Config(ssSideNavSectionsProvider, $mdThemingProvider) {
        ssSideNavSectionsProvider.initWithSections([{
            id:'app.dashboard',
            name:'Dashboard',
            state:'app.dashboard',
            type:'link'
        },
            {
                id:'app.widgets',
                name:'Widgets',
                state:'app.widgets',
                type:'link'
            }]);


    };

    /* @ngInject */
    function Controller($scope,AppServices,ssSideNav) {

        $scope.menu = ssSideNav;

        $scope.logout = function () {
            AppServices.auth.logout();
        };

        ssSideNav.setVisible('app.dashboard');
        ssSideNav.setVisibleFor([{
            id: 'app.dashboard',
            value: true
        }]);

    };

    module.exports = MODULE_NAME;

})();