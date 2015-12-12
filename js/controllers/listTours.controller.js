let ListTourController = function($scope, $stateParams, TourService, $anchorScroll) {
  
  $scope.allTours = [];
  $scope.tourMarkers = [];
  $scope.tour = {};

  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });


  // Editing CSS Styles on-click
  $scope.selectedIndex = -1;

  $scope.clickedTour = function($index,t) {
    console.log(t.id);
    $scope.selectedIndex = $index;
    TourService.storeTour(t);
    $scope.tour = TourService.getStored();
    $anchorScroll('sitemap');
  };

  // $scope.allTours.forEach(tour, function(tour){
  //   TourService.getMarkers(tour).then((res) =>{
  //     $scope.tourMarkers = res.data;
  //   });
  // });

};

ListTourController.$inject = ['$scope', '$stateParams', 'TourService', '$anchorScroll'];

export default ListTourController;