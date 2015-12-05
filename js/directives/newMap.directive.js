let newMap = function($state, MapService, TourService, $compile) {
  
  return {
    restrict: 'EA',
    replace: true,
    template: '<div id="gmap"></div>',
    controller: 'NewTourController as vm',
    // scope: {
    //   map: '=',
    // },
    link: function (scope, element, attrs) {

      var map, infoWindow; 

      var initialLocation = new google.maps.LatLng(27.9881, 86.9253);

      // Find location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(initialLocation);
        });
      }
        
      // map config
      var mapOptions = {
        center: initialLocation,
        zoom: 30,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        // scrollwheel: false,
        streetViewControl: false,

        styles: [{
          featureType: "poi",
          stylers: [
            { visibility: "off" }
          ]
        },
        {
          featureType: "transit",
          stylers: [
            { visibility: "off" }
          ]
        }]
      };
        
   

      var markers = [];
      var uniqueId = 1;
        
      // place a marker
      

      // show the map
      initMap();

      // Place marker where clicked
      map.addListener('click', function(e) {
        setMarker(map, e.latLng);
      }); 

    }
  };
};

newMap.$inject = ['$state', 'MapService', 'TourService', '$compile'];

export default newMap;