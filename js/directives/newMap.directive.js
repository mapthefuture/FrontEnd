let newMap = function($state, NewTourService, $compile) {
  
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

      var markers = [];
      var uniqueId = 1;
        
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
        
      // init the map
      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }    
        
      // place a marker
      function setMarker(map, latLng, title, description) {

        var marker = new google.maps.Marker({
          position:latLng,
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
        });

        // set unique id
        marker.id = uniqueId;
        uniqueId++;

        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        NewTourService.markerData = {
          latitude: lat,
          longitude: lon,
          id: marker.id
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
          </div>`;
        var compiled = $compile(contentString);
        var scopedHTML = compiled(scope);

        var infoWindow = new google.maps.InfoWindow({
          content: scopedHTML[0]
        });

        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
 
      }

      // show the map
      initMap();

      // Place marker where clicked
      map.addListener('click', function(e) {
        setMarker(map, e.latLng);
      }); 

    }
  };
};

newMap.$inject = ['$state', 'NewTourService', '$compile'];

export default newMap;