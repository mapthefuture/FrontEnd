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
      MapService.initMap(mapOptions);

      // Find location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(initialLocation);
        });
      }

      var markers = [];
      var uniqueId = Math.floor(Math.random() * 500) + 1 ;
        
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

      // map.panTo(latLng);
      
      // adds markers to array
      markers.push(marker); 

      var contentString = 
      `<div class="markerForm" ng-controller="NewTourController">
          <form class="newForm" ng-submit="vm.submitForm(site)">
            <input ng-model="site.title" type="text" placeholder="Title">
            <textarea ng-model="site.description" type="text" placeholder="Description"></textarea>
            <input type="checkbox">Is this the tour start?
            <button>Submit</button>
          </form>
          <button class="deleteButton">Delete marker</button>
        </div>`;
      var compiled = $compile(contentString);
      var scopedHTML = compiled(scope);

      var infoWindow = new google.maps.InfoWindow({
        content: scopedHTML[0]
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });

      infoWindow.addListener('domready', function() {


      });

      // show the map
      MapService.initMap();

      // Place marker where clicked
      map.addListener('click', function(e) {
        setMarker(map, e.latLng);
      }); 

    }
  };
};

newMap.$inject = ['$state', 'MapService', 'TourService', '$compile'];

export default newMap;