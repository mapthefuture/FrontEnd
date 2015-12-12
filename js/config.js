let config = function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      controller: 'LogoutController',
      templateUrl: 'templates/layout.tpl.html'
    })
    .state('root.home', {
      url: '/',
      controller: 'HomeController as vm',
      templateUrl: 'templates/home.tpl.html'
    })
    .state('root.addtour', {
      url: '/addtour',
      controller: 'NewTourController as vm',
      templateUrl: 'templates/new.tpl.html'
    })
    .state('root.addsites', {
      url: '/addsites',
      controller: 'NewTourController',
      templateUrl: 'templates/newmap.tpl.html'
    })
    .state('root.login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'templates/login.tpl.html'
    })
    .state('root.signup', {
      url: '/signup',
      controller: 'SignupController',
      templateUrl: 'templates/signup.tpl.html'
    })
    .state('root.list', {
      url: '/list',
      controller: 'ListTourController as vm',
      templateUrl: 'templates/listTours.tpl.html'
    })
    .state('root.sites', {
      // url: '/tour/',
      controller: 'ListSiteController as vm',
      templateUrl: 'templates/listSites.tpl.html'
    })
    .state('root.test', {
      url: '/test',
      controller: 'TestController',
      templateUrl: 'templates/test.tpl.html'
    })
  ;
};

config.$inject = ['$stateProvider','$urlRouterProvider'];

export default config;