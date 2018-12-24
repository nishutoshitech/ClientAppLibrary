'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('bookMember.module'));
  
  describe('BookMember', function(){
	var $httpBackend, BookMember, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	BookMember = $injector.get('BookMember');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/bookMember').respond("test");
    	BookMember.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/bookMember').respond("test");
    	BookMember.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/bookMember/1').respond("test");
    	BookMember.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		BookMember.create({id:null,name:'bookMember'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookMember.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/bookMember').respond("test");
    	BookMember.create({id:'1',name:'bookMember'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		BookMember.update({id:null,name:'bookMember'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookMember.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/bookMember/1').respond("test");
    	BookMember.update({id:'1',name:'bookMember'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/bookMember/1').respond("test");
    	BookMember.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});