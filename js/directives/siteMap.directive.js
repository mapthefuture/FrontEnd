let siteMap = function($state, TourService, SiteService) {
  
  return {
    restrict: 'A',
    replace: true,
    template: 
      `<div class="sitebox">
        <div class="map" id="sitemap"></div>
        <ul 
        ng-repeat="s in sites" 
        class="list tour" 
        ng-class="{'clicked': $index == vm.selectedIndex}"
        >
          <li>{{ s.title }}</li>
          <li>{{ s.location }}</li>
          <li>{{ s.distance }}</li>
          <li class="list hidden">{{ s.description }}</li>
        </ul>
      </div>`,
    controller: 'ListSiteController as vm',
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
      SiteService.getSites(id).then((res) =>{
        console.log(res);
        var sites = res.data.sites;

        sites.forEach(function (tour) {
          setMarker(map, new google.maps.LatLng(site.latitude,site.longitude),site.title,site.description);
        });
      });
    }
  };

};

siteMap.$inject = ['$state', 'TourService', 'SiteService'];

export default siteMap;