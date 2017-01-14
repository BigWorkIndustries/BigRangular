var module = require('./auth.service');

describe('AuthService', function() {

    var AuthService = null;
    beforeEach(function() {
        angular.mock.module(module);

        angular.mock.inject(function(_AuthService_){
            AuthService = _AuthService_;
        });
    });

    it("instantiates", function() {
        expect(AuthService).toBeObject();
    });

});