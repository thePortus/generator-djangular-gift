(function() {

    'use strict';

    (function() {
        describe('<%= classifiedControllerName %> Controller Tests', function() {

            var <%= classifiedControllerName %>
            Controller, scope, $httpBackend;

            beforeEach(module(ApplicationConfiguration.name));

            beforeEach(inject(<%= classifiedControllerName %>Controller));

            function <%= classifiedControllerName %>Controller($controller, $rootScope, _$httpBackend_, _ <%= camelizedModuleName %>
                FakeData_) {
                scope = $rootScope.$new();
                $httpBackend = _$httpBackend_;
                <%= classifiedControllerName %>Controller = $controller('<%= classifiedControllerName %>Controller', {
                    $scope: scope
                });

                it('should be testable', <%= classifiedControllerName %>ControllerTestable);

                function <%= classifiedControllerName %>ControllerTestable() {
                    expect(<%= classifiedControllerName %>Controller).toBeDefined();
                })

            }

        });
    }());

})();
