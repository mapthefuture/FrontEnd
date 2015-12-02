let newMap = function($state, NewTourService) {
  
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

      // var sites = [];
        
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

        // var site = {
        //   // id:
        //   // tour_id:
        //   title: title,
        //   description: description,
        //   lat: lat,
        //   lon: lon,
        // };

        // map.panTo(latLng);
        
        // adds markers to array
        // sites.push(site); 
        // console.log(sites);

        var contentString = `
          <div class="markerForm">
            <form class="newForm" ng-submit="vm.submitForm(site)">
              <input ng-model="site.title" type="text" placeholder="Title">
              <textarea ng-model="site.description" type="text" placeholder="Description"></textarea>
              <input type="checkbox">Is this the tour start?
              <button>Submit</button>
            </form>
          </div>`;

        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        infoWindow.open(map, marker);
        console.log(scope);
        scope.$apply();
            
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

      // show the map
      initMap();


      // Place marker where clicked
      map.addListener('click', function(e) {
        setMarker(map, e.latLng);
        // angular.element(this).children().children(".clicked").toggleClass("display");
      }); 

    }
  };
};

newMap.$inject = ['$state', 'NewTourService'];

export default newMap;