let HomeController = function($scope, $state) {

  $scope.findTour = function(){
    $state.go('root.list');
  };

  $scope.newTour = function(){
    $state.go('root.new');
  };

};

HomeController.$inject = ['$scope', '$state'];

export default HomeController;