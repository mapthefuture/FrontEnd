let newMap = function($state, TourService, $compile) {
  
  return {
    restrict: 'EA',
    replace: true,
    template: '<div id="newMap"></div>',
    controller: 'NewTourController as vm',

    link: function (scope, element, attrs, vm) {

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
      // var uniqueId = Date.now();
        
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

        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        TourService.markerData = {
          latitude: lat,
          longitude: lon,
          id: vm.tourId
        };

        // map.panTo(latLng);
        
        // adds markers to array
        markers.push(marker);

        var contentString = 
        `<div class="markerForm" ng-controller="NewTourController as vm">
            <form class="newForm" ng-submit="vm.submitSiteForm(site)">
              <input ng-model="site.title" type="text" placeholder="Title">
              <textarea ng-model="site.description" type="text" placeholder="Description"></textarea>
              <div>Add image<input type="file" id="siteImage"></div>
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

newMap.$inject = ['$state', 'TourService', '$compile'];

export default newMap;