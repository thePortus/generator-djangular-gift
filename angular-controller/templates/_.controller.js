/* SCOPE WRAPPER */
(function() {

    'use strict';

    /* ANGULAR CONTROLLER DECLARATION */
    angular.module('<%= slugifiedModuleName %>')
        .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>Controller);


    /* CONTROLLER FUNCTION */
    function <%= classifiedControllerName %>Controller() {
            /* jshint validthis: true */
            var vm = this;

            /* PROPERTY & METHOD DEFINITIONS */
            //vm.foo = 'bar';

            /* INITIALIZATION */
            vm.initialize = initialize;
            vm.initialize();


            function initialize() {

                // POST CONTROLLER-LOAD LOGIC GOES HERE

            }


            /* FUNCTIONS */

        }
        /* /CONTROLLER FUNCTION */
})();
/* SCOPE WRAPPER */
