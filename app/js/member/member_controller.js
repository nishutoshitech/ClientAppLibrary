'use strict';

/**
 * Controller for Member
 **/
memberModule.controller('MemberCtrl', ['Member',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Member, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of members
    $scope.members = [];
	// member to edit
    $scope.member = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh members list
     */
    $scope.refreshMemberList = function() {
    	try {
			$scope.members = [];
        	Member.getAll().then(
				function(success) {
        	        $scope.members = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh member
     */
    $scope.refreshMember = function(id) {
    	try {
        	$scope.member = null;
	        Member.get(id).then(
				function(success) {
        	        $scope.member = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the members list page
     */
    $scope.goToMemberList = function() {
        $scope.refreshMemberList();
        $location.path('/member');
    }
    /**
     * Go to the member edit page
     */
    $scope.goToMember = function(id) {
        $scope.refreshMember(id);
        $location.path('/member/'+id);
    }

    // Actions

    /**
     * Save member
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Member.create;
			} else {
				save = Member.update;
			}
			save($scope.member).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.member = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete member
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Member.delete(id).then(
				function(success) {
                	$scope.goToMemberList();
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
        $scope.member = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshMember($routeParams.id);
    } else {
        // List page
        $scope.refreshMemberList();
    }
    
    
}]);
