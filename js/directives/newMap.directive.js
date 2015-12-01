let newMap = function($state) {
  
  return {
    restrict: 'A',
    replace: true,
    template: '<div id="gmap"></div>',
    // controller: 'NewController as vm',
    // scope: {
    //   map: '=',
    // },
    link: function (scope, element, attrs) {
      var mapCenter = {lat: 50, lng: 2};
      var map, infoWindow;
      var markers = [];
        
      // map config
      var mapOptions = {
        center: mapCenter,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false
      };
        
      // init the map
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

        // Place marker where clicked
        map.addListener('click', function(e) {
          placeMarker(e.latLng, map);
        });

        function placeMarker(latLng, map) {

          var newMarker = new google.maps.Marker({
            position:latLng,
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            title:"This a new marker!",
            icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
          });
          // map.panTo(latLng);
        }
      }

      // show the map and place some markers
      initMap();
      
      setMarker(map);
    }
  };

};

newMap.$inject = ['$state'];

export default newMap;