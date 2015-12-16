import jquery from 'jquery';

let newMap = function($state, TourService, $compile) {
  
  return {
    restrict: 'EA',
    replace: true,
    template: '<div id="newMap"></div>',
    controller: 'NewTourController as vm',
    scope: {
      submitClicked: '='
    },

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
        
      // map config
      var mapOptions = {
        center: initialLocation,
        zoom: 30,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
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
          google.maps.event.trigger(map, 'resize');
        }
      }    
        
      // place a marker
      function setMarker(map, latLng, title, description) {

        // Custom google maps icon
        var icon = new google.maps.MarkerImage(
          "./images/marker.svg",
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(39, 32)
        );  

        // Specifying all properties may fix animation issue with Chrome
        // var image = {
        //   url: './images/marker.svg',
        //   // This marker is 32 pixels wide by 39 pixels tall.
        //   size: new google.maps.Size(32, 39),
        //   // The origin for this image is 0,0.
        //   origin: new google.maps.Point(0,0),
        //   // The anchor for this image is the base of the image at 0,39.
        //   anchor: new google.maps.Point(0, 39)
        // };

        var marker = new google.maps.Marker({
          position:latLng,
          map: map,
          draggable:true,
          // animation: google.maps.Animation.DROP,
          icon: icon,
        });

        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();

        TourService.markerData = {
          latitude: lat,
          longitude: lon,
          id: TourService.tempTourId
        };

        console.log(TourService.markerData);

        // map.panTo(latLng);
        
        // adds markers to array
        markers.push(marker);

        var contentString = 
        `<div class="markerWindow" ng-controller="NewTourController as vm">
            <h4>Add site</h4>
            <form class="markerForm" ng-submit="vm.submitSiteForm(site)" ng-model="submitClicked">
              <input ng-model="site.title" type="text" placeholder="Title">
              <textarea ng-model="site.description" type="text" placeholder="Description"></textarea>
              <div>Add image<input type="file" id="siteImage"></div>
              <button id="submitSite">Submit</button>
            </form>
          </div>`;
        // <button class="deleteButton">Delete marker</button>



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

        // Close infowindow when submitted
        scope.closeWindow = function () {
          infoWindow.close();
          console.log("Close window");
        };
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