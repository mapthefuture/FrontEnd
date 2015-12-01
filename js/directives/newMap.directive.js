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

      var map, infoWindow; 

      var initialLocation = new google.maps.LatLng(27.9881, 86.9253);

      // Find location
      if (navigator.geolocation) {
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
        scrollwheel: false
      };
        
      // init the map
      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }    
        
      // place a marker
      function setMarker(map, latLng, title, content) {

        var marker = new google.maps.Marker({
          position:latLng,
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"
        });

        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();

        var markerData = {
          lat: lat,
          lng: lng,
          title: title,
        };

        // map.panTo(latLng);
        
        // adds markers to array
        markers.push(markerData); 
        console.log(markers);
            
        // google.maps.event.addListener(marker, 'click', function () {
        //   // close window if not undefined
        //   if (infoWindow !== void 0) {
        //     infoWindow.close();
        //   }
        //   // create new window
        //   var infoWindowOptions = {
        //     content: content
        //   };
        //   infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        //   infoWindow.open(map, marker);
        // });

      }

      // show the map and place some markers
      initMap();

      // Place marker where clicked
      map.addListener('click', function(e) {
        setMarker(map, e.latLng);
      }); 

    }
  };
};

newMap.$inject = ['$state'];

export default newMap;