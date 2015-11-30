import angular from 'angular';
import 'angular-ui-router';
import 'angular-foundation';

// Import Config
import config from './config';

// Import Services

// Import Controllers
import HomeController from './controllers/home.controller';
import NewController from './controllers/new.controller';

// Import Directives

angular
  .module('app', ['ui.router', 'mm.foundation'])
  .config(config)
  .controller('HomeController', HomeController)
  .controller('NewController', NewController)
;