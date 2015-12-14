let TourMapController = function($scope,TourService) {
  
  $scope.allTours = [];
  $scope.tourMarkers = [];
  
  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });

  $scope.allTours.forEach(function(tour){
    TourService.getMarkers(tour).then((res) =>{
      $scope.tourMarkers = res.data;
    });
  });

};

TourMapController.$inject = ['$scope','TourService'];

export default TourMapController;