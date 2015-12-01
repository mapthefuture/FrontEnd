let listMap = function($state) {
  
  return {
    restrict: 'A',
    replace: true,
    template: '<div id="gmap"></div>',
    controller: 'FindController as vm',
    link: function (scope, element, attrs) {
      var map, infoWindow;
      var markers = [];
        
      // map config
      var mapOptions = {
        center: new google.maps.LatLng(0 /*User's Geolocation*/, 0 /*User's Geolocation*/),
        zoom: 10, /*Change based on responsive*/
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false
      };
        
      // Map initialization
      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }    
        
      // place a marker
      function setMarker(map, position, title, content) {
        var marker;
        var markerOptions = {
          position: position,
          map: map,
          title: title,
          icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
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
    }
  };

};

listMap.$inject = ['$state'];

export default listMap;