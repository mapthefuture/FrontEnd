import jquery from 'jquery';

let HomeController = function($scope, UserService, $state) {

  let vm = this;

  vm.city = 'the world';

  $scope.logmeout = function() {
    UserService.logout();
  };  

  $scope.findTour = function(){
    $state.go('root.list');
  };

  $scope.newTour = function(){
    $state.go('root.new');
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

  var city;

  // Find location
  var onSuccess = function(position) {
    $scope.map.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    $scope.$apply();

    // Get city
    jquery.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=false',
      success: function(data){
        var formatted = data.results;
        var address_array = formatted[6].formatted_address.split(',');
        vm.city = address_array[0];
      }
    });
  };
  function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

};

HomeController.$inject = ['$scope', 'UserService', '$state'];

export default HomeController;