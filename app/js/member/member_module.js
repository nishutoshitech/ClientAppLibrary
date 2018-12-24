'use strict';

/* Module for Member */

var memberModule = angular.module('member.module', ['myApp']);

/**
 * Module for member
 */
memberModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/member',    {templateUrl: 'partials/member/member_list.html', controller: 'MemberCtrl'});
    $routeProvider.when('/member/new', {templateUrl: 'partials/member/member_form.html', controller: 'MemberCtrl'});
    $routeProvider.when('/member/:id', {templateUrl: 'partials/member/member_form.html', controller: 'MemberCtrl'});
}]);
