// wrapper function
(function() {

    'use strict';

    angular.module('<%= slugifiedModuleName %>')
        .filter('<%= camelizedName %>', <%= camelizedName %>);

    function <%= camelizedName %> () {

        return function(input) {

            // TODO: add filter logic here

        }; // end filter logic

    } // end filter function

})(); // end wrapper
