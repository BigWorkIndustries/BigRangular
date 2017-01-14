(function () {
    'use strict';

    require('angular-material/angular-material.css');
    require('webpack-material-design-icons');

    window.jQuery = window.$ = require('jquery');
    require('angular');
    require('angular-material');
    require('angular-aria');
    require('angular-animate');

    //require('angular-cookies');
    //require('query-string');

    require('oclazyload');

    require('./layout/layout');
    require('./views/sign-in/sign-in');
    require('./views/dashboard/dashboard');

    require('./services/app.services.js');

    require('./app.scss');

    //var AppConfig = require('json-loader!../assets/app.config.json');

    var MODULE_NAME = 'app';

    angular.module(MODULE_NAME, [
        // Vendor Modules
        'ngMaterial',
        'ngAria',
        'ngAnimate',
        'oc.lazyLoad',
        // App Services
        'app.services',
        // App Modules
        'app.layout',
        'app.views.sign-in',
        'app.views.dashboard'
    ]).run(Run).config(Config)

    /* @ngInject */
    function Run($rootScope,$ocLazyLoad){

        $rootScope.showActivity = false;

        $rootScope.$evalAsync(function(){

            require.ensure([],function(){

                require('./views/widgets/widgets');
                $ocLazyLoad.load({name:'app.views.widgets'});

            });
        });
    }

    /* @ngInject */
    function Config($compileProvider,OAuthProvider,OAuthTokenProvider) {

        $compileProvider.preAssignBindingsEnabled(true);

        if (AppConfig.env != 'production') {
            console.log('AppConfig: ' + JSON.stringify(AppConfig,null,2));
        }

        OAuthProvider.configure({
            baseUrl: AppConfig.urls.api,
            clientId: AppConfig.services.oauth.uid,
            grantPath: '/oauth/token',
            revokePath: '/oauth/revoke'
        });

        var secure = true;

        if (location.protocol === 'http:') {
            secure = false;
        }

        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: secure,
                path: '/'
            }
        });

    }

    module.exports = MODULE_NAME;

})();