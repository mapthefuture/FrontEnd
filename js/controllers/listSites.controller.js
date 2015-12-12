let ListSiteController = function($scope,$stateParams) {
  
  $scope.TourID = 1;
  $scope.Sites = [];

  TourService.getStored().then((res) => {
    $scope.Sites = res.data.sites;
    console.log($scope.Sites);
  });
  

};

ListSiteController.$inject = ['$scope','$stateParams'];

export default ListSiteController;