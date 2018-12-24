'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('member.module'));
  
  describe('MemberCtrl', function(){
    var MemberCtrl, Member,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Member service
    	Member = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'member1'});
    			return deferred.promise;
    		}
    	};
		
				MemberCtrl = $controller('MemberCtrl', {
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
    	expect($scope.member).toBeNull();
    	expect($scope.members).toBe('member1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshMemberList', function() {
    	// given
    	Member.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'member2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshMemberList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.members).toBe('member2');
    });
    
    it('refreshMember', function() {
    	// given
    	Member.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'member'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshMember('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.member).toBe('member'+'1');
    });
    
	it('goToMemberList', function() {
    	// given
    	spyOn($scope, "refreshMemberList");
    	
    	// when
    	$scope.goToMemberList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshMemberList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/member');
    });
    
    it('goToMember', function() {
    	// given
    	spyOn($scope, "refreshMember");
    	var id = 1;
    	
    	// when
    	$scope.goToMember(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshMember).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/member'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.member = {id:'1', name:'member'};
    	
    	$scope.mode = 'create';
    	Member.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'memberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.member).toBe('memberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.member = {id:'1', name:'member'};
    	
    	$scope.mode = 'update';
    	Member.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'memberSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.member).toBe('memberSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Member.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToMemberList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToMemberList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : member create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/member/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.member).toBeNull();
    	expect($scope.members).toBe('member1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});