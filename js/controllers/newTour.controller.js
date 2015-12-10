let NewTourController = function($scope, $http, TourService, SERVER) {
  
  let vm = this;

  vm.submitSiteForm = submitSiteForm;

  vm.submitTourForm = submitTourForm;

  vm.tourId = {}; 

  vm.tourStart = [];

  function submitSiteForm (siteObj) {
    TourService.submitSiteForm(siteObj).then( (res) => {

      // Set start of tour to first site
      let tourStartObj = {};
      var newTourStart = function () {
        let c = TourService.markerData;
        let t = tourStartObj;
        console.log(c);
        return $http.patch(SERVER.URL + '/tours/' + c.id, t, SERVER.CONFIG);  
      };

      vm.tourStart.push(res.data.site);
      if (vm.tourStart.length === 1) {
        tourStartObj = {
          start_lat: vm.tourStart[0].latitude,
          start_lon: vm.tourStart[0].longitude
        };
        newTourStart();
        console.log(vm.tourStart.length);
      }
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

NewTourController.$inject = ['$scope', '$http', 'TourService', 'SERVER'];

export default NewTourController;