'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('member.module'));
  
  describe('Member', function(){
	var $httpBackend, Member, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Member = $injector.get('Member');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/member').respond("test");
    	Member.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/member').respond("test");
    	Member.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/member/1').respond("test");
    	Member.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Member.create({id:null,name:'member'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('member.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/member').respond("test");
    	Member.create({id:'1',name:'member'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Member.update({id:null,name:'member'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('member.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/member/1').respond("test");
    	Member.update({id:'1',name:'member'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/member/1').respond("test");
    	Member.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});