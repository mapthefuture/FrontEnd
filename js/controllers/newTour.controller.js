let NewTourController = function($scope, $http, TourService) {
  
  let vm = this;

  vm.submitSiteForm = submitSiteForm;

  vm.submitTourForm = submitTourForm;

  vm.tourId = {}; 

  function submitSiteForm (siteObj) {
    TourService.submitSiteForm(siteObj).then( (res) => {
      // TourService.submitFormSuccess(res);
      console.log(res);
    });
  }

  function submitTourForm (tourObj) {
    TourService.submitTourForm(tourObj).then( (res) => {
      // TourService.submitFormSuccess(res);
      // console.log(res);
      vm.tourId = res.data.tour.id;
      console.log(vm.tourId);
    });
  }

  // function getTourId () {
  //   return tourId;
  // }

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

NewTourController.$inject = ['$scope', '$http', 'TourService'];

export default NewTourController;