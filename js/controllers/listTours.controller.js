let ListTourController = function($stateParams, ListTourService) {
  
  let vm = this;
  vm.allTours = [];
  vm.tourMarkers = [];

  ListTourService.areaTours().then((res) => {
    vm.allTours = res.data.tours;
    console.log(vm.allTours);
  });


  // Editing CSS Styles on-click
  vm.selectedIndex = -1;

  vm.clickedTour = function($index) {
    console.log($index);
    vm.selectedIndex = $index;
  };

  // vm.allTours.forEach(tour, function(tour){
  //   ListTourService.getMarkers(tour).then((res) =>{
  //     vm.tourMarkers = res.data;
  //   });
  // });

};

ListTourController.$inject = ['$stateParams', 'ListTourService'];

export default ListTourController;