import angular from 'angular';
import 'angular-ui-router';

window._ =  require('lodash');

import 'angular-foundation';
import 'angular-cookies';

import 'angular-simple-logger';

import 'angular-google-maps';

// Import Config
import config from './config';

// Import Services
import UserService from './services/user.service';
import TourService from './services/tour.service';
import UploadService from './services/upload.service';

// Import Controllers
import HomeController from './controllers/home.controller';
import NewTourController from './controllers/newTour.controller';
import ListTourController from './controllers/listTours.controller';
import LoginController from './controllers/login.controller';
import LogoutController from './controllers/logout.controller';
import SignupController from './controllers/signup.controller';
import TestController from './controllers/test.controller';

// Import Directives
import newMap from './directives/newMap.directive';
import listMap from './directives/listMap.directive';

angular
  .module('app', ['ui.router', 'mm.foundation', 'ngCookies', 'uiGmapgoogle-maps'])
  .constant('SERVER', {
    URL: 'https://fathomless-savannah-6575.herokuapp.com',
    CONFIG: {
      headers: {}
    }
  })
  .config(config)
  .constant('devURL', ' https://fathomless-savannah-6575.herokuapp.com/')
  // .constant('glocURL', 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBH5nVGZJ9PpIikitg1Q9x11xrSgg3JRlw')
  // .constant('gmapURL', 'url')
  .service('TourService', TourService)
  .service('UserService', UserService)
  .controller('HomeController', HomeController)
  .controller('NewTourController', NewTourController)
  .controller('LoginController', LoginController)
  .controller('LogoutController', LogoutController)
  .controller('SignupController', SignupController)
  .controller('ListTourController', ListTourController)
  .controller('TestController', TestController)
  .directive('newMap', newMap)
  .directive('listMap', listMap)
;

window.initMap = function () {
  angular.bootstrap(document, ['app']);
};