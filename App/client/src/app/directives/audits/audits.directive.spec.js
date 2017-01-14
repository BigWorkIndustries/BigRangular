var module = require('./shipments.directive');

describe('Shipments Directive', function() {

    var element;
    var scope;
    var compile;
    var defaultData;
    var validTemplate = '<app-shipments shipments="data"></app-shipments>';

    function createDirective($scope, template) {
        var elm

        // Setup scope state
        //scope.data = data || defaultData;
        //scope.data = 99;

        // Create directive
        elm = compile(template || validTemplate)($scope);
        //ps -A | grep 'scope.$digest();
        // Trigger watchers
        //scope.$apply();

        // Return
        return elm;
    }


    beforeEach(function() {
        console.log('beforeEach');
        angular.mock.module(module);

        // Reset data each time
        defaultData = 42;

        /*
        // Provide any mocks needed
        module(function ($provide) {
            //$provide.value('Name', new MockName());
        });
        */

        // Inject in angular constructs otherwise,
        //  you would need to inject these into each test
        angular.mock.inject(function ($rootScope, $compile) {
            console.log('angular.mock.inject');
            scope = $rootScope.$new();
            compile = $compile;

        });
    });

    /*
    // JavaScript
    it('should render the expected output', function () {
        scope.shipments = '{id:1}'
        element = createDirective(scope);
        expect(element.text()).toBe(scope.shipments);
        //expect(scope.message).toBe('this is my directive');
    });

    it('should render the expected output', function () {
        scope.data = '{id:1}'
        element = createDirective(scope);
        //expect(element.text()).toBe('this is my directive');
        expect(scope.shipments).toBe(scope.data);
    });
    */
});