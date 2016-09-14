(function() {
    'use strict';

    angular.module('<%= slugifiedModuleName %>')
        .factory('<%= camelizedName %>', <%= camelizedName %>);

    // factory wrapper function
    function <%= camelizedName %> () {
        return <%= camelizedName %>
        FactoryCall;

        // factory call function, load angular services as params
        function <%= camelizedName %>
        FactoryCall() {
                return <%= camelizedName %>
                Factory();

                function <%= camelizedName %>
                Factory() {
                        /* jshint validthis: true */
                        var vm = this;

                        // TODO: add factory logic here

                    } // end factory
            } // end factory call
    } // end factory wrapper

})(); // end wrapper
