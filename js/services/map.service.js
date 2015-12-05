let MapService = function(UserService, $stateParams, $http) {
  
  this.markerData = {};

  // init the map
  function initMap() {
    if (map === void 0) {
      map = new google.maps.Map(element[0], mapOptions);
    }
  } 

  // This is the largest part that needs refactoring - the contentstring and marker-calling need to be separated from the setMarker function, just not sure how/where yet

  function setMarker(map, latLng, title, description) {

    var marker = new google.maps.Marker({
      position:latLng,
      map: map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      icon: "http://maps.google.com/mapfiles/ms/micons/blue.png",
      id: uniqueId
    });

    // set unique id
    var uniqueId = 1;
    uniqueId++;

    var lat = marker.getPosition().lat();
    var lon = marker.getPosition().lng();

    MapService.markerData = {
      latitude: lat,
      longitude: lon,
      id: marker.id
    };

    // map.panTo(latLng);
    
    // adds markers to array
    markers.push(marker); 

    var contentString = 
    `<div class="markerForm" ng-controller="NewTourController">
        <form class="newForm" ng-submit="vm.submitForm(site)">
          <input ng-model="site.title" type="text" placeholder="Title">
          <textarea ng-model="site.description" type="text" placeholder="Description"></textarea>
          <input type="checkbox">Is this the tour start?
          <button>Submit</button>
        </form>
      </div>`;
    var compiled = $compile(contentString);
    var scopedHTML = compiled(scope);

    var infoWindow = new google.maps.InfoWindow({
      content: scopedHTML[0]
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });

    // These^^^^ two listeners vvvvvvv are the same, written differently, and including my clear function.  Need to be unified and split into appropriate functions (to be called on appropriate pages)
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
  /* --------------------------------------------------------------- */

};

MapService.$inject = ['UserService', '$stateParams', '$http'];

export default MapService;