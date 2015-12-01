import angular from 'angular';
import 'angular-ui-router';
import 'angular-foundation';
import 'angular-cookies';

// Import Config
import config from './config';

// Import Services
import UserService from './services/user.service';
import ListTourService from './services/listTours.service';

// Import Controllers
import HomeController from './controllers/home.controller';
import NewController from './controllers/new.controller';
import ListTourController from './controllers/listTours.controller';
import LoginController from './controllers/login.controller';

// Import Directives
import newMap from './directives/newMap.directive';
import listMap from './directives/listMap.directive';

angular
  .module('app', ['ui.router', 'mm.foundation', 'ngCookies'])
  .constant('SERVER', {
    URL: 'https://fathomless-savannah-6575.herokuapp.com',
    CONFIG: {
      headers: {}
    }
  })
  .config(config)
  .constant('devURL', ' https://fathomless-savannah-6575.herokuapp.com/')
  .constant('glocURL', 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBH5nVGZJ9PpIikitg1Q9x11xrSgg3JRlw')
  .constant('gmapURL', 'url')
  .service('ListTourService', ListTourService)
  .controller('HomeController', HomeController)
  .controller('NewController', NewController)
  .controller('LoginController', LoginController)
  .service('UserService', UserService)
  .controller('ListTourController', ListTourController)
  .directive('newMap', newMap)
  .directive('listMap', listMap)
;

window.initMap = function () {
  angular.bootstrap(document, ['app']);
};