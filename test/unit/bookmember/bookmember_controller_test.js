'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bookMember.module'));
  
  describe('BookMemberCtrl', function(){
    var BookMemberCtrl, BookMember, Book,  Member, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// BookMember service
    	BookMember = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'bookMember1'});
    			return deferred.promise;
    		}
    	};
		
				Book = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Member = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BookMemberCtrl = $controller('BookMemberCtrl', {
    		'BookMember': BookMember,
						'Book': Book,
						'Member': Member,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.bookMember).toBeNull();
    	expect($scope.bookMembers).toBe('bookMember1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBookMemberList', function() {
    	// given
    	BookMember.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookMember2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookMemberList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.bookMembers).toBe('bookMember2');
    });
    
    it('refreshBookMember', function() {
    	// given
    	BookMember.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'bookMember'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookMember('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.bookMember).toBe('bookMember'+'1');
    });
    
	it('goToBookMemberList', function() {
    	// given
    	spyOn($scope, "refreshBookMemberList");
    	
    	// when
    	$scope.goToBookMemberList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookMemberList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/bookMember');
    });
    
    it('goToBookMember', function() {
    	// given
    	spyOn($scope, "refreshBookMember");
    	var id = 1;
    	
    	// when
    	$scope.goToBookMember(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookMember).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/bookMember'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.bookMember = {id:'1', name:'bookMember'};
    	
    	$scope.mode = 'create';
    	BookMember.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookMemberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookMember).toBe('bookMemberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.bookMember = {id:'1', name:'bookMember'};
    	
    	$scope.mode = 'update';
    	BookMember.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookMemberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookMember).toBe('bookMemberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	BookMember.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBookMemberList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBookMemberList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : bookMember create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/bookMember/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.bookMember).toBeNull();
    	expect($scope.bookMembers).toBe('bookMember1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});