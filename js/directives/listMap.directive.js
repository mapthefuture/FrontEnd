let listMap = function($state, TourService, MapService) {

  return {
    restrict: 'A',
    replace: true,
    template: '<div id="listmap"></div>',
    controller: 'ListTourController as vm',
    link: function (scope, element, attrs) {
      var map, infoWindow;
      var initialLocation;

      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }

      initMap();

      // Find location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          MapService.initialLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          map.setCenter(initialLocation);
        });
      }
        
      // map config
      var mapOptions = {
        center: initialLocation,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
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
        
      // place a marker
      // function setMarker(map, pos, title, content) {
      //   var marker;
      //   var markerOptions = {
      //     position: pos,
      //     map: map,
      //     title: title,
      //     draggable:true,
      //     icon: icon,
      //   };

      //   marker = new google.maps.Marker(markerOptions);
      //   markers.push(marker); // add marker to array
      // }

      // function setMapOnAll(map) {
      //   for (var i = 0; i < markers.length; i++) {
      //     markers[i].setMap(map);
      //   }
      // }

      /* Load markers code */
      TourService.areaTours().then((res) =>{
        console.log(res);
        var tours = res.data.tours;

        tours.forEach(function (tour) {
          MapService.setMarker(MapService.map, new google.maps.LatLng(tour.start_lat,tour.start_lon),tour.title,tour.description);
        });
      });
    }
  };

};

listMap.$inject = ['$state', 'TourService', 'MapService'];

export default listMap;