let NewTourController = function($scope, $http, TourService, SERVER, UserService, $state) {

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
      }
    });
  }

  function submitTourForm (tourObj) {
    console.log('Hi?');


    TourService.submitTourForm(tourObj).then( (res) => {
      
      $state.go('root.addsites');
      // vm.showMap = (vm.showMap) ? false : true;


      vm.tourId = res.data.tour.id;
      console.log(vm.tourId);
    });
  }
};

NewTourController.$inject = ['$scope', '$http', 'TourService', 'SERVER', 'UserService', '$state'];

export default NewTourController;