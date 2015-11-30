import angular from 'angular';
import 'angular-ui-router';
import 'angular-foundation';
import 'angular-cookies';

// Import Config
import config from './config';

// Import Services
import UserService from './services/user.service';

// Import Controllers
import HomeController from './controllers/home.controller';
import NewController from './controllers/new.controller';
import LoginController from './controllers/login.controller';

// Import Directives

angular
  .module('app', ['ui.router', 'mm.foundation', 'ngCookies'])
  .constant('SERVER', {
    URL: 'https://fathomless-savannah-6575.herokuapp.com',
    CONFIG: {
      headers: {}
    }
  })
  .config(config)
  .controller('HomeController', HomeController)
  .controller('NewController', NewController)
  .controller('LoginController', LoginController)
  .service('UserService', UserService)
;