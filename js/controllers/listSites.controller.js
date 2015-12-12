let ListSiteController = function($scope,$stateParams,TourService,SiteService) {
  
  $scope.TourID = 1;
  $scope.Sites = [];

  TourService.getStored().then((res) => {
    $scope.TourID = res.data.tour.id;
    console.log($scope.TourID);
  });

  SiteService.getSites(TourID).then((res)=> {
    $scope.Sites = res.data.sites;
    console.log($scope.Sites);
  });
};

ListSiteController.$inject = ['$scope','$stateParams','TourService','SiteService'];

export default ListSiteController;