'use strict';

/**
 * Controller for Publisher
 **/
publisherModule.controller('PublisherCtrl', ['Publisher',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Publisher, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of publishers
    $scope.publishers = [];
	// publisher to edit
    $scope.publisher = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh publishers list
     */
    $scope.refreshPublisherList = function() {
    	try {
			$scope.publishers = [];
        	Publisher.getAll().then(
				function(success) {
        	        $scope.publishers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh publisher
     */
    $scope.refreshPublisher = function(id) {
    	try {
        	$scope.publisher = null;
	        Publisher.get(id).then(
				function(success) {
        	        $scope.publisher = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the publishers list page
     */
    $scope.goToPublisherList = function() {
        $scope.refreshPublisherList();
        $location.path('/publisher');
    }
    /**
     * Go to the publisher edit page
     */
    $scope.goToPublisher = function(id) {
        $scope.refreshPublisher(id);
        $location.path('/publisher/'+id);
    }

    // Actions

    /**
     * Save publisher
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Publisher.create;
			} else {
				save = Publisher.update;
			}
			save($scope.publisher).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.publisher = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete publisher
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Publisher.delete(id).then(
				function(success) {
                	$scope.goToPublisherList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.publisher = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPublisher($routeParams.id);
    } else {
        // List page
        $scope.refreshPublisherList();
    }
    
    
}]);
