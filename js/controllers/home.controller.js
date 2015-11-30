let HomeController = function($scope, UserService, $state) {

  let promise = UserService.checkAuth();

  if (promise) {
    promise.then( (res) => {
      console.log(res);
      if (res.data.status === 'Authentication failed.') {
        $state.go('root.login');
      } else {
        $scope.message = 'I am logged in';
      }
    });
  }

  $scope.logmeout = function() {
    UserService.logout();
  };  

  $scope.findTour = function(){
    console.log('goto findTour');
  };

  $scope.newTour = function(){
    console.log('if logged in, goto newTour; otherwise, goto login.');
    $state.go('root.new');
  };

};

HomeController.$inject = ['$scope', 'UserService', '$state'];

export default HomeController;