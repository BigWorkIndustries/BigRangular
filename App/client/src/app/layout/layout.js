(function(){
    'use strict';

    require('angular-ui-router');
    require('angular-material-sidenav');

    require('./header/header');
    require('./side-nav/side-nav');

    var MODULE_NAME = 'app.layout';

    angular.module(MODULE_NAME,[
        'ui.router',
        'sasrio.angular-material-sidenav',
        'app.layout.header',
        'app.layout.side-nav'
    ]).config(Routes).config(Theme);

    /* @ngInject */
    function Routes($stateProvider, $locationProvider, $urlRouterProvider){
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        template: require('./header/header.html'),
                        controller: 'HeaderCtrl',
                        controllerAs: 'vm'
                    },
                    'sidenav': {
                        template: require('./side-nav/side-nav.html'),
                        controller: 'SidenavCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve:{
                    authenticate: function (AppServices) {

                        /*
                        $log.debug('OAuth: ' + OAuth);
                        $log.debug('OAuth.isAuthenticated(): ' + OAuth.isAuthenticated());
                        return OAuth.isAuthenticated();
                        */
                        return AppServices.auth.checkAuthenticated();
                    }
                }

            });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/dashboard');
    };

    /* @ngInject */
    function Theme($mdThemingProvider,ssSideNavSectionsProvider)
    {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '800' // use shade 200 for default, and keep all other shades the same
            })
            .accentPalette('grey', {
                'default': '400' // use shade 200 for default, and keep all other shades the same
            }).warnPalette('red', {
            'default': '400' // use shade 200 for default, and keep all other shades the same
        });

        ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
    }

    module.exports = MODULE_NAME;

})();