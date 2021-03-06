(function() {

'use strict';

/**
 * Injected in [module]/tests/[module].[controller].spec.js to provide fake data
 */
angular.module('<%= slugifiedName %>')
    .factory('<%= camelizedName %>FakeData', fakeData);

    function fakeData(coreFakeData) {
        return angular.extend({}, coreFakeData, {
            // TODO: add your own test data here
            foo: 'bar'
        });
    }

})();
