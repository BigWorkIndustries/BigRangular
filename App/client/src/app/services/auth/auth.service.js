/**
 * Created by vincilbishop on 1/21/16.
 */
(function () {
    'use strict';

    require('angular-oauth2');
    require('angular-ui-router');

    var MODULE_NAME = 'auth.service';

    angular.module(MODULE_NAME,[
        'angular-oauth2',
        'ui.router'
    ]).service('AuthService', Service);

    /** @ngInject */
    /**
     * @ngdoc service
     * @name AuthService
     * @requires $rootScope
     * @requires $log
     * @requires $state
     * @requires OAuth
     * @requires $cookies
     * @requires $http
     * @requires $q
     * @requires $timeout
     * @constructor
     */
    function Service($rootScope, $log, $state, OAuth, $cookies, $http, $q, $timeout) {

        var self = this;

        this.isAuthenticated = function () {
            var authenticated = OAuth.isAuthenticated();
            $log.debug('authenticated: ' + authenticated);
            return authenticated;
        };

        this.checkAuthenticated = function () {
            var authenticated = OAuth.isAuthenticated();
            //$log.debug('authenticated: ' + authenticated);
            var deferred = $q.defer();
            deferred.promise.catch(function () {
                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $log.debug('public.sign-in');
                    $state.go('public.sign-in');
                });
            });
            if (authenticated) {
                return deferred.resolve(authenticated);
            } else {
                return deferred.reject(authenticated);
            }
            //return deferred;
        };


        this.redirectIfAuthenticated = function () {
            return $auth.validateUser().then(function (result) {
                var message = 'User authenticated, redirecting';
                $log.debug(message);

                $state.go('app.dashboard');
            }).catch(function () {
                var message = 'User not authenticated, not redirecting';
                $log.debug(message);
            });
        };

        this.login = function (email, password) {
            // Do login here..
            var authInfo = {username: email, password: password};

            $log.debug('OAuth', OAuth);

            return OAuth.getAccessToken(authInfo).then(function (resp) {

                //cookies not auto generated with OAuth
                //$cookies.put('accessToken', resp.data.access_token);
                //$cookies.put('refreshToken', resp.data.refresh_token);
                //$cookies.put('token', resp.data);

                $log.debug(JSON.stringify(resp));
                //$state.go('app.public');


            }).catch(function (resp) {
                $log.error(JSON.stringify(resp));
                alert('Login Failure!');
            });

            /*
             var authInfo = {email: email, password: password};
             $auth.submitLogin(authInfo)
             .then(function (resp) {
             $state.go('app.authenticated.dashboard');

             })
             .catch(function (resp) {
             $log.error(JSON.stringify(resp));
             alert('Login Failure!');
             });
             */

        };

        this.logout = function () {
            // Do logout here..
            OAuth.revokeToken()
                .then(function (resp) {
                    $log.debug(JSON.stringify(resp));
                    // handle success response

                })
                .catch(function (resp) {
                    // handle error response
                    $log.error(JSON.stringify(resp));

                }).finally(function () {
                $state.go('public.sign-in');
            });

        };

        this.register = function (email, password, confirmPassword) {

            var regInfo = {
                user: {
                    email: email,
                    password: password
                }
            };

            $http.post('/api/v1/users', regInfo)

            // var token = OAuth.getAccessToken(regInfo);
            // console.log(token);
            //
            // return $auth.submitRegistration(regInfo)
                .then(function (resp) {

                    $state.go('app.authenticated.dashboard')

                })
                .catch(function (resp) {
                    $log.error(JSON.stringify(resp, null, 2));

                    console.log(resp);
                    // handle error response
                    var message = 'Registration Failure!'

                    if (resp.data.errors.full_messages[0]) {
                        message = resp.data.errors.full_messages[0];
                    }
                    alert(message);
                    //$('#loginFailedModal').modal('show');
                    //$location.path('/login');
                });
        };

        function handleLogin(ev, user) {

            // $log.info('app_auth.Login user: ' + JSON.stringify(user));
            $log.debug('$rootScope.user: ' + JSON.stringify($rootScope.user, null, 2));
            self.authenticated = true;
        }

        function handleLogout(ev, reason) {

            $log.debug('app_auth.Logout reason: ' + JSON.stringify(reason));
            self.authenticated = false;
        }

        $rootScope.$on('auth:validation-success', function (ev, reason) {
            $log.debug('auth:validation-success');
            handleLogin(ev, reason);
        });

        $rootScope.$on('auth:validation-error', function (ev, reason) {
            $log.error('auth:validation-error');
            handleLogout(ev, reason);
        });

        $rootScope.$on('auth:login-success', function (ev, reason) {
            $log.debug('auth:login-success');
            handleLogin(ev, reason);
        });

        $rootScope.$on('auth:login-error', function (ev, reason) {
            $log.debug('auth:login-error');
            handleLogout(ev, reason);
        });

        $rootScope.$on('auth:logout-success', function (ev, reason) {
            $log.debug('auth:logout-success');
            handleLogout(ev, reason);
        });

    };

    module.exports = MODULE_NAME;

}());
