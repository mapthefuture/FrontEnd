let ListTourController = function($stateParams, TourService) {
  
  let vm = this;
  vm.allTours = [];
  vm.tourMarkers = [];

  TourService.areaTours().then((res) => {
    vm.allTours = res.data.tours;
    // console.log(vm.allTours);
  });


  // Editing CSS Styles on-click
  vm.selectedIndex = -1;

  vm.clickedTour = function($index) {
    // console.log($index);
    vm.selectedIndex = $index;
  };

  // vm.allTours.forEach(tour, function(tour){
  //   TourService.getMarkers(tour).then((res) =>{
  //     vm.tourMarkers = res.data;
  //   });
  // });

};

ListTourController.$inject = ['$stateParams', 'TourService'];

export default ListTourController;