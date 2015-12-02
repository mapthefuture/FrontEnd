let SignupController = function($scope, UserService, $cookies, $state) {
  
  $scope.signup = function (user) {
    UserService.sendSignup(user).then( (res) => {
      UserService.loginSuccess(res);
    });
  };

};

SignupController.$inject = ['$scope', 'UserService', '$cookies', '$state'];

export default SignupController;