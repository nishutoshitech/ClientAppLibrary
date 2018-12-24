'use strict';

/* Module for BookMember */

var bookMemberModule = angular.module('bookMember.module', ['myApp']);

/**
 * Module for bookMember
 */
bookMemberModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/bookMember',    {templateUrl: 'partials/bookmember/bookmember_list.html', controller: 'BookMemberCtrl'});
    $routeProvider.when('/bookMember/new', {templateUrl: 'partials/bookmember/bookmember_form.html', controller: 'BookMemberCtrl'});
    $routeProvider.when('/bookMember/:id', {templateUrl: 'partials/bookmember/bookmember_form.html', controller: 'BookMemberCtrl'});
}]);
