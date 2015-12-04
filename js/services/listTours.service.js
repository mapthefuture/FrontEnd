let ListTourService = function($stateParams, $http, devURL) {
  

  this.areaTours = function() {
    let getURL = devURL + 'tours';
    return $http({
      method: 'GET',
      url: getURL
    });
  };

};

ListTourService.$inject = ['$stateParams', '$http', 'devURL'];

export default ListTourService;