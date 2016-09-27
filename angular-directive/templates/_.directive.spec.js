(function() {

'use strict';

(function() {
    describe('<%= slugifiedName %> directive', function() {
        beforeEach(module(ApplicationConfiguration.name));

        var scope, $elt;

        beforeEach(inject(<%= slugifiedName %>DirectiveInject));

        function <%= slugifiedName %>DirectiveInject($rootScope, _$compile_) {
            scope = $rootScope.$new();
            _.extend(scope, {
                // TODO: populate scope as needed
            });
            <% if (haveTemplate) { %>
            var element = angular.element('<<%= slugifiedName %>></<%= slugifiedName %>>');
            <% } else { %>
            var element = angular.element('<div <%= slugifiedName %>></div>');
            <% } %>
            $elt = _$compile_(element)(scope);
            scope.$digest(); // call watchers

            it('should be usable', <%= slugifiedName %>DirectiveTestable);

            function() <%= slugifiedName %>DirectiveTestable {
                expect($elt).toExist();
            }

        }

    });
})();

})();
