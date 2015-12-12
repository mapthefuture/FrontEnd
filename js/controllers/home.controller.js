import jquery from 'jquery';

let HomeController = function($scope, UserService, $state) {

  // let promise = UserService.checkAuth();

  // if (promise) {
  //   promise.then( (res) => {
  //     console.log(res);
  //     if (res.data.status === 'Authentication failed.') {
  //       // $state.go('root.login');
  //     } else {
  //       $scope.message = 'I am logged in';
  //     }
  //   });
  // }

  // jquery('.container').addClass("homePage");

  $scope.logmeout = function() {
    UserService.logout();
  };  

  $scope.findTour = function(){
    $state.go('root.list');
  };

  $scope.newTour = function(){
    $state.go('root.addtour');
  };

  $scope.map = {
    center: {
      latitude: 27.9881,
      longitude: 86.9253 
    }, 
    options: {
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl:false,
      draggable: false,
      styles: [{
        featureType: "poi",
        elementType: "labels",
        stylers: [
        { visibility: "off" }]
      },
        {
          featureType: "transit",
          stylers: [
            { visibility: "off" }
          ]
        }],
      scrollwheel: false
    },
    mapTypeControl: true,
    zoom: 18,
  };

  // Find location
  var onSuccess = function(position) {
    $scope.map.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    $scope.$apply();
  };
  function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

};

HomeController.$inject = ['$scope', 'UserService', '$state'];

export default HomeController;