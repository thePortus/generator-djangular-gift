// wrapper
(function() {

    'use strict';
    /**
     * <%= classifiedControllerName %> controller
     *
     * Associated view: public/`<%= slugifiedModuleName %>/views/<%= slugifiedModuleName %>.<%= slugifiedViewName %>.view.html`
     */
    angular.module('<%= slugifiedModuleName %>')
        .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>
            Controller);

    function <%= camelizedName %>
    Controller() {

            /* jshint validthis: true */
            var vm = this;

            /* Properties and Methods */
            // vm.foo = bar
            vm.initialize = initialize;

            // Calling initialize() on load
            vm.initialize();

            /* ====== Method Functions ===== */

            /**
             * Initializes controller properties after controller load
             */
            function initialize() {

            } // end initialize()

        } // end controller function

})(); // end wrapper
