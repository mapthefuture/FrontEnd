let HomeController = function($scope, UserService, $state) {

  let promise = UserService.checkAuth();

  if (promise) {
    promise.then( (res) => {
      console.log(res);
      if (res.data.status === 'Authentication failed.') {
        $state.go('root.login');
      } else {
        $scope.message = 'I am logged in';
      }
    });
  }

  $scope.logmeout = function() {
    UserService.logout();
  };  

  $scope.findTour = function(){
    $state.go('root.list');
  };

  $scope.newTour = function(){
    $state.go('root.new');
  };

  var initialLocation = new google.maps.LatLng(27.9881, 86.9253);


  var lat = 27.9881;
  var lon = 86.9253;
  var coords;
  // Find location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);



    });
  }

  $scope.map = {
    center: {
      latitude: 40.1451,
      longitude: -99.6680 
    }, 
    options: {
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl:false,
      scrollwheel: false
    },

    mapTypeControl: true,
    zoom: 8,
  };

};

HomeController.$inject = ['$scope', 'UserService', '$state'];

export default HomeController;