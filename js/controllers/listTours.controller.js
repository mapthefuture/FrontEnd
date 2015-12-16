let ListTourController = function($scope, $stateParams, TourService, $anchorScroll,SiteService) {
  
  $scope.allTours = [];
  $scope.tour = {};
  $scope.sites = [];

  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });

  $scope.tourMap = {
    center: {latitude: 0, longitude: 0},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: true,
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
        id: tour.id,
        coords: {
          latitude: tour.start_lat,
          longitude: tour.start_lon
        },
        click: () => $scope.gotoTour(tour),
        options: {icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'},
      });
    });
  });

  // For editing CSS Styles on-click
  $scope.selectedIndex = -1;
  $scope.gotoTour = function(tour, $index) {
    TourService.storeTour(tour);
    SiteService.getSites(tour.id).then((res) =>{
      // console.log(res);
      $scope.sites = res.data.sites;
    });
    $scope.selectedIndex = $index;
    $scope.tour = TourService.getStored();
    console.log($scope.tour);
    $anchorScroll(document.getElementById('startTour'));
  };

  $scope.siteDirections = function(x){
    window.location.href = 'https://www.google.com/maps?saddr=My+Location&daddr=' + x.longitude + ',' + x.latitude;
  };

  $scope.tourDirections = function(x){
    window.location.href = 'https://www.google.com/maps?saddr=My+Location&daddr=' +  x.start_lon + ',' + x.start_lat;
  };
};

ListTourController.$inject = ['$scope', '$stateParams', 'TourService', '$anchorScroll','SiteService'];

export default ListTourController;