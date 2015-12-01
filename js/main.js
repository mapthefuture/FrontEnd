import angular from 'angular';
import 'angular-ui-router';
import 'angular-foundation';

// Import Config
import config from './config';

// Import Services
import ListTourService from './services/listTours.service';

// Import Controllers
import HomeController from './controllers/home.controller';
import NewController from './controllers/new.controller';
import ListTourController from './controllers/listTours.controller';

// Import Directives
import newMap from './directives/newMap.directive';
import listMap from './directives/listMap.directive';

angular
  .module('app', ['ui.router', 'mm.foundation'])
  .config(config)
  .service('ListTourService', ListTourService)
  .controller('HomeController', HomeController)
  .controller('NewController', NewController)
  .controller('ListTourController', ListTourController)
  .directive('newMap', newMap)
  .directive('listMap', listMap)
;