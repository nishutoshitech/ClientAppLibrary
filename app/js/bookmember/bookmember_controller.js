'use strict';

/**
 * Controller for BookMember
 **/
bookMemberModule.controller('BookMemberCtrl', ['BookMember',  'Book', 'Member', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(BookMember, Book, Member, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Book',  'Member',     // edition mode
    $scope.mode = null;
    
	// list of bookMembers
    $scope.bookMembers = [];
	// bookMember to edit
    $scope.bookMember = null;

	// referencies entities
	$scope.items = {};
    // books
	$scope.items.books = [];
    // members
	$scope.items.members = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Book.getAllAsListItems().then(
				function(success) {
        	        $scope.items.books = success.data;
            	}, 
	            MessageHandler.manageError);
		Member.getAllAsListItems().then(
				function(success) {
        	        $scope.items.members = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh bookMembers list
     */
    $scope.refreshBookMemberList = function() {
    	try {
			$scope.bookMembers = [];
        	BookMember.getAll().then(
				function(success) {
        	        $scope.bookMembers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh bookMember
     */
    $scope.refreshBookMember = function(id) {
    	try {
        	$scope.bookMember = null;
	        BookMember.get(id).then(
				function(success) {
        	        $scope.bookMember = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the bookMembers list page
     */
    $scope.goToBookMemberList = function() {
        $scope.refreshBookMemberList();
        $location.path('/bookMember');
    }
    /**
     * Go to the bookMember edit page
     */
    $scope.goToBookMember = function(id) {
        $scope.refreshBookMember(id);
        $location.path('/bookMember/'+id);
    }

    // Actions

    /**
     * Save bookMember
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BookMember.create;
			} else {
				save = BookMember.update;
			}
			save($scope.bookMember).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.bookMember = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete bookMember
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    BookMember.delete(id).then(
				function(success) {
                	$scope.goToBookMemberList();
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
        $scope.bookMember = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBookMember($routeParams.id);
    } else {
        // List page
        $scope.refreshBookMemberList();
    }
    
    
}]);
