var module = require('./eta-user');

describe('eta-user', function() {

    var ctrl;
    beforeEach(function() {
        angular.mock.module(module);

        angular.mock.inject(function($controller){

            ctrl = $controller('EtaUserCtrl',{});
        });
    });

    it("has a controller", function() {
        expect(ctrl).toBeObject();
    });
});