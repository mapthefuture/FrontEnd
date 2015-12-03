let NewTourController = function($scope, $http, NewTourService) {
  
  let vm = this;
  // let map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: 33.7679192, lng: -84.5606888},
  //   zoom: 10,
  //   mapTypeId: google.maps.MapTypeId.HYBRID
  // });

  vm.submitForm = submitForm;

  function submitForm (siteObj) {
    console.log(siteObj);
    NewTourService.submitForm(siteObj).then( (res) => {
      console.log(res);
    });
  }

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