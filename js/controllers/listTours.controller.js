let ListTourController = function($scope, $stateParams, TourService, $anchorScroll,SiteService) {
  
  $scope.allTours = [];
  $scope.tour = {};
  $scope.sites = [];
  $scope.win = {
    id: 0,
    coords: {latitude: 0,
      longitude: 0},
    title: '',
    length: 0,
    description: '',
    show: false,
    options: {maxWidth: 200},
    closeClick: function() {
      this.show = false;
    },
    gotoSites: function() {
      console.log('hey');
      SiteService.getSites($scope.tour.id).then((res) =>{
        $scope.sites = res.data.sites;
      });
      $anchorScroll('sites');
    },
  };

  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });

  $scope.markerClick = function(marker) {
    TourService.storeTour(marker);
    $scope.tour = TourService.getStored();
    console.log($scope.tour);
    $scope.win.id = marker.id;
    $scope.win.options.pixelOffset = new google.maps.Size(0, -15, 'px', 'px');
    $scope.win.coords = marker.coords;
    $scope.win.title = marker.title;
    $scope.win.length = marker.length;
    $scope.win.description = marker.description;
    $scope.win.show = true;
    console.log($scope.win);
  };


  $scope.tourMap = {
    center: {latitude: 0, longitude: 0},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: true,
    // markerEvents: {
    //   click: function(marker) {
    //     console.log(marker);
    //     $scope.win.id = marker.id;
    //     $scope.win.show = true;
    //     $scope.win.coords = marker.coords;
    //     $scope.win.title = marker.title;
    //     TourService.storeTour(marker);
    //     $scope.tour = TourService.getStored();
    //   }
    // },
  };

  $scope.siteMap = {
    center: {latitude: 0, longitude: 0},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: false,
    options: $scope.tourMapOptions
  };

  $scope.tourMapOptions = {
    draggable: true,
    scrollwheel: false,
    styles: [
      {featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      },
      {featureType: "transit",
        stylers: [
          { visibility: "off" }
        ]
      }
    ],
  };

  function onSuccess(position) {
    $scope.tourMap.center = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    $scope.$apply();
  }
  function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  $scope.tourMarkers = [];


  TourService.areaTours().then((res) =>{
    var tours = res.data.tours;
    tours
    .filter((tour) => tour.start_lat && tour.start_lon)
    .forEach(function (tour) {
      $scope.tourMarkers.push({
        title: tour.title,
        description: tour.description,
        id: tour.id,
        coords: {
          latitude: tour.start_lat,
          longitude: tour.start_lon
        },
        options: {icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'},
      });
    });
  });

  // For editing CSS Styles on-click
  $scope.selectedIndex = -1;
  // $scope.gotoTour = function(tour, $index) {
  //   $scope.selectedIndex = $index;
  //   // $scope.map.window.show = !$scope.map.window.show;
  //   console.log($scope.tour);
  //   $anchorScroll('sites');
  // };


  $scope.siteDirections = function(x){
    window.location.href = 'https://www.google.com/maps?saddr=My+Location&daddr=' + x.longitude + ',' + x.latitude;
  };

  $scope.tourDirections = function(x){
    window.location.href = 'https://www.google.com/maps?saddr=My+Location&daddr=' +  x.start_lon + ',' + x.start_lat;
  };
};

ListTourController.$inject = ['$scope', '$stateParams', 'TourService', '$anchorScroll','SiteService'];

export default ListTourController;