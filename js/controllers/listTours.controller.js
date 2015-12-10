let ListTourController = function($scope, $stateParams, TourService) {
  
  let vm = this;
  $scope.allTours = [];
  $scope.tourMarkers = [];

  TourService.areaTours().then((res) => {
    $scope.allTours = res.data.tours;
    // console.log($scope.allTours);
  });


  // Editing CSS Styles on-click
  $scope.selectedIndex = -1;

  $scope.clickedTour = function($index,t.id) {
    console.log(t.id);
    $scope.selectedIndex = $index;
  };

  // $scope.allTours.forEach(tour, function(tour){
  //   TourService.getMarkers(tour).then((res) =>{
  //     $scope.tourMarkers = res.data;
  //   });
  // });

};

ListTourController.$inject = ['$scope', '$stateParams', 'TourService'];

export default ListTourController;