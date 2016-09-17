// wrapper
(function() {

    'use strict';

    angular.module('<%= slugifiedModuleName %>')
        .directive('<%= camelizedName %>', <%= camelizedName %>);

    function <%= camelizedName %> (staticPath) {
        var directive = {
            templateUrl: staticPath('<%= slugifiedModuleName %>/templates/<%= slugifiedModuleName %>.<%= slugifiedName %>.template.html'),
            // variables to pass to directive controller
            scope: {
                // foo: '=',
                // bar: '=',
            },
            controller: <%= camelizedName %>Controller,
            controllerAs: 'vm',
            bindToController: true // b/c isolated scope
        };
        return directive;
    }

    /* CONTROLLER FUNCTION */
    function <%= camelizedName %>Controller() {
            /* jshint validthis: true */
            var vm = this;

            /* PROPERTY & METHOD DEFINITIONS */
            //vm.foo = 'bar';
            vm.initialize = initialize;

            /* INITIALIZATION */
            vm.initialize();


            function initialize() {

                // POST CONTROLLER-LOAD LOGIC GOES HERE

            }


            /* FUNCTIONS */

        }
        /* /CONTROLLER FUNCTION */
})(); // end wrapper
