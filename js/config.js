let config = function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      abstract: true,
      templateUrl: 'templates/layout.tpl.html'
    })
    .state('root.home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'templates/home.tpl.html'
    })
    .state('root.new', {
      url: '/new',
      controller: 'NewTourController',
      templateUrl: 'templates/new.tpl.html'
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
  ;
};

config.$inject = ['$stateProvider','$urlRouterProvider'];

export default config;