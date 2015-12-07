let listMap = function($state, TourService) {
  
  return {
    restrict: 'A',
    replace: true,
    template: '<div id="listmap"></div>',
    controller: 'ListTourController as vm',
    link: function (scope, element, attrs) {
      var map, infoWindow;
      var markers = [];
      var initialLocation;

      // Find location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          initialLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
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
        
      // Map initialization
      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }    
        
      // place a marker
      function setMarker(map, pos, title, content) {
        var marker;
        var markerOptions = {
          position: pos,
          map: map,
          title: title,
          draggable:true,
          icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        };

        marker = new google.maps.Marker(markerOptions);
        markers.push(marker); // add marker to array
              
        google.maps.event.addListener(marker, 'click', function () {
          // close window if not undefined
          var pos = marker.position;
          if (infoWindow !== void 0) {
            infoWindow.close();
          }
          // create new window
          var infoWindowOptions = {
            content: content
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);

          function clearOtherMarkers(pos) {
            setMapOnAll(null);
            for (var i = 0; i < markers.length; i++) {
              if (markers[i].pos !== pos) {
                //Remove the marker from Map                  
                markers[i].setMap(null);
                return;
              }
            }
          }
        });
      }

      // function setMapOnAll(map) {
      //   for (var i = 0; i < markers.length; i++) {
      //     markers[i].setMap(map);
      //   }
      // }
        
      // show the map and place some markers
      initMap();

      /* Load markers code */
      TourService.areaTours().then((res) =>{
        console.log(res);
        var tours = res.data.tours;

        tours.forEach(function (tour) {
          setMarker(map, new google.maps.LatLng(tour.start_lat,tour.start_lon),tour.title,tour.description);
        });
      });
    }
  };

};

listMap.$inject = ['$state', 'TourService'];

export default listMap;