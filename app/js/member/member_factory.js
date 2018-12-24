'use strict';

/**
 * Factory for Member
 */
memberModule.factory('Member', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage member
    var entityURL = restURL + '/member';
	
	/**
     * Validate member
     * @param member member
     * @throws validation exception
     */
	var validate = function (member) {
		var errors = [];
        if( member.id == null || member.id == '' ) {
			errors.push('member.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all members as list items
         * @return all members as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/member');
    	},

        /**
         * Get all members
         * @return all members
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get member
         * @param id id
         * @return member
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new member
         * @param member member
         * @return member saved
         */
		create: function(member) {
			validate(member)
			var url = entityURL;
			return $http.post(url, member);
    	},

        /**
         * Update member
         * @param member member
         * @return member saved
         */
    	update: function(member) {
			validate(member)
			var url = entityURL + '/' + member.id;
			return $http.put(url, member);
    	},

		/**
         * Delete member
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

