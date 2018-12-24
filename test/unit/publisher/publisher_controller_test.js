'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('publisher.module'));
  
  describe('PublisherCtrl', function(){
    var PublisherCtrl, Publisher,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Publisher service
    	Publisher = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'publisher1'});
    			return deferred.promise;
    		}
    	};
		
				PublisherCtrl = $controller('PublisherCtrl', {
    		'Publisher': Publisher,
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
    	expect($scope.publisher).toBeNull();
    	expect($scope.publishers).toBe('publisher1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPublisherList', function() {
    	// given
    	Publisher.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'publisher2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPublisherList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.publishers).toBe('publisher2');
    });
    
    it('refreshPublisher', function() {
    	// given
    	Publisher.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'publisher'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPublisher('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.publisher).toBe('publisher'+'1');
    });
    
	it('goToPublisherList', function() {
    	// given
    	spyOn($scope, "refreshPublisherList");
    	
    	// when
    	$scope.goToPublisherList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPublisherList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/publisher');
    });
    
    it('goToPublisher', function() {
    	// given
    	spyOn($scope, "refreshPublisher");
    	var id = 1;
    	
    	// when
    	$scope.goToPublisher(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPublisher).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/publisher'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.publisher = {id:'1', name:'publisher'};
    	
    	$scope.mode = 'create';
    	Publisher.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'publisherSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.publisher).toBe('publisherSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.publisher = {id:'1', name:'publisher'};
    	
    	$scope.mode = 'update';
    	Publisher.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'publisherSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.publisher).toBe('publisherSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Publisher.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPublisherList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPublisherList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : publisher create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/publisher/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.publisher).toBeNull();
    	expect($scope.publishers).toBe('publisher1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});