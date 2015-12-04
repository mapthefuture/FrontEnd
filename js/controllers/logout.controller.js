let LogoutController = function($scope, UserService, $cookies, $state) {
  
  $scope.logout = function () {
    UserService.logout();
  };

};

LogoutController.$inject = ['$scope', 'UserService', '$cookies', '$state'];

export default LogoutController;