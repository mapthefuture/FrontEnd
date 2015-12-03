let NewTourController = function($scope, $http, NewTourService) {
  
  let vm = this;

  vm.submitForm = submitForm;

  function submitForm (siteObj) {
    console.log("Peanut Butter");
    NewTourService.submitForm(siteObj).then( (res) => {
      NewTourService.submitFormSuccess(res);
      console.log(res);
    });
  }

  // $scope.login = function (user) {
  //   UserService.sendLogin(user).then( (res) => {
  //     UserService.loginSuccess(res);
  //   });
  // };

  // let Thing = function(obj) {
  //   this.title = obj.title;
  //   this.author = obj.author || 'function not built';
  //   this.length = 'function not built';
  //   this.duration = 'function not built';
  //   // this.points 
  // };

  // $scope.newThing = (obj) => {
  //   let t = new Thing(obj);

  //   $http.post(requestInfo);
  // };

};

NewTourController.$inject = ['$scope', '$http', 'NewTourService'];

export default NewTourController;