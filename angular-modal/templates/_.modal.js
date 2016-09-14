// wrapper function
(function() {

    'use strict';

    angular.module('<%= slugifiedModuleName %>')
        .factory('<%= camelizedName %>Modal', <%= classifiedName %>
            Modal)
        .controller('<%= classifiedName %>ModalController', <%= classifiedName %>
            ModalController);

    function <%= classifiedName %>
    Modal($modal, staticPath) {

            <%= classifiedName %>
            Modal.open = function(options) {
                return $modal.open(angular.extend({
                    templateUrl: staticPath('<%= slugifiedModuleName %>/templates/<%= slugifiedModuleName %>.<%= slugifiedName %>.template.html'),
                    controller: '<%= classifiedName %>ModalController',
                    controllerAs: 'ctrl',
                    size: '<%= modalSize %>'
                }, options || {}));
            };
            return <%= classifiedName %>
            Modal;

        } // end factory function

    function($scope, $modalInstance) {

        // TODO: add modal controller logic here

    } // end controller function

})(); // end wrapper
