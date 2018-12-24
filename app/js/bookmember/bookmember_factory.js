'use strict';

/**
 * Factory for BookMember
 */
bookMemberModule.factory('BookMember', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage bookMember
    var entityURL = restURL + '/bookMember';
	
	/**
     * Validate bookMember
     * @param bookMember bookMember
     * @throws validation exception
     */
	var validate = function (bookMember) {
		var errors = [];
        if( bookMember.id == null || bookMember.id == '' ) {
			errors.push('bookMember.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all bookMembers as list items
         * @return all bookMembers as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/bookMember');
    	},

        /**
         * Get all bookMembers
         * @return all bookMembers
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get bookMember
         * @param id id
         * @return bookMember
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new bookMember
         * @param bookMember bookMember
         * @return bookMember saved
         */
		create: function(bookMember) {
			validate(bookMember)
			var url = entityURL;
			return $http.post(url, bookMember);
    	},

        /**
         * Update bookMember
         * @param bookMember bookMember
         * @return bookMember saved
         */
    	update: function(bookMember) {
			validate(bookMember)
			var url = entityURL + '/' + bookMember.id;
			return $http.put(url, bookMember);
    	},

		/**
         * Delete bookMember
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

