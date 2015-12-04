let listMap = function($state, ListTourService) {
  
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
        center: initialLocation,/*User's Geolocation*/
        zoom: 12, /*Change based on responsive*/
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
          icon: 'https://d30y9cdsu7xlg0.cloudfront.net/noun-svg/106561.svg?Expires=1449182108&Signature=gkdTF5u4~q03OwNhihL5ECqO84HOENuuul0B1yywnXsbuiLdFhc5IW3buZKn~eU~s29QW5El8bUpMhgnEAOD~xI~jPmN5I3hZ2IaPGM4FzXxc9rDsBB6aV3P0Hf7kUDJiN9GkjXesqXAE8gXwfXQFXhwtUwbW0fcue6EC2wYPVU_&Key-Pair-Id=APKAI5ZVHAXN65CHVU2Q'
        };

        marker = new google.maps.Marker(markerOptions);
        markers.push(marker); // add marker to array
              
        google.maps.event.addListener(marker, 'click', function () {
          // close window if not undefined
          if (infoWindow !== void 0) {
            infoWindow.close();
          }
          // create new window
          var infoWindowOptions = {
            content: content
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);
        });
      }
        
      // show the map and place some markers
      initMap();

      /* Load markers code */
      ListTourService.areaTours().then((res) =>{
        console.log(res);
        var tours = res.data.tours;

        tours.forEach(function (tour) {
          setMarker(map, new google.maps.LatLng(tour.start_lat,tour.start_lon),tour.title,tour.description);
        });
      });
    }
  };

};

listMap.$inject = ['$state', 'ListTourService'];

export default listMap;