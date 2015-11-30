let HomeController = function($scope, $state) {

  $scope.findTour = function(){
    console.log('goto findTour');
  };

  $scope.newTour = function(){
    console.log('if logged in, goto newTour; otherwise, goto login.');
    $state.go('root.new');
  };

};

HomeController.$inject = ['$scope', '$state'];

export default HomeController;