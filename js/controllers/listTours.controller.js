let ListTourController = function($scope, $stateParams, TourService, $anchorScroll,SiteService) {
  
  $scope.allTours = [];
  $scope.tour = {};
  $scope.sites = [];
  $scope.win = {
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
  };

  $scope.gotoSites = function() {
    console.log('hey');
    SiteService.getSites($scope.tour.id).then((res) =>{
      $scope.sites = res.data.sites;
    });
    $anchorScroll('sitesDiv');
  };

  $scope.markerClick = function(marker) {
    if($scope.win.show) {
      $scope.win.show = false;
      TourService.storeTour(marker);
      $scope.tour = TourService.getStored();
      $scope.win.options.pixelOffset = new google.maps.Size(0, -15, 'px', 'px');
      $scope.win.coords = marker.coords;
      $scope.win.title = marker.title;
      $scope.win.length = marker.length;
      $scope.win.description = marker.description;
    } else {
      TourService.storeTour(marker);
      $scope.tour = TourService.getStored();
      $scope.win.options.pixelOffset = new google.maps.Size(0, -15, 'px', 'px');
      $scope.win.coords = marker.coords;
      $scope.win.title = marker.title;
      $scope.win.length = marker.length;
      $scope.win.description = marker.description;
    }
    SiteService.getSites($scope.tour.id).then((res) =>{
      $scope.sites = res.data.sites;
    });
    $anchorScroll('sitesDiv');
    $scope.win.show = true;
  };


  $scope.tourMap = {
    center: {latitude: 27.9881, longitude: 86.9253},
    zoom: 16,
    options: {
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControl: true,
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
    }
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
    options: tourMapOptions
  };

  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });

  var tourMapOptions = {
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

  var iconimg = {
    url: './images/marker.svg',
    scaledSize: new google.maps.Size(32, 39), // size
  };

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
        click: () => $scope.gotoTour(tour),
        options: {
          icon: iconimg
        },
      });
    });
  });

  // For editing CSS Styles on-click
  $scope.selectedIndex = -1;
  // $scope.gotoTour = function(tour, $index) {
  //   TourService.storeTour(tour);
  //   SiteService.getSites(tour.id).then((res) =>{
  //     $scope.sites = res.data.sites;
  //   });
  //   $scope.tour = TourService.getStored();
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