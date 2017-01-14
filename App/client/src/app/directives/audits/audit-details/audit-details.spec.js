var module = require('./user-scac-details');

describe('user-scac-details', function() {

    var ctrl;
    beforeEach(function() {
        angular.mock.module(module);

        angular.mock.inject(function($rootScope,$controller){

            var scope = $rootScope.$new()
            ctrl = $controller('UserScacDetailsCtrl',{$scope:scope,user_scac_data:{}});
        });
    });

    it("has a controller", function() {
        expect(ctrl).toBeObject();
    });
});